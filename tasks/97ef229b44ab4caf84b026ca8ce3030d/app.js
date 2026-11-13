/* ============================================
   小清 · 个人介绍页 交互脚本
   导航 / 滚动监听 / 入场动画 / 表单校验
   ============================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 阅读进度条 ---------- */
  var progressFill = document.getElementById('progressFill');
  var header = document.querySelector('.site-header');

  function updateProgress() {
    var doc = document.documentElement;
    var scrollTop = window.pageYOffset || doc.scrollTop;
    var scrollHeight = doc.scrollHeight - window.innerHeight;
    var percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    if (progressFill) {
      progressFill.style.width = percent.toFixed(2) + '%';
    }
    if (header) {
      header.classList.toggle('is-scrolled', scrollTop > 12);
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateProgress();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  function setMenu(open) {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    siteNav.classList.toggle('is-open', open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });

    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (navToggle.getAttribute('aria-expanded') !== 'true') return;
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) {
        setMenu(false);
      }
    });
  }

  /* ---------- 滚动高亮（scroll spy） ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-nav]'));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute('data-nav'));
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-nav') === id);
    });
  }

  if (sections.length) {
    if ('IntersectionObserver' in window) {
      var visible = {};
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        var bestId = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) {
            bestRatio = visible[id];
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) {
          setActive(bestId);
        }
      }, {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1]
      });

      sections.forEach(function (section) {
        spyObserver.observe(section);
      });
    }

    window.addEventListener('scroll', function () {
      var current = sections[0].id;
      var offset = window.pageYOffset + 150;
      sections.forEach(function (section) {
        if (section.offsetTop <= offset) {
          current = section.id;
        }
      });
      if ((window.pageYOffset + window.innerHeight) >= (document.documentElement.scrollHeight - 4)) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    }, { passive: true });
  }

  /* ---------- 入场动画 ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var meters = Array.prototype.slice.call(document.querySelectorAll('.skill-meter-fill'));

  function fillMeter(el) {
    var inline = el.getAttribute('style') || '';
    var match = inline.match(/--level:\s*([\d.]+)%/);
    var value = match ? match[1] : '0';
    el.style.width = value + '%';
  }

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.classList.contains('skill-card')) {
            var meter = entry.target.querySelector('.skill-meter-fill');
            if (meter) {
              window.setTimeout(function () { fillMeter(meter); }, 180);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
    meters.forEach(fillMeter);
  }

  /* ---------- 表单校验 ---------- */
  var form = document.getElementById('contactForm');
  var statusText = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  var fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      message: '请填写你的称呼'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      message: '请填写有效的邮箱地址'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      message: '请简单说说你想聊的内容'
    }
  };

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showError(field, message) {
    var wrap = field.input.closest('.field');
    if (wrap) wrap.classList.add('has-error');
    field.input.setAttribute('aria-invalid', 'true');
    field.error.textContent = message;
  }

  function clearError(field) {
    var wrap = field.input.closest('.field');
    if (wrap) wrap.classList.remove('has-error');
    field.input.removeAttribute('aria-invalid');
    field.error.textContent = '';
  }

  function validateField(field) {
    var value = field.input.value.trim();
    if (!value) {
      showError(field, field.message);
      return false;
    }
    if (field === fields.email && !emailPattern.test(value)) {
      showError(field, '邮箱格式不正确，例如 name@example.com');
      return false;
    }
    clearError(field);
    return true;
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener('blur', function () {
      if (field.input.value.trim()) validateField(field);
    });
    field.input.addEventListener('input', function () {
      var wrap = field.input.closest('.field');
      if (wrap && wrap.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      var firstInvalid = null;

      Object.keys(fields).forEach(function (key) {
        var ok = validateField(fields[key]);
        if (!ok) {
          valid = false;
          if (!firstInvalid) firstInvalid = fields[key].input;
        }
      });

      if (!valid) {
        statusText.textContent = '还有信息没有填写完整，请检查标红的部分。';
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '发送中…';

      window.setTimeout(function () {
        form.reset();
        Object.keys(fields).forEach(function (key) { clearError(fields[key]); });
        submitBtn.disabled = false;
        submitBtn.textContent = '发送留言';
        statusText.textContent = '留言已收到（演示环境，不会真实发送），我会尽快回复你。';
      }, reduceMotion ? 0 : 700);
    });
  }
})();
