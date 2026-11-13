/**
 * ROUTER.JS (Tích hợp Quản lý Phiên đăng nhập Học viên trên Header)
 */

const Router = {
  getActivePageId() {
    const attrPage = document.body.getAttribute('data-page');
    if (attrPage) return attrPage;
    const fileName = window.location.pathname.split('/').pop() || 'index.html';
    const map = {
      'index.html': 'home',
      'theory.html': 'theory',
      'topics.html': 'topics',
      'practice.html': 'practice',
      'exams.html': 'exams',
      'documents.html': 'documents',
      'roadmap.html': 'roadmap',
      'contact.html': 'contact',
      'login.html': 'login'
    };
    return map[fileName] || 'home';
  },

  applySavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  },

  toggleThemeMode() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    }
  },

  renderHeader(data) {
    if (window.AuthService) {
      const allowed = AuthService.enforceAuthGuard();
      if (!allowed) return;
      AuthService.initLoginPageEvents();
    }

    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentPageId = this.getActivePageId();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentUser = window.AuthService ? AuthService.getCurrentUser() : null;

    const menuHtml = data.navigation.map(item => {
      const activeClass = item.id === currentPageId ? 'active' : '';
      return `
        <li>
          <a href="${item.url}" class="nav-link ${activeClass}">
            <span>${item.icon}</span>
            <span>${item.title}</span>
          </a>
        </li>
      `;
    }).join('');

    const userWidgetHtml = currentUser
      ? `
        <span class="badge badge-success" title="Lớp: ${currentUser.schoolClass}">
          👤 ${currentUser.fullName}
        </span>
        <button type="button" class="btn btn-outline btn-sm" id="logout-btn" title="Đăng xuất tài khoản">
          Đăng xuất
        </button>
      `
      : `
        <a href="login.html" class="btn btn-primary btn-sm">🔐 Đăng nhập</a>
      `;

    headerEl.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand-logo">
          <span class="brand-icon">💻</span>
          <span>${data.siteInfo.title}</span>
        </a>
        <nav aria-label="Điều hướng chính">
          <ul class="nav-menu" id="main-nav-menu">
            ${menuHtml}
          </ul>
        </nav>
        <div class="header-actions">
          ${userWidgetHtml}
          <button type="button" class="icon-btn" id="theme-toggle-btn" title="Chuyển chế độ Sáng / Tối">
            ${currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button type="button" class="icon-btn mobile-menu-btn" id="mobile-menu-btn" title="Mở danh mục">
            ☰
          </button>
        </div>
      </div>
    `;

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleThemeMode());
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.AuthService) {
      logoutBtn.addEventListener('click', () => AuthService.logout());
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('main-nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  },

  renderTopNavigationBar(data) {
    const barEl = document.getElementById('page-top-bar');
    if (!barEl) return;

    const currentPageId = this.getActivePageId();
    const currentItem = data.navigation.find(item => item.id === currentPageId);
    if (!currentItem || currentPageId === 'home') {
      barEl.style.display = 'none';
      return;
    }

    barEl.innerHTML = `
      <div class="breadcrumb">
        <a href="index.html">🏠 Trang chủ</a>
        <span>/</span>
        <strong>${currentItem.icon} ${currentItem.title}</strong>
      </div>
      <div>
        <a href="index.html" class="btn btn-outline btn-sm">⬅ Quay lại Trang chủ</a>
      </div>
    `;
  },

  renderBottomNavigationBar(data) {
    const bottomEl = document.getElementById('page-bottom-nav');
    if (!bottomEl) return;

    const currentPageId = this.getActivePageId();
    const navItems = data.navigation;
    const idx = navItems.findIndex(item => item.id === currentPageId);
    if (idx === -1) return;

    const prevPage = idx > 0 ? navItems[idx - 1] : null;
    const nextPage = idx < navItems.length - 1 ? navItems[idx + 1] : null;

    bottomEl.innerHTML = `
      <div>
        ${prevPage ? `<a href="${prevPage.url}" class="btn btn-outline">← Trang trước: ${prevPage.title}</a>` : ''}
      </div>
      <div>
        ${currentPageId !== 'home' ? `<a href="index.html" class="btn btn-outline">🏠 Quay lại Trang chủ</a>` : ''}
      </div>
      <div>
        ${nextPage ? `<a href="${nextPage.url}" class="btn btn-primary">Trang tiếp: ${nextPage.title} →</a>` : ''}
      </div>
    `;
  },

  renderFooter(data) {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const { author } = data.siteInfo;
    const navLinks = data.navigation.map(item =>
      `<li style="margin-bottom: 0.35rem;"><a href="${item.url}">${item.icon} ${item.title}</a></li>`
    ).join('');

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-heading">💻 ${data.siteInfo.title}</div>
            <p style="margin-bottom: 0.75rem;">${data.siteInfo.description}</p>
            <span class="badge">JSON-Driven Website • Chuẩn GDPT 2018</span>
          </div>
          <div>
            <div class="footer-heading">Danh mục các trang</div>
            <ul style="list-style: none;">
              ${navLinks}
            </ul>
          </div>
          <div>
            <div class="footer-heading">Thông tin tác giả</div>
            <p><strong>Họ và tên:</strong> ${author.name}</p>
            <p><strong>Số điện thoại:</strong> <a href="tel:${author.phone}">${author.phone}</a></p>
            <p><strong>Vai trò:</strong> ${author.role}</p>
          </div>
        </div>
        <div style="margin-top: 1.65rem; padding-top: 1.15rem; border-top: 1px solid var(--border-color); text-align: center; font-size: 0.86rem;">
          © 2026 <strong>${data.siteInfo.title}</strong> — Thiết kế & Phát triển bởi <strong>${author.name}</strong> (SĐT: ${author.phone}).
        </div>
      </div>
    `;
  }
};

window.Router = Router;