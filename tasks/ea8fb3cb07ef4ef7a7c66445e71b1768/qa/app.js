'use strict';

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { spawn, spawnSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, 'screenshots');
const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT || '8080', 10);
const BASE_URL = `http://${HOST}:${PORT}`;
const SESSION_KEY = 'newera.sso.session';
const REMEMBERED_ACCOUNT_KEY = 'newera.sso.rememberedAccount';
const PASSWORD_FAILURES_KEY = 'newera.sso.passwordFailures';
const PASSWORD_LOCKS_KEY = 'newera.sso.passwordLocks';

const DESKTOP_VIEWPORT = {
  width: 1440,
  height: 900,
};

const MOBILE_VIEWPORT = {
  width: 375,
  height: 667,
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function print(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function findChromiumExecutable() {
  const candidates = [];

  if (process.env.CHROMIUM_PATH) {
    candidates.push(process.env.CHROMIUM_PATH);
  }

  candidates.push(
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  );

  for (const candidate of candidates) {
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch (error) {
      if (process.platform !== 'win32') {
        continue;
      }

      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  const executableNames = [
    'chromium',
    'chromium-browser',
    'google-chrome',
    'google-chrome-stable',
  ];

  for (const executableName of executableNames) {
    const result = spawnSync('which', [executableName], {
      encoding: 'utf8',
    });

    if (result.status === 0) {
      const executablePath = result.stdout.trim();

      if (executablePath) {
        return executablePath;
      }
    }
  }

  return null;
}

function getRequestPath(requestUrl) {
  const url = new URL(requestUrl, BASE_URL);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  return pathname;
}

function resolveProjectPath(requestPath) {
  const normalizedPath = path.posix.normalize(requestPath);
  const relativePath = normalizedPath.replace(/^\/+/, '');
  const absolutePath = path.resolve(PROJECT_ROOT, relativePath);
  const rootPrefix = `${PROJECT_ROOT}${path.sep}`;

  if (absolutePath !== PROJECT_ROOT && !absolutePath.startsWith(rootPrefix)) {
    return null;
  }

  return absolutePath;
}

function createStaticServer() {
  return http.createServer(async (request, response) => {
    try {
      const requestPath = getRequestPath(request.url || '/');
      const absolutePath = resolveProjectPath(requestPath);

      if (!absolutePath) {
        response.writeHead(403, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Forbidden');
        return;
      }

      let filePath = absolutePath;
      let fileStats;

      try {
        fileStats = await fsp.stat(filePath);
      } catch (error) {
        fileStats = null;
      }

      if (fileStats && fileStats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        fileStats = await fsp.stat(filePath);
      }

      if (!fileStats || !fileStats.isFile()) {
        const notFoundPage = path.join(PROJECT_ROOT, '404.html');

        if (fs.existsSync(notFoundPage)) {
          const content = await fsp.readFile(notFoundPage);
          response.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
          });
          response.end(content);
          return;
        }

        response.writeHead(404, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Not Found');
        return;
      }

      const extension = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[extension] || 'application/octet-stream';

      response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      });

      fs.createReadStream(filePath).pipe(response);
    } catch (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
      });
      response.end('Internal Server Error');
    }
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, HOST, () => {
      resolve();
    });
  });
}

function closeServer(server) {
  return new Promise((resolve) => {
    if (!server) {
      resolve();
      return;
    }

    server.close(() => {
      resolve();
    });
  });
}

async function connectToChromium(executablePath) {
  const { spawn: chromiumSpawn } = require('child_process');

  const userDataDir = await fsp.mkdtemp(
    path.join(os.tmpdir(), 'newera-sso-chromium-'),
  );

  const debugPort = 9222 + Math.floor(Math.random() * 1000);

  const child = chromiumSpawn(
    executablePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--metrics-recording-only',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-features=Translate,MediaRouter',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  let stderr = '';
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  const endpoint = `http://127.0.0.1:${debugPort}`;

  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`${endpoint}/json/version`);

      if (response.ok) {
        const version = await response.json();

        return {
          child,
          endpoint,
          version,
          userDataDir,
          stderr: () => stderr,
        };
      }
    } catch (error) {
      await sleep(100);
    }
  }

  child.kill('SIGKILL');

  try {
    await fsp.rm(userDataDir, {
      recursive: true,
      force: true,
    });
  } catch (error) {
    fail(`清理 Chromium 临时目录失败：${error.message}`);
  }

  throw new Error(
    `无法连接 Chromium 调试端口 ${debugPort}。\n${stderr.slice(-4000)}`,
  );
}

