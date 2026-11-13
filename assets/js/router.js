/**
 * ROUTER.JS
 * Quản lý thanh điều hướng (Header), Chân trang (Footer), Nút quay về trang chủ,
 * Điều hướng Trang trước / Trang tiếp theo, Chế độ Sáng / Tối và Trạng thái Học viên
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

  getCurrentPageId() {
    return this.getActivePageId();
  },

  applySavedTheme() {
    const themeKey = (window.STORAGE_KEYS && STORAGE_KEYS.THEME) ? STORAGE_KEYS.THEME : 'studyhub_theme';
    const saved = localStorage.getItem(themeKey) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  },

  initTheme() {
    this.applySavedTheme();
  },

  toggleThemeMode() {
    const themeKey = (window.STORAGE_KEYS && STORAGE_KEYS.THEME) ? STORAGE_KEYS.THEME : 'studyhub_theme';
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(themeKey, next);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
      btn.title = next === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';
    }
  },

  toggleTheme() {
    this.toggleThemeMode();
  },

  renderHeader(data) {
    if (window.AuthService && typeof AuthService.enforceAuthGuard === 'function') {
      const allowed = AuthService.enforceAuthGuard();
      if (!allowed) return;
      if (typeof AuthService.initLoginPageEvents === 'function') {
        AuthService.initLoginPageEvents();
      }
    }

    const headerEl = document.getElementById('site-header');
    if (!headerEl || !data || !data.siteInfo) return;

    const currentPageId = this.getActivePageId();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentUser = (window.AuthService && typeof AuthService.getCurrentUser === 'function')
      ? AuthService.getCurrentUser()
      : null;

    const navItems = data.navigation || [];
    const menuHtml = navItems.map(item => {
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
        <span class="badge badge-success" title="Lớp: ${currentUser.schoolClass || ''}">
          👤 ${currentUser.fullName || currentUser.username}
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
        <a href="index.html" class="brand-logo" title="Về Trang chủ ${data.siteInfo.title}">
          <span class="brand-icon brand-badge">💻</span>
          <span>${data.siteInfo.title}</span>
        </a>
        <nav aria-label="Menu chính">
          <ul class="nav-menu" id="main-nav-menu">
            ${menuHtml}
          </ul>
        </nav>
        <div class="header-actions">
          ${userWidgetHtml}
          <button type="button" class="icon-btn" id="theme-toggle-btn" title="Chuyển chế độ Sáng / Tối">
            ${currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button type="button" class="icon-btn mobile-menu-btn" id="mobile-menu-btn" title="Mở menu">
            ☰
          </button>
        </div>
      </div>
    `;

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleThemeMode());
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('main-nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.AuthService && typeof AuthService.logout === 'function') {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất tài khoản?')) {
          AuthService.logout();
        }
      });
    }
  },

  renderTopNavigationBar(data) {
    const barEl = document.getElementById('page-top-bar');
    if (!barEl || !data || !data.navigation) return;

    const currentPageId = this.getActivePageId();
    const currentItem = data.navigation.find(item => item.id === currentPageId);
    if (!currentItem || currentPageId === 'home' || currentPageId === 'login') {
      barEl.style.display = 'none';
      return;
    }

    barEl.style.display = 'flex';
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

  renderPageTopBar(data) {
    this.renderTopNavigationBar(data);
  },

  renderBottomNavigationBar(data) {
    const bottomEl = document.getElementById('page-bottom-nav');
    if (!bottomEl || !data || !data.navigation) return;

    const currentPageId = this.getActivePageId();
    if (currentPageId === 'login') {
      bottomEl.style.display = 'none';
      return;
    }

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

  renderPageBottomNav(data) {
    this.renderBottomNavigationBar(data);
  },

  renderFooter(data) {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl || !data || !data.siteInfo) return;

    const author = data.siteInfo.author || { name: '', phone: '', role: '' };
    const navItems = data.navigation || [];
    const navLinks = navItems.slice(0, 6).map(item =>
      `<li style="margin-bottom: 0.35rem;"><a href="${item.url}">${item.icon} ${item.title}</a></li>`
    ).join('');

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-heading footer-title">💻 ${data.siteInfo.title}</div>
            <p style="margin-bottom: 0.75rem;">${data.siteInfo.description}</p>
            <span class="badge">JSON-Driven Website • Chuẩn GDPT 2018</span>
          </div>
          <div>
            <div class="footer-heading footer-title">Danh mục các trang</div>
            <ul style="list-style: none;">
              ${navLinks}
            </ul>
          </div>
          <div>
            <div class="footer-heading footer-title">Thông tin tác giả</div>
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
