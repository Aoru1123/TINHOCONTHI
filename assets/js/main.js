/**
 * MAIN.JS
 * Khởi tạo ứng dụng, đọc dữ liệu JSON từ DataLoader và render nội dung tương ứng cho 8 trang
 */

const App = {
  async init() {
    Router.initTheme();
    try {
      const data = await DataLoader.loadData();
      Router.renderHeader(data);
      Router.renderPageTopBar(data);
      Router.renderPageBottomNav(data);
      Router.renderFooter(data);

      const pageId = Router.getCurrentPageId();
      switch (pageId) {
        case 'home':
          this.renderHomePage(data);
          break;
        case 'theory':
          this.renderTheoryPage(data);
          break;
        case 'topics':
          this.renderTopicsPage(data);
          break;
        case 'practice':
          QuizEngine.renderPracticePage(data);
          break;
        case 'exams':
          QuizEngine.renderExamsPage(data);
          break;
        case 'documents':
          this.renderDocumentsPage(data);
          break;
        case 'roadmap':
          this.renderRoadmapPage(data);
          break;
        case 'contact':
          this.renderContactPage(data);
          break;
        default:
          this.renderHomePage(data);
      }
    } catch (error) {
      const container = document.getElementById('page-content');
      if (container) {
        container.innerHTML = `
          <div class="card" style="border-color: var(--danger);">
            <h2 class="card-title" style="color: var(--danger);">⚠️ Không thể nạp dữ liệu data.json</h2>
            <p style="margin-top: 0.5rem;">
              Hãy mở thư mục dự án trong <strong>Visual Studio Code</strong> và chạy bằng tiện ích <strong>Live Server</strong> (nhấp chuột phải vào <code>index.html</code> -> <em>Open with Live Server</em>) để trình duyệt cho phép đọc file JSON qua giao thức HTTP.
            </p>
          </div>
        `;
      }
    }
  },

  renderHomePage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const progress = DataLoader.getProgressSummary(data);

    const featureCards = data.navigation
      .filter(n => n.id !== 'home')
      .map(nav => `
        <div class="card">
          <div>
            <div style="font-size: 1.85rem; margin-bottom: 0.5rem;">${nav.icon}</div>
            <h3 class="card-title" style="margin-bottom: 0.4rem;">${nav.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.1rem;">
              Truy cập phân hệ ${nav.title.toLowerCase()} được đồng bộ trực tiếp từ cơ sở dữ liệu JSON trung tâm.
            </p>
          </div>
          <a href="${nav.url}" class="btn btn-outline btn-sm">Mở ${nav.title} →</a>
        </div>
      `).join('');

    container.innerHTML = `
      <section class="hero-banner">
        <div>
          <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 0.85rem;">
            🎓 ÔN THI TỐT NGHIỆP THPT MÔN TIN HỌC
          </span>
          <h1>${data.siteInfo.title}</h1>
          <p>${data.siteInfo.subtitle}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <a href="theory.html" class="btn btn-light">📘 Học Lý thuyết ngay</a>
            <a href="practice.html" class="btn btn-outline" style="color: #fff; border-color: rgba(255,255,255,0.5);">✍️ Luyện trắc nghiệm</a>
            <a href="exams.html" class="btn btn-outline" style="color: #fff; border-color: rgba(255,255,255,0.5);">⏱️ Thi thử bấm giờ</a>
          </div>
        </div>
        <div class="hero-stats-box">
          <h3 style="margin-bottom: 0.85rem; font-size: 1.1rem;">📈 Tiến độ học tập của bạn</h3>
          <div style="margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
              <span>Bài học Lý thuyết đã hoàn thành</span>
              <strong>${progress.completedLessons}/${progress.totalLessons} (${progress.lessonPercent}%)</strong>
            </div>
            <div class="progress-wrap">
              <div class="progress-fill" style="width: ${progress.lessonPercent}%; background: #38bdf8;"></div>
            </div>
          </div>
          <div style="margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
              <span>Câu hỏi Luyện tập đã giải</span>
              <strong>${progress.answeredCount}/${progress.totalQuestions} (${progress.practicePercent}%)</strong>
            </div>
            <div class="progress-wrap">
              <div class="progress-fill" style="width: ${progress.practicePercent}%; background: #4ade80;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
              <span>Checklist Lộ trình ôn tập</span>
              <strong>${progress.doneRoadmapTasks}/${progress.totalRoadmapTasks} (${progress.roadmapPercent}%)</strong>
            </div>
            <div class="progress-wrap">
              <div class="progress-fill" style="width: ${progress.roadmapPercent}%; background: #facc15;"></div>
            </div>
          </div>
        </div>
      </section>

      <section style="margin-bottom: 2rem;">
        <div class="filter-bar">
          <input type="text" id="global-home-search" class="search-input" placeholder="🔎 Tìm nhanh bài học lý thuyết hoặc câu hỏi trắc nghiệm ngay tại Trang chủ..." />
        </div>
        <div id="global-search-results"></div>
      </section>

      <section>
        <h2 style="margin-bottom: 1rem; font-size: 1.35rem;">🚀 Các phân hệ chức năng chính</h2>
        <div class="grid-4">
          ${featureCards}
        </div>
      </section>
    `;

    const searchInput = document.getElementById('global-home-search');
    const resultsBox = document.getElementById('global-search-results');

    searchInput.addEventListener('input', () => {
      const kw = searchInput.value.trim().toLowerCase();
      if (!kw) {
        resultsBox.innerHTML = '';
        return;
      }

      const matchedLessons = data.theory.filter(t =>
        t.title.toLowerCase().includes(kw) ||
        t.summary.toLowerCase().includes(kw) ||
        t.chapter.toLowerCase().includes(kw)
      );

      const matchedQuestions = data.questions.filter(q =>
        q.question.toLowerCase().includes(kw) ||
        q.topicName.toLowerCase().includes(kw)
      );

      resultsBox.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 class="card-title" style="margin-bottom: 0.75rem;">
            Kết quả tìm kiếm nhanh cho "${QuizEngine.escapeHtml(kw)}":
          </h3>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">
            📘 <strong>Bài học lý thuyết (${matchedLessons.length}):</strong>
            ${matchedLessons.map(l => `<a href="theory.html" style="margin-right: 0.75rem; display: inline-block;">• ${l.title}</a>`).join('') || 'Không có'}
          </p>
          <p style="font-size: 0.9rem;">
            ✍️ <strong>Câu hỏi liên quan (${matchedQuestions.length}):</strong>
            ${matchedQuestions.slice(0, 4).map(q => `<a href="practice.html" style="margin-right: 0.75rem; display: inline-block;">• ${QuizEngine.escapeHtml(q.question.slice(0, 65))}...</a>`).join('') || 'Không có'}
          </p>
        </div>
      `;
    });
  },

  renderTheoryPage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const chapters = [...new Set(data.theory.map(item => item.chapter))];
    const chapterOptions = chapters.map(ch => `<option value="${ch}">${ch}</option>`).join('');

    container.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <h1 class="card-title" style="font-size: 1.5rem;">📘 Kho Lý Thuyết Tin Học THPT</h1>
            <p style="color: var(--text-secondary);">Hệ thống kiến thức cô đọng theo từng chủ đề. Đánh dấu "Đã học xong" để lưu tiến độ vào LocalStorage.</p>
          </div>
          <span class="badge" id="theory-progress-badge">Tiến độ: 0%</span>
        </div>
      </div>

      <div class="filter-bar">
        <input type="text" id="theory-search" class="search-input" placeholder="🔍 Tìm kiếm tên bài học, khái niệm (TCP/IP, SQL, HTML, AI...)" />
        <select id="theory-chapter-filter" class="select-input">
          <option value="ALL">Tất cả chủ đề</option>
          ${chapterOptions}
        </select>
      </div>

      <div id="theory-list-container" class="grid-2"></div>
    `;

    const renderLessons = () => {
      const kw = document.getElementById('theory-search').value.trim().toLowerCase();
      const chFilter = document.getElementById('theory-chapter-filter').value;

      const filtered = data.theory.filter(lesson => {
        const matchKw = !kw ||
          lesson.title.toLowerCase().includes(kw) ||
          lesson.summary.toLowerCase().includes(kw) ||
          lesson.content.toLowerCase().includes(kw) ||
          lesson.keyPoints.some(kp => kp.toLowerCase().includes(kw));
        const matchCh = chFilter === 'ALL' || lesson.chapter === chFilter;
        return matchKw && matchCh;
      });

      const summary = DataLoader.getProgressSummary(data);
      const badgeEl = document.getElementById('theory-progress-badge');
      if (badgeEl) {
        badgeEl.textContent = `Đã hoàn thành: ${summary.completedLessons}/${summary.totalLessons} bài (${summary.lessonPercent}%)`;
      }

      const listEl = document.getElementById('theory-list-container');
      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="card"><p>Không tìm thấy bài học phù hợp.</p></div>`;
        return;
      }

      listEl.innerHTML = filtered.map(lesson => {
        const isDone = DataLoader.isLessonCompleted(lesson.id);
        const keyPointsHtml = lesson.keyPoints.map(kp => `<li>${QuizEngine.escapeHtml(kp)}</li>`).join('');

        return `
          <article class="card">
            <div>
              <div class="card-header">
                <span class="badge">${lesson.chapter}</span>
                <span class="badge ${isDone ? 'badge-success' : 'badge-warning'}">
                  ${isDone ? '✓ Đã học xong' : `⏱ ${lesson.duration}`}
                </span>
              </div>
              <h2 class="card-title" style="margin-bottom: 0.5rem;">${lesson.title}</h2>
              <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 0.75rem;">
                ${lesson.summary}
              </p>
              <ul class="key-points-list">
                ${keyPointsHtml}
              </ul>
              <div style="background: var(--bg-muted); padding: 0.85rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1.15rem;">
                <strong>Ghi nhớ chuyên sâu:</strong> ${QuizEngine.escapeHtml(lesson.content)}
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.85rem; color: var(--text-muted);">Mức độ: ${lesson.level}</span>
              <button type="button" class="btn ${isDone ? 'btn-outline' : 'btn-primary'} btn-sm toggle-lesson-btn" data-id="${lesson.id}">
                ${isDone ? 'Đã hoàn thành ✓' : 'Đánh dấu Đã học'}
              </button>
            </div>
          </article>
        `;
      }).join('');

      listEl.querySelectorAll('.toggle-lesson-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          DataLoader.toggleLessonCompleted(id);
          renderLessons();
        });
      });
    };

    document.getElementById('theory-search').addEventListener('input', renderLessons);
    document.getElementById('theory-chapter-filter').addEventListener('change', renderLessons);
    renderLessons();
  },

  renderTopicsPage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const cardsHtml = data.topics.map(topic => {
      const formulasHtml = topic.keyFormulas.map(f => `<li>${QuizEngine.escapeHtml(f)}</li>`).join('');
      const relatedCount = data.questions.filter(q => q.topicId === topic.id).length;

      return `
        <div class="card">
          <div>
            <div class="card-header">
              <span class="badge">${topic.category}</span>
              <span class="badge badge-success">${relatedCount} câu hỏi</span>
            </div>
            <h2 class="card-title" style="margin-bottom: 0.5rem;">${topic.icon} ${topic.name}</h2>
            <p style="color: var(--text-secondary); font-size: 0.94rem;">${topic.Summary}</p>
            <ul class="key-points-list">
              ${formulasHtml}
            </ul>
            <pre class="code-block"><code>${QuizEngine.escapeHtml(topic.sampleCode)}</code></pre>
          </div>
          <div style="margin-top: 1.25rem;">
            <a href="practice.html" class="btn btn-primary btn-sm">Luyện tập chuyên đề này →</a>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <h1 class="card-title" style="font-size: 1.5rem;">🧩 6 Chuyên Đề Trọng Tâm Ôn Thi THPT</h1>
        <p style="color: var(--text-secondary);">Bao gồm Thuật toán, Lập trình Python & Web, Cơ sở dữ liệu SQL, Mạng máy tính, An toàn thông tin và Trí tuệ nhân tạo.</p>
      </div>
      <div class="grid-2">
        ${cardsHtml}
      </div>
    `;
  },

  renderDocumentsPage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    let activeGrade = 'all';

    const renderList = () => {
      const filteredDocs = (data.documents || []).filter(doc => {
        if (activeGrade === 'all') return true;
        return doc.grade === activeGrade;
      });

      const countText = document.getElementById('doc-count-display');
      if (countText) {
        countText.textContent = `Hiển thị ${filteredDocs.length} tài liệu`;
      }

      const gridEl = document.getElementById('documents-grid');
      if (!gridEl) return;

      if (filteredDocs.length === 0) {
        gridEl.innerHTML = `
          <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
            <h3 class="card-title">Chưa có tài liệu cho phân mục này</h3>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">Vui lòng chọn khối lớp khác hoặc chuyển sang "Tất cả tài liệu".</p>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = filteredDocs.map(doc => {
        const highlightsHtml = (doc.highlights || []).map(h => `<li>${QuizEngine.escapeHtml(h)}</li>`).join('');
        
        let gradeBadgeClass = 'badge-grade-12';
        if (doc.grade === '10') gradeBadgeClass = 'badge-grade-10';
        else if (doc.grade === '11') gradeBadgeClass = 'badge-grade-11';

        const imageHtml = doc.image ? `
          <div class="doc-image-wrap">
            <img src="${doc.image}" alt="${QuizEngine.escapeHtml(doc.title)}" class="doc-image" loading="lazy" />
            ${doc.imageCaption ? `<div class="doc-image-caption" title="${QuizEngine.escapeHtml(doc.imageCaption)}">📷 ${QuizEngine.escapeHtml(doc.imageCaption)}</div>` : ''}
          </div>
        ` : '';

        return `
          <div class="card doc-card">
            <div>
              ${imageHtml}
              <div class="card-header" style="margin-bottom: 0.6rem;">
                <span class="badge ${gradeBadgeClass}">LỚP ${doc.grade || '12'}</span>
                <span class="badge">${doc.category}</span>
                <span class="badge badge-warning">${doc.format || 'Tài liệu số'} • ${doc.pages || ''}</span>
              </div>
              <h2 class="card-title" style="margin-bottom: 0.5rem; font-size: 1.15rem;">📄 ${QuizEngine.escapeHtml(doc.title)}</h2>
              <p style="color: var(--text-secondary); font-size: 0.93rem; margin-bottom: 0.85rem; line-height: 1.55;">
                ${QuizEngine.escapeHtml(doc.description)}
              </p>
              <ul class="key-points-list" style="margin-bottom: 1rem;">
                ${highlightsHtml}
              </ul>
            </div>
            <div style="display: flex; gap: 0.65rem; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid var(--border-color);">
              <a href="theory.html" class="btn btn-primary btn-sm">📖 Đọc lý thuyết</a>
              <a href="practice.html" class="btn btn-outline btn-sm">✍️ Luyện trắc nghiệm</a>
            </div>
          </div>
        `;
      }).join('');
    };

    const countAll = (data.documents || []).length;
    const count10 = (data.documents || []).filter(d => d.grade === '10').length;
    const count11 = (data.documents || []).filter(d => d.grade === '11').length;
    const count12 = (data.documents || []).filter(d => d.grade === '12').length;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <h1 class="card-title" style="font-size: 1.55rem;">📂 Thư Viện Tài Liệu Ôn Tập SGK Tin Học 10 - 11 - 12 (KNTT)</h1>
        <p style="color: var(--text-secondary); margin-top: 0.3rem;">
          Hệ thống tài liệu học tập, sơ đồ tư duy trực quan, bảng tra cứu cú pháp và hình ảnh minh họa thực tế được phân loại theo từng khối lớp chuẩn GDPT 2018.
        </p>
      </div>

      <div class="doc-filter-bar">
        <div class="doc-filter-tabs">
          <button type="button" class="doc-tab-btn active" data-grade="all">
            Tất cả tài liệu (${countAll})
          </button>
          <button type="button" class="doc-tab-btn" data-grade="10">
            Lớp 10 (${count10})
          </button>
          <button type="button" class="doc-tab-btn" data-grade="11">
            Lớp 11 (${count11})
          </button>
          <button type="button" class="doc-tab-btn" data-grade="12">
            Lớp 12 & Ôn thi THPT (${count12})
          </button>
        </div>
        <div class="doc-count-badge" id="doc-count-display">
          Hiển thị ${countAll} tài liệu
        </div>
      </div>

      <div class="grid-2" id="documents-grid"></div>
    `;

    container.querySelectorAll('.doc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.doc-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGrade = btn.getAttribute('data-grade');
        renderList();
      });
    });

    renderList();
  },

  renderRoadmapPage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const renderContent = () => {
      const summary = DataLoader.getProgressSummary(data);

      const stagesHtml = data.roadmap.map(stage => {
        const tasksHtml = stage.tasks.map(task => {
          const isDone = DataLoader.isRoadmapTaskDone(task.id);
          return `
            <label class="checklist-item ${isDone ? 'done' : ''}">
              <input type="checkbox" class="roadmap-checkbox" data-task-id="${task.id}" ${isDone ? 'checked' : ''} />
              <span>${QuizEngine.escapeHtml(task.text)}</span>
            </label>
          `;
        }).join('');

        return `
          <div class="card">
            <div>
              <div class="card-header">
                <span class="badge">${stage.week}</span>
                <span class="badge badge-success">${stage.phase}</span>
              </div>
              <h2 class="card-title" style="margin-bottom: 0.35rem;">${stage.title}</h2>
              <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1rem;">
                🎯 <strong>Mục tiêu:</strong> ${stage.goal}
              </p>
              <div>${tasksHtml}</div>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div class="card-header">
            <div>
              <h1 class="card-title" style="font-size: 1.5rem;">🗺️ Lộ Trình Học Tập 8 Tuần Chinh Phục Điểm 9+</h1>
              <p style="color: var(--text-secondary);">Tích chọn từng mục tiêu trong Checklist dưới đây để theo dõi tiến độ ôn tập cá nhân của bạn.</p>
            </div>
            <span class="badge badge-success">Hoàn thành: ${summary.doneRoadmapTasks}/${summary.totalRoadmapTasks} (${summary.roadmapPercent}%)</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-fill" style="width: ${summary.roadmapPercent}%;"></div>
          </div>
        </div>

        <div class="grid-2">
          ${stagesHtml}
        </div>
      `;

      container.querySelectorAll('.roadmap-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
          const taskId = cb.getAttribute('data-task-id');
          DataLoader.toggleRoadmapTask(taskId);
          renderContent();
        });
      });
    };

    renderContent();
  },

  renderContactPage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const { author } = data.siteInfo;

    container.innerHTML = `
      <div class="grid-2">
        <div class="card">
          <div>
            <span class="badge" style="margin-bottom: 0.75rem;">THÔNG TIN TÁC GIẢ & NHÀ PHÁT TRIỂN</span>
            <h1 class="card-title" style="font-size: 1.65rem; margin-bottom: 0.75rem;">👨‍💻 ${author.name}</h1>
            <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">${author.message}</p>

            <div style="background: var(--bg-muted); padding: 1.25rem; border-radius: 10px; margin-bottom: 1.25rem;">
              <p style="margin-bottom: 0.6rem;"><strong>👤 Họ và tên:</strong> ${author.name}</p>
              <p style="margin-bottom: 0.6rem;"><strong>📱 Số điện thoại:</strong> <a href="tel:${author.phone}" style="font-weight: 700;">${author.phone}</a></p>
              <p style="margin-bottom: 0.6rem;"><strong>🏆 Vai trò:</strong> ${author.role}</p>
              <p><strong>🏫 Dự án:</strong> ${author.school}</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <a href="tel:${author.phone}" class="btn btn-primary">📞 Gọi trực tiếp: ${author.phone}</a>
            <a href="index.html" class="btn btn-outline">🏠 Về Trang chủ</a>
          </div>
        </div>

        <div class="card">
          <div>
            <h2 class="card-title" style="margin-bottom: 0.75rem;">✉️ Gửi góp ý hoặc câu hỏi ôn tập</h2>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1rem;">
              Bạn muốn đóng góp thêm câu hỏi mới vào file <code>data.json</code> hoặc cần giải đáp bài tập Tin học THPT? Hãy để lại lời nhắn bên dưới.
            </p>
            <form id="contact-feedback-form">
              <div style="margin-bottom: 0.85rem;">
                <label style="display: block; font-weight: 600; margin-bottom: 0.3rem; font-size: 0.9rem;">Họ và tên học sinh / giáo viên</label>
                <input type="text" class="search-input" style="width: 100%;" required placeholder="Nhập họ và tên của bạn..." />
              </div>
              <div style="margin-bottom: 0.85rem;">
                <label style="display: block; font-weight: 600; margin-bottom: 0.3rem; font-size: 0.9rem;">Chuyên đề quan tâm</label>
                <select class="select-input" style="width: 100%;">
                  <option>Đóng góp câu hỏi trắc nghiệm mới</option>
                  <option>Hỏi bài tập Lập trình Python / Thuật toán</option>
                  <option>Hỏi bài tập Truy vấn SQL / HTML & CSS</option>
                  <option>Góp ý giao diện & tính năng</option>
                </select>
              </div>
              <div style="margin-bottom: 1rem;">
                <label style="display: block; font-weight: 600; margin-bottom: 0.3rem; font-size: 0.9rem;">Nội dung tin nhắn</label>
                <textarea class="search-input" style="width: 100%; min-height: 100px;" required placeholder="Nhập nội dung cần trao đổi với tác giả Đặng Nguyễn Minh An..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Gửi thông tin</button>
              <div id="contact-form-status" style="margin-top: 0.85rem;"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('contact-feedback-form');
    const status = document.getElementById('contact-form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      status.innerHTML = `
        <div class="badge badge-success" style="padding: 0.6rem 1rem; font-size: 0.9rem;">
          ✓ Cảm ơn bạn! Lời nhắn đã được ghi nhận gửi tới tác giả ${author.name} (${author.phone}).
        </div>
      `;
      form.reset();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});