async function createCdpClient(webSocketDebuggerUrl) {
  const { WebSocket } = require('ws');
  const webSocket = new WebSocket(webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('连接 Chrome DevTools Protocol 超时'));
    }, 10000);

    webSocket.once('open', () => {
      clearTimeout(timeout);
      resolve();
    });

    webSocket.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });

  let nextId = 1;
  const pending = new Map();
  const eventHandlers = new Map();

  webSocket.on('message', (rawMessage) => {
    let message;

    try {
      message = JSON.parse(rawMessage.toString());
    } catch (error) {
      return;
    }

    if (message.id && pending.has(message.id)) {
      const pendingRequest = pending.get(message.id);
      pending.delete(message.id);

      if (message.error) {
        pendingRequest.reject(
          new Error(
            `${pendingRequest.method}: ${message.error.message || '未知 CDP 错误'}`,
          ),
        );
      } else {
        pendingRequest.resolve(message.result || {});
      }

      return;
    }

    if (message.method && eventHandlers.has(message.method)) {
      const handlers = eventHandlers.get(message.method);

      for (const handler of handlers) {
        handler(message.params || {});
      }
    }
  });

  function send(method, params = {}, sessionId) {
    return new Promise((resolve, reject) => {
      const id = nextId;
      nextId += 1;

      pending.set(id, {
        resolve,
        reject,
        method,
      });

      const message = {
        id,
        method,
        params,
      };

      if (sessionId) {
        message.sessionId = sessionId;
      }

      webSocket.send(JSON.stringify(message));
    });
  }

  function on(method, handler) {
    if (!eventHandlers.has(method)) {
      eventHandlers.set(method, []);
    }

    eventHandlers.get(method).push(handler);
  }

  function close() {
    webSocket.close();
  }

  return {
    send,
    on,
    close,
  };
}

async function sendCommand(client, sessionId, method, params = {}) {
  return client.send(method, params, sessionId);
}

async function evaluate(client, sessionId, expression) {
  const result = await sendCommand(client, sessionId, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    const description =
      result.exceptionDetails.exception &&
      result.exceptionDetails.exception.description;

    throw new Error(description || '页面脚本执行失败');
  }

  return result.result.value;
}

async function navigate(client, sessionId, url) {
  const loadPromise = new Promise((resolve) => {
    const handler = (params) => {
      if (params.frameId) {
        resolve();
      }
    };

    client.on('Page.loadEventFired', handler);
  });

  await sendCommand(client, sessionId, 'Page.navigate', {
    url,
  });

  await Promise.race([
    loadPromise,
    sleep(15000),
  ]);
}

async function waitForPageReady(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `new Promise((resolve) => {
      const finish = () => {
        document.documentElement.setAttribute('data-screenshot-ready', 'true');
        resolve({
          readyState: document.readyState,
          url: location.href,
          title: document.title
        });
      };

      if (document.readyState === 'complete') {
        requestAnimationFrame(() => requestAnimationFrame(finish));
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(() => requestAnimationFrame(finish));
        }, { once: true });
      }
    })`,
  );

  await sleep(700);
}

async function createBrowserContext(client, viewport) {
  const result = await sendCommand(client, 'Target.createBrowserContext', {
    disposeOnDetach: false,
  });

  const browserContextId = result.browserContextId;

  const targetResult = await sendCommand(
    client,
    'Target.createTarget',
    {
      url: 'about:blank',
      width: viewport.width,
      height: viewport.height,
      browserContextId,
    },
  );

  const targetId = targetResult.targetId;

  const attachResult = await sendCommand(client, 'Target.attachToTarget', {
    targetId,
    flatten: true,
  });

  const sessionId = attachResult.sessionId;

  await sendCommand(client, sessionId, 'Page.enable');
  await sendCommand(client, sessionId, 'Runtime.enable');
  await sendCommand(client, sessionId, 'Log.enable');
  await sendCommand(client, sessionId, 'Network.enable');

  await sendCommand(client, sessionId, 'Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 600,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });

  await sendCommand(client, sessionId, 'Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [
      {
        name: 'prefers-color-scheme',
        value: 'light',
      },
      {
        name: 'prefers-reduced-motion',
        value: 'no-preference',
      },
    ],
  });

  return {
    browserContextId,
    targetId,
    sessionId,
  };
}

