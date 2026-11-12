当前环境未提供终端、浏览器、文件写入或图片生成工具，因此无法启动真实页面并产出符合验收标准的 PNG 截图。

请在具备以下工具权限的工作区中重新执行本任务：

- 终端：检查项目、启动本地服务
- 浏览器：渲染页面并截图
- 文件：写入并归集 `screenshots/`
- 代码：搭建或调整演示页面

本次目标交付物为：

```text
screenshots/
├── 01-dashboard-1440x900.png
├── 02-orders-1440x900.png
├── 03-order-detail-1440x900.png
├── 04-new-order-1440x900.png
└── 05-dashboard-mobile-390x844.png
```

并附以下复现信息：

```text
启动命令：python3 -m http.server 8080
访问地址：http://localhost:8080
```

由于无法实际生成文件，当前不能诚实地声称已交付 PNG 截图。工具权限开放后即可继续完成检查、渲染、截图及文件校验。