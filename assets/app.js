/* ==========================================================================
   Northwind Console — Application script
   Handles: shell rendering, dashboard widgets, record table with
   search / filter / sort / pagination, modals, toasts, and account
   management on the accounts page.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Icons (inline SVG, no external assets) ---------- */
  var ICONS = {
    grid: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
    activity:
      '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    logout:
      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    shield:
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    trash:
      '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    inbox:
      '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    refresh:
      '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 8.3-8.3 3 3-2 2-2-2-2 2 2 2-2 2-3-3"/>',
    file:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    layers:
      '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>'
  };

  function icon(name, extraClass) {
    var path = ICONS[name] || ICONS.info;
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extraClass ? ' class="' + extraClass + '"' : "") +
      ">" +
      path +
      "</svg>"
    );
  }

  /* ---------- Toast ---------- */
  function toastHost() {
    var host = document.querySelector(".toast-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "toast-host";
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "polite");
      document.body.appendChild(host);
    }
    return host;
  }

  function toast(message, type) {
    var kind = type || "info";
    var glyph = kind === "success" ? "check" : kind === "error" ? "alert" : "info";
    var el = document.createElement("div");
    el.className = "toast toast--" + kind;
    el.innerHTML = icon(glyph) + "<div>" + Auth.escapeHtml(message) + "</div>";
    toastHost().appendChild(el);
    window.setTimeout(function () {
      el.style.transition = "opacity 200ms ease, transform 200ms ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }, 3200);
  }

  /* ---------- Shell ---------- */
  function renderShell() {
    var user = Auth.currentUser();
    var sidebar = document.querySelector("[data-sidebar]");
    var appbar = document.querySelector("[data-appbar]");
    if (!user) return;

    var links = [
      { href: "app.html", label: "Overview", icon: "grid" },
      { href: "app.html#records", label: "Records", icon: "layers" },
      { href: "app.html#activity", label: "Activity", icon: "activity" },
      { href: "accounts.html", label: "Accounts", icon: "users", admin: true },
      { href: "style-preview.html", label: "Style guide", icon: "file" }
    ];

    var groups = [
      { label: "Workspace", items: links.slice(0, 3) },
      { label: "Administration", items: links.slice(3) }
    ];

    if (sidebar) {
      sidebar.innerHTML =
        '<div class="sidebar__group">' +
        '<a class="brand" href="index.html">' +
        '<span class="brand__mark">' +
        icon("layers") +
        "</span>" +
        "<span>Northwind<span class=\"brand__sub\">Console</span></span>" +
        "</a>" +
        "</div>" +
        groups
          .map(function (group) {
            var items = group.items
              .filter(function (item) {
                return !item.admin || Auth.hasRole("admin");
              })
              .map(function (item) {
                var active =
                  window.location.pathname.indexOf(item.href.split("#")[0]) !== -1 &&
                  item.href.split("#")[0] === window.location.pathname.split("/").pop()
                    ? " is-active"
                    : "";
                return (
                  '<a class="sidebar__link' +
                  active +
                  '" href="' +
                  item.href +
                  '">' +
                  icon(item.icon) +
                  "<span>" +
                  item.label +
                  "</span></a>"
                );
              })
              .join("");
            return (
              '<div class="sidebar__group">' +
              '<div class="sidebar__label">' +
              group.label +
              "</div>" +
              items +
              "</div>"
            );
          })
          .join("") +
        '<div class="sidebar__group sidebar__foot">' +
        '<button class="user-chip" type="button" data-signout>' +
        '<span class="avatar">' +
        Auth.escapeHtml(Auth.initials(user.name)) +
        "</span>" +
        '<span style="min-width:0">' +
        '<span class="truncate" style="display:block">' +
        Auth.escapeHtml(user.name) +
        "</span>" +
        '<span class="text-xs text-subtle">' +
        Auth.escapeHtml(Auth.roleLabel(user.role)) +
        "</span>" +
        "</span>" +
        "</button>" +
        "</div>";
    }

    if (appbar) {
      appbar.innerHTML =
        '<div class="row">' +
        '<button class="btn btn--ghost btn--sm menu-toggle" type="button" data-menu-toggle aria-label="Toggle navigation">' +
        icon("menu") +
        "</button>" +
        '<h1 class="app-bar__title" data-page-title>Overview</h1>' +
        "</div>" +
        '<div class="row">' +
        '<span class="badge badge--primary"><span class="badge__dot"></span>' +
        Auth.escapeHtml(Auth.roleLabel(user.role)) +
        "</span>" +
        '<button class="btn btn--ghost btn--sm" type="button" data-notify aria-label="Notifications">' +
        icon("bell") +
        "</button>" +
        '<a class="btn btn--primary btn--sm" href="app.html">Open console</a>' +
        "</div>";
    }

    var signout = document.querySelector("[data-signout]");
    if (signout) {
      signout.addEventListener("click", function () {
        Auth.signOut();
        window.location.href = "login.html";
      });
    }

    var toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (sidebar) sidebar.classList.toggle("is-open");
      });
    }

    var notify = document.querySelector("[data-notify]");
    if (notify) {
      notify.addEventListener("click", function () {
        toast("You are all caught up. No new notifications.", "info");
      });
    }
  }

  /* ---------- Dashboard data ---------- */
  function buildRecords() {
    return [
      { id: "NX-2041", customer: "Ardent Logistics", region: "EMEA", value: 48200, status: "Active", owner: "A. Brennan", updated: "2024-11-02" },
      { id: "NX-2042", customer: "Bluewater Foods", region: "AMER", value: 19750, status: "Pending", owner: "M. Feld", updated: "2024-11-01" },
      { id: "NX-2043", customer: "Cobalt Systems", region: "APAC", value: 96400, status: "Active", owner: "P. Raman", updated: "2024-10-30" },
      { id: "NX-2044", customer: "Delta Grove", region: "AMER", value: 12400, status: "Review", owner: "T. Wolf", updated: "2024-10-29" },
      { id: "NX-2045", customer: "Everline Energy", region: "EMEA", value: 73100, status: "Active", owner: "A. Brennan", updated: "2024-10-28" },
      { id: "NX-2046", customer: "Fathom Retail", region: "APAC", value: 30800, status: "Pending", owner: "D. Okafor", updated: "2024-10-27" },
      { id: "NX-2047", customer: "Granite Works", region: "AMER", value: 55900, status: "Active", owner: "M. Feld", updated: "2024-10-25" },
      { id: "NX-2048", customer: "Halcyon Travel", region: "EMEA", value: 14200, status: "Closed", owner: "P. Raman", updated: "2024-10-22" },
      { id: "NX-2049", customer: "Indigo Media", region: "APAC", value: 88600, status: "Active", owner: "T. Wolf", updated: "2024-10-21" },
      { id: "NX-2050", customer: "Juno Labs", region: "AMER", value: 26400, status: "Review", owner: "D. Okafor", updated: "2024-10-18" },
      { id: "NX-2051", customer: "Kestrel Freight", region: "EMEA", value: 61500, status: "Active", owner: "A. Brennan", updated: "2024-10-16" },
      { id: "NX-2052", customer: "Lumen Health", region: "AMER", value: 33700, status: "Pending", owner: "M. Feld", updated: "2024-10-14" }
    ];
  }

  var RECORDS = buildRecords();

  var state = {
    search: "",
    status: "all",
    region: "all",
    sort: "updated-desc",
    page: 1,
    perPage: 6
  };

  function statusBadge(status) {
    var map = {
      Active: "success",
      Pending: "warning",
      Review: "primary",
      Closed: "neutral"
    };
    return (
      '<span class="badge badge--' +
      (map[status] || "neutral") +
      '"><span class="badge__dot"></span>' +
      status +
      "</span>"
    );
  }

  function filteredRecords() {
    var term = state.search.trim().toLowerCase();
    var rows = RECORDS.filter(function (r) {
      var matchSearch =
        !term ||
        r.id.toLowerCase().indexOf(term) !== -1 ||
        r.customer.toLowerCase().indexOf(term) !== -1 ||
        r.owner.toLowerCase().indexOf(term) !== -1;
      var matchStatus = state.status === "all" || r.status === state.status;
      var matchRegion = state.region === "all" || r.region === state.region;
      return matchSearch && matchStatus && matchRegion;
    });

    rows.sort(function (a, b) {
      switch (state.sort) {
        case "value-desc":
          return b.value - a.value;
        case "value-asc":
          return a.value - b.value;
        case "customer-asc":
          return a.customer.localeCompare(b.customer);
        case "updated-asc":
          return a.updated.localeCompare(b.updated);
        default:
          return b.updated.localeCompare(a.updated);
      }
    });

    return rows;
  }

  function renderStats() {
    var host = document.querySelector("[data-stats]");
    if (!host) return;

    var total = RECORDS.length;
    var active = RECORDS.filter(function (r) {
      return r.status === "Active";
    }).length;
    var pipeline = RECORDS.reduce(function (sum, r) {
      return sum + r.value;
    }, 0);
    var pending = RECORDS.filter(function (r) {
      return r.status === "Pending" || r.status === "Review";
    }).length;

    var tiles = [
      {
        icon: "layers",
        label: "Total records",
        value: total.toLocaleString(),
        meta: "Across all regions"
      },
      {
        icon: "check",
        label: "Active",
        value: active.toLocaleString(),
        meta: Math.round((active / total) * 100) + "% of portfolio"
      },
      {
        icon: "trend",
        label: "Pipeline value",
        value: "$" + (pipeline / 1000).toFixed(0) + "k",
        meta: "Sum of open records"
      },
      {
        icon: "clock",
        label: "Awaiting review",
        value: pending.toLocaleString(),
        meta: "Pending or in review"
      }
    ];

    host.innerHTML = tiles
      .map(function (t) {
        return (
          '<div class="stat">' +
          '<div class="stat__label">' +
          icon(t.icon) +
          "<span>" +
          t.label +
          "</span></div>" +
          '<div class="stat__value">' +
          t.value +
          "</div>" +
          '<div class="stat__meta">' +
          t.meta +
          "</div></div>"
        );
      })
      .join("");
  }

  function renderTable() {
    var tbody = document.querySelector("[data-records-body]");
    var info = document.querySelector("[data-records-info]");
    var pager = document.querySelector("[data-records-pager]");
    if (!tbody) return;

    var rows = filteredRecords();
    var totalPages = Math.max(1, Math.ceil(rows.length / state.perPage));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * state.perPage;
    var pageRows = rows.slice(start, start + state.perPage);

    if (!pageRows.length) {
      tbody.innerHTML =
        '<tr><td colspan="5"><div class="empty">' +
        '<div class="empty__icon">' +
        icon("inbox") +
        "</div>" +
        '<div class="empty__title">No records match</div>' +
        '<p class="text-sm">Adjust the search term or filters to see more results.</p>' +
        "</div></td></tr>";
    } else {
      tbody.innerHTML = pageRows
        .map(function (r) {
          return (
            "<tr>" +
            '<td class="mono">' +
            Auth.escapeHtml(r.id) +
            "</td>" +
            "<td>" +
            Auth.escapeHtml(r.customer) +
            "</td>" +
            "<td>" +
            Auth.escapeHtml(r.region) +
            "</td>" +
            '<td class="mono">$' +
            r.value.toLocaleString() +
            "</td>" +
            "<td>" +
            statusBadge(r.status) +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
    }

    if (info) {
      info.textContent =
        rows.length === 0
          ? "No results"
          : "Showing " +
            (start + 1) +
            "-" +
            Math.min(start + state.perPage, rows.length) +
            " of " +
            rows.length +
            " records";
    }

    if (pager) {
      pager.innerHTML =
        '<button class="btn btn--sm" type="button" data-page-prev' +
        (state.page <= 1 ? " disabled" : "") +
        ">Previous</button>" +
        '<span class="text-sm text-muted">Page ' +
        state.page +
        " of " +
        totalPages +
        "</span>" +
        '<button class="btn btn--sm" type="button" data-page-next' +
        (state.page >= totalPages ? " disabled" : "") +
        ">Next</button>";
    }
  }

  function renderChart() {
    var host = document.querySelector("[data-chart]");
    if (!host) return;

    var series = [
      { label: "Aug", value: 42 },
      { label: "Sep", value: 58 },
      { label: "Oct", value: 47 },
      { label: "Nov", value: 71 },
      { label: "Dec", value: 64 },
      { label: "Jan", value: 82 }
    ];
    var max = Math.max.apply(
      null,
      series.map(function (s) {
        return s.value;
      })
    );

    host.innerHTML = series
      .map(function (s) {
        var pct = Math.round((s.value / max) * 100);
        return (
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--sp-2)">' +
          '<span class="text-xs text-muted mono">' +
          s.value +
          "</span>" +
          '<div style="width:100%;height:150px;display:flex;align-items:flex-end;background:var(--c-surface-alt);border-radius:var(--r-md);padding:4px;border:1px solid var(--c-border)">' +
          '<div class="progress__bar" style="width:' +
          pct +
          "%;height:100%"></div>" +
          "</div>" +
          '<span class="text-xs text-subtle">' +
          s.label +
          "</span></div>"
        );
      })
      .join("");
  }

  function renderActivity() {
    var host = document.querySelector("[data-activity]");
    if (!host) return;

    var items = [
      { who: "Ava Brennan", what: "approved record NX-2041", when: "2 hours ago" },
      { who: "Marcus Feld", what: "exported the EMEA pipeline", when: "5 hours ago" },
      { who: "Priya Raman", what: "flagged Cobalt Systems for review", when: "yesterday" },
      { who: "Tomas Wolf", what: "updated contact details", when: "yesterday" },
      { who: "Daniel Okafor", what: "joined the workspace", when: "3 days ago" }
    ];

    host.innerHTML = items
      .map(function (item) {
        return (
          '<li style="display:flex;gap:var(--sp-3);align-items:flex-start;padding:var(--sp-3) 0;border-bottom:1px solid var(--c-border)">' +
          '<span class="avatar">' +
          Auth.escapeHtml(Auth.initials(item.who)) +
          "</span>" +
          '<span style="min-width:0">' +
          '<span style="display:block;font-size:var(--fs-sm)">' +
          "<strong>" +
          Auth.escapeHtml(item.who) +
          "</strong> " +
          Auth.escapeHtml(item.what) +
          "</span>" +
          '<span class="text-xs text-subtle">' +
          Auth.escapeHtml(item.when) +
          "</span>" +
          "</span></li>"
        );
      })
      .join("");
  }

  /* ---------- Modal ---------- */
  function openModal(title, bodyHtml, footerHtml) {
    closeModal();
    var wrap = document.createElement("div");
    wrap.className = "modal";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML =
      '<div class="modal__panel">' +
      '<div class="modal__header">' +
      '<h2 style="font-size:var(--fs-md)">' +
      Auth.escapeHtml(title) +
      "</h2>" +
      '<button class="btn btn--ghost btn--sm" type="button" data-modal-close aria-label="Close dialog">' +
      icon("x") +
      "</button>" +
      "</div>" +
      '<div class="modal__body">' +
      bodyHtml +
      "</div>" +
      '<div class="modal__footer">' +
      footerHtml +
      "</div>" +
      "</div>";

    document.body.appendChild(wrap);
    document.body.style.overflow = "hidden";

    wrap.addEventListener("click", function (e) {
      if (e.target === wrap) closeModal();
    });

    var closeBtn = wrap.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    var first = wrap.querySelector("input, select, textarea, button:not([data-modal-close])");
    if (first) first.focus();

    return wrap;
  }

  function closeModal() {
    var existing = document.querySelector(".modal");
    if (existing) existing.parentNode.removeChild(existing);
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Account management page ---------- */
  function renderAccountsPage() {
    var body = document.querySelector("[data-accounts-body]");
    if (!body) return;

    var users = Auth.listUsers();
    var query = (document.querySelector("[data-accounts-search]") || {}).value || "";
    var roleFilter = (document.querySelector("[data-accounts-role]") || {}).value || "all";

    var term = query.trim().toLowerCase();
    var rows = users.filter(function (u) {
      var matchTerm =
        !term ||
        u.name.toLowerCase().indexOf(term) !== -1 ||
        u.email.toLowerCase().indexOf(term) !== -1 ||
        u.department.toLowerCase().indexOf(term) !== -1;
      var matchRole = roleFilter === "all" || u.role === roleFilter;
      return matchTerm && matchRole;
    });

    var counts = {
      total: users.length,
      active: users.filter(function (u) {
        return u.status === "active";
      }).length,
      invited: users.filter(function (u) {
        return u.status === "invited";
      }).length,
      suspended: users.filter(function (u) {
        return u.status === "suspended";
      }).length
    };

    var countHost = document.querySelector("[data-accounts-counts]");
    if (countHost) {
      countHost.innerHTML = [
        { label: "Members", value: counts.total },
        { label: "Active", value: counts.active },
        { label: "Invited", value: counts.invited },
        { label: "Suspended", value: counts.suspended }
      ]
        .map(function (c) {
          return (
            '<div class="stat"><div class="stat__label">' +
            c.label +
            '</div><div class="stat__value">' +
            c.value +
            "</div></div>"
          );
        })
        .join("");
    }

    if (!rows.length) {
      body.innerHTML =
        '<tr><td colspan="6"><div class="empty">' +
        '<div class="empty__icon">' +
        icon("users") +
        "</div>" +
        '<div class="empty__title">No members found</div>' +
        '<p class="text-sm">Try a different search term or role filter.</p>' +
        "</div></td></tr>";
      return;
    }

    var statusMap = {
      active: ["success", "Active"],
      invited: ["warning", "Invited"],
      suspended: ["danger", "Suspended"]
    };

    body.innerHTML = rows
      .map(function (u) {
        var st = statusMap[u.status] || ["neutral", u.status];
        return (
          "<tr>" +
          '<td><div class="row"><span class="avatar">' +
          Auth.escapeHtml(Auth.initials(u.name)) +
          '</span><span style="min-width:0"><span class="truncate" style="display:block">' +
          Auth.escapeHtml(u.name) +
          '</span><span class="text-xs text-subtle truncate" style="display:block;max-width:220px">' +
          Auth.escapeHtml(u.email) +
          "</span></span></div></td>" +
          "<td>" +
          Auth.escapeHtml(u.department) +
          "</td>" +
          '<td><span class="badge badge--primary">' +
          Auth.escapeHtml(Auth.roleLabel(u.role)) +
          "</span></td>" +
          '<td><span class="badge badge--' +
          st[0] +
          '"><span class="badge__dot"></span>' +
          st[1] +
          "</span></td>" +
          '<td class="text-sm text-muted">' +
          Auth.escapeHtml(Auth.formatDateTime(u.lastActiveAt)) +
          "</td>" +
          '<td><div class="row" style="justify-content:flex-end">' +
          '<button class="btn btn--sm" type="button" data-edit-user="' +
          u.id +
          '">' +
          icon("edit") +
          "</button>" +
          '<button class="btn btn--sm btn--danger" type="button" data-delete-user="' +
          u.id +
          '">' +
          icon("trash") +
          "</button>" +
          "</div></td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function accountFormHtml(user) {
    var u = user || {};
    var roleOptions = ["admin", "analyst", "viewer"]
      .map(function (r) {
        var selected = (u.role || "viewer") === r ? " selected" : "";
        return (
          '<option value="' + r + '"' + selected + ">" + Auth.roleLabel(r) + "</option>"
        );
      })
      .join("");

    var statusOptions = ["active", "invited", "suspended"]
      .map(function (s) {
        var label = s.charAt(0).toUpperCase() + s.slice(1);
        var selected = (u.status || "invited") === s ? " selected" : "";
        return '<option value="' + s + '"' + selected + ">" + label + "</option>";
      })
      .join("");

    return (
      '<form data-account-form novalidate>' +
      '<div class="field">' +
      '<label class="field__label" for="acc-name">Full name</label>' +
      '<input class="input" id="acc-name" name="name" type="text" placeholder="Jordan Ellis" value="' +
      Auth.escapeHtml(u.name || "") +
      '" required>' +
      '<span class="field__error hidden" data-error="name"></span>' +
      "</div>" +
      '<div class="field">' +
      '<label class="field__label" for="acc-email">Email address</label>' +
      '<input class="input" id="acc-email" name="email" type="email" placeholder="jordan.ellis@northwind.io" value="' +
      Auth.escapeHtml(u.email || "") +
      '" required>' +
      '<span class="field__error hidden" data-error="email"></span>' +
      "</div>" +
      '<div class="grid grid-2" style="margin-top:var(--sp-5)">' +
      '<div class="field" style="margin-top:0">' +
      '<label class="field__label" for="acc-role">Role</label>' +
      '<select class="select" id="acc-role" name="role">' +
      roleOptions +
      "</select>" +
      "</div>" +
      '<div class="field" style="margin-top:0">' +
      '<label class="field__label" for="acc-dept">Department</label>' +
      '<input class="input" id="acc-dept" name="department" type="text" placeholder="Operations" value="' +
      Auth.escapeHtml(u.department || "") +
      '">' +
      "</div>" +
      "</div>" +
      '<div class="field">' +
      '<label class="field__label" for="acc-status">Status</label>' +
      '<select class="select" id="acc-status" name="status">' +
      statusOptions +
      "</select>" +
      "</div>" +
      "</form>"
    );
  }

  function bindAccountForm(modal, userId) {
    var form = modal.querySelector("[data-account-form]");
    if (!form) return;

    function showError(field, message) {
      var el = form.querySelector('[data-error="' + field + '"]');
      if (!el) return;
      el.textContent = message;
      el.classList.toggle("hidden", !message);
      var input = form.querySelector('[name="' + field + '"]');
      if (input) input.closest(".field").classList.toggle("field--error", !!message);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showError("name", "");
      showError("email", "");

      var data = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        role: form.elements.role.value,
        status: form.elements.status.value,
        department: form.elements.department.value
      };

      var result = userId
        ? Auth.updateUser(userId, data)
        : Auth.createUser(data);

      if (!result.ok) {
        var field = /email/i.test(result.message) ? "email" : "name";
        showError(field, result.message);
        return;
      }

      closeModal();
      renderAccountsPage();
      toast(
        userId ? "Member updated successfully." : "Invitation sent to " + data.email + ".",
        "success"
      );
    });
  }

  function openAccountModal(userId) {
    var user = userId ? Auth.findUser(userId) : null;
    var modal = openModal(
      userId ? "Edit member" : "Invite member",
      accountFormHtml(user),
      '<button class="btn" type="button" data-modal-close>Cancel</button>' +
        '<button class="btn btn--primary" type="button" data-account-save>' +
        (userId ? "Save changes" : "Send invite") +
        "</button>"
    );

    bindAccountForm(modal, userId);

    modal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    var save = modal.querySelector("[data-account-save]");
    if (save) {
      save.addEventListener("click", function () {
        var form = modal.querySelector("[data-account-form]");
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
    }
  }

  function confirmDeleteUser(userId) {
    var user = Auth.findUser(userId);
    if (!user) return;

    var modal = openModal(
      "Remove member",
      '<p class="text-sm text-muted">Removing <strong>' +
        Auth.escapeHtml(user.name) +
        "</strong> revokes their access to the console. This action cannot be undone.</p>",
      '<button class="btn" type="button" data-modal-close>Cancel</button>' +
        '<button class="btn btn--danger" type="button" data-confirm-delete>Remove member</button>'
    );

    modal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    var confirm = modal.querySelector("[data-confirm-delete]");
    if (confirm) {
      confirm.addEventListener("click", function () {
        var result = Auth.removeUser(userId);
        closeModal();
        renderAccountsPage();
        toast(
          result.ok ? "Member removed." : result.message,
          result.ok ? "success" : "error"
        );
      });
    }
  }

  /* ---------- Init ---------- */
  function init() {
    renderShell();
    renderStats();
    renderTable();
    renderChart();
    renderActivity();

    var search = document.querySelector("[data-records-search]");
    if (search) {
      search.addEventListener("input", function () {
        state.search = search.value;
        state.page = 1;
        renderTable();
      });
    }

    var statusSel = document.querySelector("[data-records-status]");
    if (statusSel) {
      statusSel.addEventListener("change", function () {
        state.status = statusSel.value;
        state.page = 1;
        renderTable();
      });
    }

    var regionSel = document.querySelector("[data-records-region]");
    if (regionSel) {
      regionSel.addEventListener("change", function () {
        state.region = regionSel.value;
        state.page = 1;
        renderTable();
      });
    }

    var sortSel = document.querySelector("[data-records-sort]");
    if (sortSel) {
      sortSel.addEventListener("change", function () {
        state.sort = sortSel.value;
        renderTable();
      });
    }

    document.addEventListener("click", function (e) {
      var prev = e.target.closest("[data-page-prev]");
      if (prev) {
        state.page = Math.max(1, state.page - 1);
        renderTable();
        return;
      }
      var next = e.target.closest("[data-page-next]");
      if (next) {
        state.page = state.page + 1;
        renderTable();
        return;
      }
      var edit = e.target.closest("[data-edit-user]");
      if (edit) {
        openAccountModal(edit.getAttribute("data-edit-user"));
        return;
      }
      var del = e.target.closest("[data-delete-user]");
      if (del) {
        confirmDeleteUser(del.getAttribute("data-delete-user"));
        return;
      }
      var invite = e.target.closest("[data-invite-user]");
      if (invite) {
        openAccountModal(null);
      }
    });

    var exportBtn = document.querySelector("[data-export]");
    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        var rows = filteredRecords();
        var csv = [
          "ID,Customer,Region,Value,Status,Owner,Updated",
        ]
          .concat(
            rows.map(function (r) {
              return [
                r.id,
                '"' + r.customer + '"',
                r.region,
                r.value,
                r.status,
                '"' + r.owner + '"',
                r.updated,
              ].join(",");
            })
          )
          .join("\n");

        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "northwind-records.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast("Exported " + rows.length + " records as CSV.", "success");
      });
    }

    var refreshBtn = document.querySelector("[data-refresh]");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", function () {
        renderStats();
        renderTable();
        renderChart();
        renderActivity();
        toast("Dashboard refreshed.", "info");
      });
    }

    var accountsSearch = document.querySelector("[data-accounts-search]");
    if (accountsSearch) {
      accountsSearch.addEventListener("input", renderAccountsPage);
    }
    var accountsRole = document.querySelector("[data-accounts-role]");
    if (accountsRole) {
      accountsRole.addEventListener("change", renderAccountsPage);
    }
    renderAccountsPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.NWC = { icon: icon, toast: toast, openModal: openModal, closeModal: closeModal };
})();