async function disposeBrowserContext(client, browserContextId) {
  try {
    await sendCommand(client, 'Target.disposeBrowserContext', {
      browserContextId,
    });
  } catch (error) {
    fail(`关闭 BrowserContext 失败：${error.message}`);
  }
}

async function clearBrowserStorage(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      localStorage.clear();
      sessionStorage.clear();
      return true;
    })()`,
  );
}

async function injectValidSession(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      const now = Date.now();
      const session = {
        token: 'test-token',
        user: {
          id: 'test-user',
          name: '测试用户',
          account: 'tester@example.com',
          role: '管理员'
        },
        issuedAt: now,
        expiresAt: now + 2 * 60 * 60 * 1000
      };

      localStorage.setItem(${JSON.stringify(SESSION_KEY)}, JSON.stringify(session));
      return session;
    })()`,
  );
}

async function injectRememberedPasswordTabState(client, sessionId) {
  await evaluate(
    client,
    sessionId,
    `(() => {
      const passwordInput = document.querySelector('#password');
      const accountInput = document.querySelector('#account');

      if (accountInput) {
        accountInput.value = 'tester@example.com';
        accountInput.dispatchEvent(new Event('input', { bubbles: true }));
        accountInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (passwordInput) {
        passwordInput.value = 'Test1234';
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      return true;
    })()`,
  );
}

async function measurePage(client, sessionId) {
  return evaluate(
    client,
    sessionId,
    `(() => {
      const root = document.documentElement;
      const viewportWidth = root.clientWidth;
      const scrollWidth = root.scrollWidth;

      return {
        url: location.href,
        title: document.title,
        viewportWidth,
        scrollWidth,
        hasHorizontalOverflow: scrollWidth > viewportWidth,
        readyState: document.readyState
      };
    })()`,
  );
}

function readPngDimensions(buffer) {
  const signature = '89504e470d0a1a0a';

  if (
    buffer.length < 24 ||
    buffer.subarray(0, 8).toString('hex') !== signature
  ) {
    throw new Error('输出文件不是有效 PNG');
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  return {
    width,
    height,
  };
}

async function captureScreenshot(client, sessionId, outputPath) {
  const result = await sendCommand(client, sessionId, 'Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
    optimizeForSpeed: false,
  });

  const buffer = Buffer.from(result.data, 'base64');
  await fsp.writeFile(outputPath, buffer);

  return readPngDimensions(buffer);
}

function createTestCases() {
  return [
    {
      file: '01-desktop-login.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '02-desktop-tab-sms.png',
      url: '/index.html?tab=sms',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '03-desktop-tab-qr.png',
      url: '/index.html?tab=qr',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '04-desktop-qr-confirm.png',
      url: '/index.html?tab=qr&qrState=scanned',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '05-desktop-error-password.png',
      url: '/index.html?error=password',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '06-desktop-lock.png',
      url: '/index.html?error=locked&lockSeconds=300',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '07-desktop-sms-countdown.png',
      url: '/index.html?tab=sms&smsCountdown=60',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '08-desktop-login-success.png',
      url: '/index.html?success=1',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '09-desktop-app.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
    },
    {
      file: '10-desktop-guard-redirect.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '11-desktop-session-expired.png',
      url: '/app.html?expired=1',
      viewport: DESKTOP_VIEWPORT,
      setupExpiredSession: true,
    },
    {
      file: '12-desktop-403.png',
      url: '/403.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '13-mobile-login.png',
      url: '/index.html',
      viewport: MOBILE_VIEWPORT,
    },
    {
      file: '14-mobile-sms.png',
      url: '/index.html?tab=sms',
      viewport: MOBILE_VIEWPORT,
    },
    {
      file: '15-mobile-app.png',
      url: '/app.html',
      viewport: MOBILE_VIEWPORT,
      setupSession: true,
    },
    {
      file: '16-desktop-error-empty.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
      setupEmptyError: true,
    },
    {
      file: '17-desktop-tab-switch.png',
      url: '/index.html',
      viewport: DESKTOP_VIEWPORT,
      setupTabSwitch: true,
    },
    {
      file: '18-desktop-guard-redirect.png',
      url: '/app.html?redirect=app.html',
      viewport: DESKTOP_VIEWPORT,
    },
    {
      file: '19-desktop-session-persist.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
      reloadAfterSetup: true,
    },
    {
      file: '20-desktop-logout.png',
      url: '/app.html',
      viewport: DESKTOP_VIEWPORT,
      setupSession: true,
      openUserMenu: true,
    },
    {
      file: '21-desktop-404.png',
      url: '/404.html',
      viewport: DESKTOP_VIEWPORT,
    },
  ];
}

