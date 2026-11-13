(function () {
  "use strict";

  const state = {
    currentView: "dashboard",
    sidebarOpen: false,
    taskFilter: "all",
    projectFilter: "all",
    search: "",
    completedTasks: new Set(["task-2", "task-6"])
  };

  const elements = {
    body: document.body,
    pageTitle: document.querySelector("#pageTitle"),
    pageSubtitle: document.querySelector("#pageSubtitle"),
    pageViews: Array.from(document.querySelectorAll(".page-view")),
    navItems: Array.from(document.querySelectorAll("[data-view]")),
    sidebar: document.querySelector(".sidebar"),
    overlay: document.querySelector(".mobile-overlay"),
    menuButton: document.querySelector(".topbar__menu"),
    taskList: document.querySelector("#dashboardTaskList"),
    taskCount: document.querySelector("#sidebarTaskCount"),
    projectCount: document.querySelector("#sidebarProjectCount"),
    projectGrid: document.querySelector("#projectGrid"),
    modal: document.querySelector("#createTaskModal"),
    modalBackdrop: document.querySelector("#modalBackdrop"),
    taskModalClose: document.querySelector("#taskModalClose"),
    taskForm: document.querySelector("#taskForm"),
    toastRegion: document.querySelector("#toastRegion")
  };

  const viewMeta = {
    dashboard: {
      title: "工作台",
      subtitle: "项目概览与今日动态"
    },
    tasks: {
      title: "任务管理",
      subtitle: "查看、筛选并分配全部任务"
    },
    projects: {
      title: "项目管理",
      subtitle: "跟踪项目进度与团队协作"
    },
    team: {
      title: "团队成员",
      subtitle: "管理成员信息与工作负载"
    },
    reports: {
      title: "数据报告",
      subtitle: "汇总项目状态与交付表现"
    },
    settings: {
      title: "系统设置",
      subtitle: "配置工作空间偏好"
    }
  };

  const taskData = [
    {
      id: "task-1",
      title: "完成品牌视觉方案初稿",
      project: "品牌升级",
      owner: "林悦",
      due: "今天 18:00",
      status: "进行中",
      statusClass: "status-badge--progress"
    },
    {
      id: "task-2",
      title: "确认官网首页信息架构",
      project: "官网改版",
      owner: "周宁",
      due: "昨天",
      status: "已完成",
      statusClass: ""
    },
    {
      id: "task-3",
      title: "整理第二季度运营数据",
      project: "增长运营",
      owner: "陈默",
      due: "明天 12:00",
      status: "待审核",
      statusClass: "status-badge--review"
    },
    {
      id: "task-4",
      title: "交付移动端交互说明",
      project: "产品迭代",
      owner: "许言",
      due: "6月18日",
      status: "待开始",
      statusClass: ""
    },
    {
      id: "task-5",
      title: "完善客户访谈结论摘要",
      project: "用户研究",
      owner: "林悦",
      due: "6月19日",
      status: "紧急",
      statusClass: "status-badge--urgent"
    },
    {
      id: "task-6",
      title: "更新项目里程碑排期",
      project: "增长运营",
      owner: "周宁",
      due: "6月16日",
      status: "已完成",
      statusClass: ""
    },
    {
      id: "task-7",
      title: "整理组件库使用规范",
      project: "产品迭代",
      owner: "陈默",
      due: "6月21日",
      status: "进行中",
      statusClass: "status-badge--progress"
    },
    {
      id: "task-8",
      title: "核对季度项目交付清单",
      project: "数据报告",
      owner: "许言",
      due: "6月24日",
      status: "待开始",
      statusClass: ""
    }
  ];

  const projectData = [
    {
      name: "品牌升级",
      description: "统一品牌视觉与核心物料，提升整体识别度。",
      progress: 78,
      status: "进展顺利",
      team: ["林悦", "周宁", "陈默"]
    },
    {
      name: "官网改版",
      description: "重构官网核心页面，改善信息层级与转化路径。",
      progress: 62,
      status: "进行中",
      team: ["周宁", "许言"]
    },
    {
      name: "产品迭代",
      description: "梳理关键业务流程，完成交互与视觉方案更新。",
      progress: 45,
      status: "需要关注",
      team: ["陈默", "林悦", "许言"]
    },
    {
      name: "增长运营",
      description: "围绕关键转化链路推进内容、投放与数据分析。",
      progress: 86,
      status: "进展顺利",
      team: ["陈默", "周宁"]
    },
    {
      name: "用户研究",
      description: "完成目标用户访谈，提炼可执行的产品机会。",
      progress: 34,
      status: "进行中",
      team: ["林悦", "许言"]
    },
    {
      name: "数据报告",
      description: "建立稳定的数据口径，持续输出经营洞察。",
      progress: 69,
      status: "进展顺利",
      team: ["陈默", "林悦"]
    }
  ];

  function iconCheck() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function iconCalendar() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }

  function iconUser() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c.7-4 3.1-6 7.5-6s6.8 2 7.5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }

  function iconFolder() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }

  function createTaskMarkup(task) {
    const checked = state.completedTasks.has(task.id);
    const statusClass = checked ? "" : task.statusClass;

    return `
      <article class="task-item${checked ? " is-done" : ""}" data-task-id="${task.id}">
        <button class="task-item__check${checked ? " is-checked" : ""}" type="button" aria-label="${checked ? "取消完成" : "标记完成"}：${task.title}" data-task-check>
          ${iconCheck()}
        </button>
        <div class="task-item__body">
          <span class="task-item__title">${task.title}</span>
          <div class="task-item__meta">
            <span>${iconFolder()}${task.project}</span>
            <span>${iconCalendar()}${task.due}</span>
          </div>
        </div>
        <span class="status-badge ${statusClass}">${checked ? "已完成" : task.status}</span>
      </article>
    `;
  }

  function renderDashboardTasks() {
    if (!elements.taskList) {
      return;
    }

    const visibleTasks = taskData.slice(0, 5);
    elements.taskList.innerHTML = visibleTasks.map(createTaskMarkup).join("");

    if (elements.taskCount) {
      const openCount = taskData.filter(function (task) {
        return !state.completedTasks.has(task.id);
      }).length;
      elements.taskCount.textContent = String(openCount);
    }
  }

  function renderProjects() {
    if (!elements.projectGrid) {
      return;
    }

    const query = state.search.trim().toLowerCase();
    const visibleProjects = projectData.filter(function (project) {
      const matchesSearch = !query ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);
      const matchesFilter = state.projectFilter === "all" || project.status === state.projectFilter;
      return matchesSearch && matchesFilter;
    });

    if (elements.projectCount) {
      elements.projectCount.textContent = String(projectData.length);
    }

    if (!visibleProjects.length) {
      elements.projectGrid.innerHTML = `
        <div class="panel empty-state" style="grid-column: 1 / -1;">
          <div>
            <div class="empty-state__icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            </div>
            <h3>没有找到匹配项目</h3>
            <p>请调整搜索内容或筛选条件。</p>
          </div>
        </div>
      `;
      return;
    }

    elements.projectGrid.innerHTML = visibleProjects.map(function (project) {
      const initials = project.team.map(function (name) {
        return name.slice(0, 1);
      }).join("");

      return `
        <article class="project-card">
          <div class="project-card__top">
            <div class="project-card__mark">${iconFolder()}</div>
            <span class="status-badge ${project.status === "需要关注" ? "status-badge--urgent" : "status-badge--progress"}">${project.status}</span>
          </div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-card__progress">
            <div class="project-card__progress-label">
              <span>整体进度</span>
              <strong>${project.progress}%</strong>
            </div>
            <div class="progress-bar" role="progressbar" aria-label="${project.name}进度" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100">
              <span class="progress-bar__fill" style="width: ${project.progress}%"></span>
            </div>
          </div>
          <div class="project-card__footer">
            <div class="avatar-stack" aria-label="项目成员">
              ${project.team.map(function (name) {
                return '<span class="mini-avatar" title="' + name + '">' + name.slice(0, 1) + '</span>';
              }).join("")}
            </div>
            <span style="color: var(--color-text-muted); font-size: 9px;">${project.team.length} 位成员</span>
          </div>
        </article>
      `;
    }).join("");
  }

  function switchView(viewName) {
    const target = viewMeta[viewName] ? viewName : "dashboard";
    state.currentView = target;

    elements.pageViews.forEach(function (view) {
      view.classList.toggle("is-active", view.dataset.page === target);
    });

    elements.navItems.forEach(function (item) {
      const active = item.dataset.view === target;
      item.classList.toggle("is-active", active);
      if (active) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (elements.pageTitle) {
      elements.pageTitle.textContent = viewMeta[target].title;
    }

    if (elements.pageSubtitle) {
      elements.pageSubtitle.textContent = viewMeta[target].subtitle;
    }

    document.title = viewMeta[target].title + " - NewEra Copilot";
    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSidebar() {
    state.sidebarOpen = true;
    elements.body.classList.add("sidebar-open");
    if (elements.menuButton) {
      elements.menuButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeSidebar() {
    state.sidebarOpen = false;
    elements.body.classList.remove("sidebar-open");
    if (elements.menuButton) {
      elements.menuButton.setAttribute("aria-expanded", "false");
    }
  }

  function openModal() {
    if (!elements.modalBackdrop) {
      return;
    }
    elements.modalBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const firstInput = elements.taskForm ? elements.taskForm.querySelector("input") : null;
    if (firstInput) {
      window.setTimeout(function () {
        firstInput.focus();
      }, 50);
    }
  }

  function closeModal() {
    if (!elements.modalBackdrop) {
      return;
    }
    elements.modalBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    if (elements.taskForm) {
      elements.taskForm.reset();
    }
  }

  function showToast(title, message) {
    if (!elements.toastRegion) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `
      <div class="toast__icon">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div>
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
      <button class="toast__close" type="button" aria-label="关闭通知">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
    `;

    elements.toastRegion.appendChild(toast);

    const removeToast = function () {
      toast.remove();
    };

    toast.querySelector(".toast__close").addEventListener("click", removeToast);
    window.setTimeout(removeToast, 4500);
  }

  function handleTaskToggle(button) {
    const item = button.closest("[data-task-id]");
    if (!item) {
      return;
    }

    const taskId = item.dataset.taskId;
    const wasCompleted = state.completedTasks.has(taskId);

    if (wasCompleted) {
      state.completedTasks.delete(taskId);
    } else {
      state.completedTasks.add(taskId);
    }

    const task = taskData.find(function (entry) {
      return entry.id === taskId;
    });

    renderDashboardTasks();
    showToast(
      wasCompleted ? "任务已恢复" : "任务已完成",
      task ? task.title : "任务状态已经更新。"
    );
  }

  function handleTaskSubmit(event) {
    event.preventDefault();
    if (!elements.taskForm) {
      return;
    }

    const formData = new FormData(elements.taskForm);
    const title = String(formData.get("title") || "").trim();
    const project = String(formData.get("project") || "").trim();

    if (!title || !project) {
      showToast("信息不完整", "请填写任务名称并选择所属项目。");
      return;
    }

    closeModal();
    showToast("任务已创建", title + " 已加入任务列表。");
  }

  elements.navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      switchView(item.dataset.view);
    });
  });

  if (elements.menuButton) {
    elements.menuButton.addEventListener("click", function () {
      if (state.sidebarOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (elements.overlay) {
    elements.overlay.addEventListener("click", closeSidebar);
  }

  if (elements.modalBackdrop) {
    elements.modalBackdrop.addEventListener("click", function (event) {
      if (event.target === elements.modalBackdrop) {
        closeModal();
      }
    });
  }

  if (elements.taskModalClose) {
    elements.taskModalClose.addEventListener("click", closeModal);
  }

  if (elements.taskForm) {
    elements.taskForm.addEventListener("submit", handleTaskSubmit);
  }

  document.addEventListener("click", function (event) {
    const taskButton = event.target.closest("[data-task-check]");
    if (taskButton) {
      handleTaskToggle(taskButton);
      return;
    }

    const openTaskButton = event.target.closest("[data-open-task-modal]");
    if (openTaskButton) {
      openModal();
      return;
    }

    const projectFilter = event.target.closest("[data-project-filter]");
    if (projectFilter) {
      state.projectFilter = projectFilter.dataset.projectFilter;
      document.querySelectorAll("[data-project-filter]").forEach(function (button) {
        button.classList.toggle("is-active", button === projectFilter);
      });
      renderProjects();
      return;
    }

    const taskFilter = event.target.closest("[data-task-filter]");
    if (taskFilter) {
      state.taskFilter = taskFilter.dataset.taskFilter;
      document.querySelectorAll("[data-task-filter]").forEach(function (button) {
        button.classList.toggle("is-active", button === taskFilter);
      });
      showToast("筛选已应用", "当前任务列表已按所选状态更新。");
      return;
    }

    const viewButton = event.target.closest("[data-go-view]");
    if (viewButton) {
      switchView(viewButton.dataset.goView);
    }
  });

  document.addEventListener("input", function (event) {
    if (event.target.matches("[data-project-search]")) {
      state.search = event.target.value;
      renderProjects();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
      closeSidebar();
    }
  });

  renderDashboardTasks();
  renderProjects();
})();
