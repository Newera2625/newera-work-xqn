/* ==========================================================================
   Northwind Console — Auth module
   Client-side mock authentication with localStorage persistence.
   Exposes a global `Auth` object used by every page.
   ========================================================================== */
(function (global) {
  "use strict";

  var SESSION_KEY = "nwc.session";
  var USERS_KEY = "nwc.users";

  var ROLE_LABELS = {
    admin: "Administrator",
    analyst: "Analyst",
    viewer: "Viewer"
  };

  var ROLE_RANK = { admin: 3, analyst: 2, viewer: 1 };

  function nowIso() {
    return new Date().toISOString();
  }

  function uid(prefix) {
    return (
      (prefix || "id") +
      "-" +
      Math.random().toString(36).slice(2, 8) +
      Date.now().toString(36).slice(-4)
    );
  }

  function readJson(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (err) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function seedUsers() {
    var seeded = readJson(USERS_KEY, null);
    if (seeded && Array.isArray(seeded) && seeded.length) return seeded;

    var users = [
      {
        id: "usr-1001",
        name: "Ava Brennan",
        email: "ava.brennan@northwind.io",
        role: "admin",
        status: "active",
        department: "Operations",
        createdAt: "2024-02-11T09:24:00.000Z",
        lastActiveAt: "2024-11-02T15:41:00.000Z"
      },
      {
        id: "usr-1002",
        name: "Marcus Feld",
        email: "marcus.feld@northwind.io",
        role: "analyst",
        status: "active",
        department: "Finance",
        createdAt: "2024-03-04T11:02:00.000Z",
        lastActiveAt: "2024-11-01T08:16:00.000Z"
      },
      {
        id: "usr-1003",
        name: "Priya Raman",
        email: "priya.raman@northwind.io",
        role: "analyst",
        status: "active",
        department: "Risk",
        createdAt: "2024-04-19T14:37:00.000Z",
        lastActiveAt: "2024-10-30T17:05:00.000Z"
      },
      {
        id: "usr-1004",
        name: "Tomas Wolf",
        email: "tomas.wolf@northwind.io",
        role: "viewer",
        status: "active",
        department: "Support",
        createdAt: "2024-06-27T08:55:00.000Z",
        lastActiveAt: "2024-10-28T12:44:00.000Z"
      },
      {
        id: "usr-1005",
        name: "Hana Ito",
        email: "hana.ito@northwind.io",
        role: "viewer",
        status: "suspended",
        department: "Support",
        createdAt: "2024-07-15T10:12:00.000Z",
        lastActiveAt: "2024-09-22T07:30:00.000Z"
      },
      {
        id: "usr-1006",
        name: "Daniel Okafor",
        email: "daniel.okafor@northwind.io",
        role: "analyst",
        status: "invited",
        department: "Operations",
        createdAt: "2024-10-02T16:20:00.000Z",
        lastActiveAt: null
      }
    ];

    writeJson(USERS_KEY, users);
    return users;
  }

  var Auth = {
    ROLE_LABELS: ROLE_LABELS,
    ROLE_RANK: ROLE_RANK,

    /* ---------- Session ---------- */

    getSession: function () {
      return readJson(SESSION_KEY, null);
    },

    isAuthenticated: function () {
      var session = this.getSession();
      return !!(session && session.user && session.expiresAt > Date.now());
    },

    currentUser: function () {
      var session = this.getSession();
      return session && session.user ? session.user : null;
    },

    hasRole: function (role) {
      var user = this.currentUser();
      if (!user) return false;
      if (role === "admin") return user.role === "admin";
      return ROLE_RANK[user.role] >= ROLE_RANK[role];
    },

    signIn: function (email, password, remember) {
      var users = seedUsers();
      var normalized = String(email || "").trim().toLowerCase();

      if (!normalized || !password) {
        return { ok: false, message: "Enter both an email address and a password." };
      }

      var user = null;
      for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === normalized) {
          user = users[i];
          break;
        }
      }

      if (!user) {
        return { ok: false, message: "No account matches that email address." };
      }

      if (user.status === "suspended") {
        return {
          ok: false,
          message: "This account is suspended. Contact an administrator to restore access."
        };
      }

      if (password.length < 6) {
        return { ok: false, message: "The password must be at least 6 characters." };
      }

      if (user.status === "invited") {
        user.status = "active";
        writeJson(USERS_KEY, users);
      }

      user.lastActiveAt = nowIso();
      writeJson(USERS_KEY, users);

      var ttl = remember ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
      var session = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department
        },
        issuedAt: Date.now(),
        expiresAt: Date.now() + ttl
      };

      writeJson(SESSION_KEY, session);
      return { ok: true, user: session.user };
    },

    signOut: function () {
      try {
        global.localStorage.removeItem(SESSION_KEY);
      } catch (err) {
        /* storage unavailable — nothing to clear */
      }
    },

    /* ---------- Guards ---------- */

    requireAuth: function (options) {
      var opts = options || {};
      if (this.isAuthenticated()) return true;
      var target = opts.redirect || "login.html";
      var back = encodeURIComponent(global.location.pathname.split("/").pop() || "app.html");
      global.location.replace(target + "?next=" + back);
      return false;
    },

    requireRole: function (role, deniedUrl) {
      if (!this.isAuthenticated()) {
        this.requireAuth({});
        return false;
      }
      if (!this.hasRole(role)) {
        global.location.replace(deniedUrl || "denied.html?required=" + role);
        return false;
      }
      return true;
    },

    /* ---------- Users ---------- */

    listUsers: function () {
      return seedUsers().slice();
    },

    findUser: function (id) {
      var users = seedUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) return users[i];
      }
      return null;
    },

    createUser: function (payload) {
      var users = seedUsers();
      var email = String(payload.email || "").trim().toLowerCase();

      if (!payload.name || !payload.name.trim()) {
        return { ok: false, message: "A full name is required." };
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return { ok: false, message: "Enter a valid email address." };
      }
      for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email) {
          return { ok: false, message: "That email address is already in use." };
        }
      }

      var user = {
        id: uid("usr"),
        name: payload.name.trim(),
        email: email,
        role: ROLE_RANK[payload.role] ? payload.role : "viewer",
        status: "invited",
        department: payload.department || "Unassigned",
        createdAt: nowIso(),
        lastActiveAt: null
      };

      users.push(user);
      writeJson(USERS_KEY, users);
      return { ok: true, user: user };
    },

    updateUser: function (id, changes) {
      var users = seedUsers();
      var target = null;
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) target = users[i];
      }
      if (!target) return { ok: false, message: "That account no longer exists." };

      if (changes.name !== undefined) {
        if (!changes.name.trim()) {
          return { ok: false, message: "A full name is required." };
        }
        target.name = changes.name.trim();
      }
      if (changes.role !== undefined && ROLE_RANK[changes.role]) {
        target.role = changes.role;
      }
      if (changes.status !== undefined) {
        target.status = changes.status;
      }
      if (changes.department !== undefined) {
        target.department = changes.department;
      }

      writeJson(USERS_KEY, users);
      return { ok: true, user: target };
    },

    removeUser: function (id) {
      var users = seedUsers();
      var next = users.filter(function (u) {
        return u.id !== id;
      });
      if (next.length === users.length) {
        return { ok: false, message: "That account no longer exists." };
      }
      writeJson(USERS_KEY, next);
      return { ok: true };
    },

    /* ---------- Helpers ---------- */

    initials: function (name) {
      var parts = String(name || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      if (!parts.length) return "?";
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },

    roleLabel: function (role) {
      return ROLE_LABELS[role] || role;
    },

    formatDate: function (value) {
      if (!value) return "Never";
      var d = new Date(value);
      if (isNaN(d.getTime())) return "Never";
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    },

    formatDateTime: function (value) {
      if (!value) return "Never";
      var d = new Date(value);
      if (isNaN(d.getTime())) return "Never";
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    },

    escapeHtml: function (value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
  };

  global.Auth = Auth;
})(window);