async function applyTestPreparation(
  client,
  sessionId,
  testCase,
) {
  if (testCase.setupSession) {
    await injectValidSession(client, sessionId);
  }

  if (testCase.setupExpiredSession) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const now = Date.now();
        const session = {
          token: 'test-token',
          user: {
            id: 'test-user',
            name: '测试用户',
            account: 'tester@example.com',
            role: '管理员'
          },
          issuedAt: now - 3 * 60 * 60 * 1000,
          expiresAt: now - 60 * 1000
        };

        localStorage.setItem(${JSON.stringify(SESSION_KEY)}, JSON.stringify(session));
        return true;
      })()`,
    );
  }

  if (testCase.setupEmptyError) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const form = document.querySelector('form');
        const account = document.querySelector('#account');
        const password = document.querySelector('#password');

        if (account) {
          account.setAttribute('aria-invalid', 'true');
        }

        if (password) {
          password.setAttribute('aria-invalid', 'true');
        }

        if (form) {
          form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', {
            bubbles: true,
            cancelable: true
          }));
        }

        return true;
      })()`,
    );
    await sleep(300);
  }

  if (testCase.setupTabSwitch) {
    await injectRememberedPasswordTabState(client, sessionId);

    await evaluate(
      client,
      sessionId,
      `(() => {
        const smsTab = document.querySelector('[data-tab="sms"]');
        const passwordTab = document.querySelector('[data-tab="password"]');

        if (smsTab) {
          smsTab.click();
        }

        return {
          clickedSms: Boolean(smsTab),
          foundPasswordTab: Boolean(passwordTab)
        };
      })()`,
    );
    await sleep(300);
  }

  if (testCase.openUserMenu) {
    await evaluate(
      client,
      sessionId,
      `(() => {
        const selectors = [
          '[data-user-menu-button]',
          '#user-menu-button',
          '.user-menu-button',
          'button[aria-haspopup="menu"]'
        ];

        for (const selector of selectors) {
          const button = document.querySelector(selector);

          if (button) {
            button.click();
            break;
          }
        }

        return true;
      })()`,
    );
    await sleep(300);
  }
}

async function runCase(
  client,
  testCase,
  executionResults,
) {
  const result = {
    file: testCase.file,
    url: `${BASE_URL}${testCase.url}`,
    requestedViewport: testCase.viewport,
    captured: false,
    png: null,
    finalUrl: null,
    title: null,
    hasHorizontalOverflow: null,
    consoleErrors: [],
    pageExceptions: [],
    runtimeErrors: [],
    capturedAt: new Date().toISOString(),
    error: null,
  };

  let browserContext;

  try {
    browserContext = await createBrowserContext(
      client,
      testCase.viewport,
    );

    const { sessionId } = browserContext;

    client.on('Runtime.consoleAPICalled', (params) => {
      if (params.type !== 'error') {
        return;
      }

      const text = (params.args || [])
        .map((argument) => {
          if (
            argument.type === 'string' ||
            argument.value !== undefined
          ) {
            return String(argument.value);
          }

          return argument.description || argument.type;
        })
        .join(' ');

      result.consoleErrors.push(text);
    });

    client.on('Runtime.exceptionThrown', (params) => {
      const details = params.exceptionDetails || {};
      const description =
        details.exception &&
        details.exception.description;