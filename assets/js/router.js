/**
 * ROUTER.JS
 * Quản lý thanh điều hướng (Header), Chân trang (Footer), Nút quay về trang chủ,
 * Điều hướng Trang trước / Trang tiếp theo và Chế độ Sáng / Tối từ dữ liệu JSON
 */

const Router = {
  getCurrentPageId() {
    const bodyPage = document.body.getAttribute('data-page');
    if (bodyPage) return bodyPage;
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const mapping = {
      'index.html': 'home',
      'theory.html': 'theory',
      'topics.html': 'topics',
      'practice.html': 'practice',
      'exams.html': 'exams',
      'documents.html': 'documents',
      'roadmap.html': 'roadmap',
      'contact.html': 'contact'
    };
    return mapping[path] || 'home';
  },

  initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
      btn.title = next === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';
    }
  },

  renderHeader(data) {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentPageId = this.getCurrentPageId();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    const navItemsHtml = data.navigation.map(item => {
      const isActive = item.id === currentPageId ? 'active' : '';
      return `
        <li>
          <a href="${item.url}" class="nav-link ${isActive}">
            <span>${item.icon}</span>
            <span>${item.title}</span>
          </a>
        </li>
      `;
    }).join('');

    headerEl.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand-logo" title="Về Trang chủ ${data.siteInfo.title}">
          <span class="brand-badge">💻</span>
          <span>${data.siteInfo.title}</span>
        </a>
        <nav aria-label="Menu chính">
          <ul class="nav-menu" id="main-nav-menu">
            ${navItemsHtml}
          </ul>
        </nav>
        <div class="header-actions">
          <button type="button" class="icon-btn" id="theme-toggle-btn" title="Đổi giao diện Sáng/Tối">
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
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('main-nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  },

  renderPageTopBar(data) {
    const topBarEl = document.getElementById('page-top-bar');
    if (!topBarEl) return;

    const currentPageId = this.getCurrentPageId();
    const currentNav = data.navigation.find(n => n.id === currentPageId);
    if (!currentNav || currentPageId === 'home') {
      topBarEl.style.display = 'none';
      return;
    }

    topBarEl.innerHTML = `
      <div class="breadcrumb">
        <a href="index.html">🏠 Trang chủ</a>
        <span>/</span>
        <strong>${currentNav.icon} ${currentNav.title}</strong>
      </div>
      <div>
        <a href="index.html" class="btn btn-outline btn-sm">⬅ Quay lại Trang chủ</a>
      </div>
    `;
  },

  renderPageBottomNav(data) {
    const bottomNavEl = document.getElementById('page-bottom-nav');
    if (!bottomNavEl) return;

    const currentPageId = this.getCurrentPageId();
    const navList = data.navigation;
    const currentIndex = navList.findIndex(n => n.id === currentPageId);

    const prevItem = currentIndex > 0 ? navList[currentIndex - 1] : null;
    const nextItem = currentIndex < navList.length - 1 ? navList[currentIndex + 1] : null;

    bottomNavEl.innerHTML = `
      <div>
        ${prevItem ? `<a href="${prevItem.url}" class="btn btn-outline">← Trang trước: ${prevItem.title}</a>` : ''}
      </div>
      <div>
        ${currentPageId !== 'home' ? `<a href="index.html" class="btn btn-outline">🏠 Về Trang chủ</a>` : ''}
      </div>
      <div>
        ${nextItem ? `<a href="${nextItem.url}" class="btn btn-primary">Trang tiếp: ${nextItem.title} →</a>` : ''}
      </div>
    `;
  },

  renderFooter(data) {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const { author } = data.siteInfo;
    const quickLinks = data.navigation.slice(0, 6).map(item =>
      `<li style="margin-bottom: 0.35rem;"><a href="${item.url}">${item.icon} ${item.title}</a></li>`
    ).join('');

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-title">💻 ${data.siteInfo.title}</div>
            <p style="margin-bottom: 0.75rem;">${data.siteInfo.description}</p>
            <span class="badge">JSON-Driven Architecture • GDPT 2018</span>
          </div>
          <div>
            <div class="footer-title">Liên kết nhanh</div>
            <ul style="list-style: none;">
              ${quickLinks}
            </ul>
          </div>
          <div>
            <div class="footer-title">Thông tin tác giả</div>
            <p><strong>Họ và tên:</strong> ${author.name}</p>
            <p><strong>Số điện thoại:</strong> <a href="tel:${author.phone}">${author.phone}</a></p>
            <p><strong>Vai trò:</strong> ${author.role}</p>
          </div>
        </div>
        <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color); text-align: center; font-size: 0.85rem;">
          © 2026 <strong>${data.siteInfo.title}</strong> — Phát triển bởi <strong>${author.name}</strong> (SĐT: ${author.phone}).
        </div>
      </div>
    `;
  }
};

window.Router = Router;