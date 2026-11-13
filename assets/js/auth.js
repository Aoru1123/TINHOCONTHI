/**
 * AUTH.JS
 * Quản lý Đăng ký, Đăng nhập, Đăng xuất, Băm mật khẩu SHA-256 và Bảo vệ các trang học tập
 */

const AUTH_STORAGE = {
  USERS_DB: 'studyhub_users_database',
  CURRENT_SESSION: 'studyhub_current_session'
};

const AuthService = {
  // Mã hóa mật khẩu bằng thuật toán SHA-256 (Web Crypto API)
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_studyhub_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  getUsers() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE.USERS_DB);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveUsers(users) {
    localStorage.setItem(AUTH_STORAGE.USERS_DB, JSON.stringify(users));
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE.CURRENT_SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  async register({ fullName, schoolClass, username, password }) {
    const cleanUser = username.trim().toLowerCase();
    if (!/^[a-z0-9_]{4,24}$/.test(cleanUser)) {
      throw new Error('Tên đăng nhập phải từ 4-24 ký tự, chỉ gồm chữ thường, số hoặc dấu gạch dưới.');
    }
    if (password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự để đảm bảo an toàn.');
    }

    const users = this.getUsers();
    if (users.some(u => u.username === cleanUser)) {
      throw new Error('Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác.');
    }

    const passwordHash = await this.hashPassword(password);
    const newUser = {
      id: 'st_' + Date.now(),
      username: cleanUser,
      fullName: fullName.trim(),
      schoolClass: schoolClass.trim(),
      passwordHash,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    users.push(newUser);
    this.saveUsers(users);

    // Tự động đăng nhập sau khi tạo tài khoản
    const sessionUser = {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      schoolClass: newUser.schoolClass
    };
    localStorage.setItem(AUTH_STORAGE.CURRENT_SESSION, JSON.stringify(sessionUser));
    return sessionUser;
  },

  async login(username, password) {
    const cleanUser = username.trim().toLowerCase();
    const users = this.getUsers();
    const passwordHash = await this.hashPassword(password);

    const found = users.find(u => u.username === cleanUser && u.passwordHash === passwordHash);
    if (!found) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }

    const sessionUser = {
      id: found.id,
      username: found.username,
      fullName: found.fullName,
      schoolClass: found.schoolClass
    };
    localStorage.setItem(AUTH_STORAGE.CURRENT_SESSION, JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE.CURRENT_SESSION);
    window.location.href = 'login.html';
  },

  // Chặn người chưa đăng nhập vào các trang nội bộ
  enforceAuthGuard() {
    const pageId = document.body.getAttribute('data-page');
    const publicPages = ['login', 'contact'];
    const currentUser = this.getCurrentUser();

    if (!currentUser && !publicPages.includes(pageId)) {
      window.location.href = 'login.html';
      return false;
    }

    if (currentUser && pageId === 'login') {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  initLoginPageEvents() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const msgBox = document.getElementById('auth-message');

    if (!loginForm || !registerForm) return;

    const showMessage = (text, type = 'error') => {
      msgBox.textContent = text;
      msgBox.className = `auth-alert ${type}`;
    };

    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      msgBox.className = 'auth-alert';
    });

    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
      msgBox.className = 'auth-alert';
    });

    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        await this.login(username, password);
        showMessage('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 500);
      } catch (err) {
        showMessage(err.message, 'error');
      }
    });

    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        const fullName = document.getElementById('reg-fullname').value;
        const schoolClass = document.getElementById('reg-class').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) {
          throw new Error('Mật khẩu xác nhận không khớp.');
        }

        await this.register({ fullName, schoolClass, username, password });
        showMessage('Tạo tài khoản thành công! Đang vào trang học tập...', 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      } catch (err) {
        showMessage(err.message, 'error');
      }
    });
  }
};

window.AuthService = AuthService;