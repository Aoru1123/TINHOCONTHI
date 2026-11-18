/**
 * QUIZ.JS
 * Xử lý Ngân hàng câu hỏi Luyện tập (chấm điểm tức thì, giải thích, lưu yêu thích)
 * và Hệ thống Đề thi thử (đồng hồ đếm ngược, nộp bài, thống kê điểm số)
 */

const QuizEngine = {
  timerInterval: null,
  remainingSeconds: 0,
  activeExam: null,
  userExamAnswers: {},

  renderPracticePage(data) {
    const container = document.getElementById('page-content');
    if (!container) return;

    const topicsOptions = data.topics.map(t =>
      `<option value="${t.id}">${t.name}</option>`
    ).join('');

    container.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <h1 class="card-title" style="font-size: 1.5rem;">✍️ Ngân hàng Câu hỏi Trắc nghiệm</h1>
            <p style="color: var(--text-secondary);">Chọn đáp án để chấm điểm tự động, xem giải thích chi tiết và đánh dấu câu hỏi yêu thích.</p>
          </div>
          <span class="badge" id="practice-score-badge">Đã làm: 0 câu</span>
        </div>
      </div>

      <div class="filter-bar">
        <input type="text" id="practice-search" class="search-input" placeholder="🔍 Tìm kiếm nội dung câu hỏi hoặc từ khóa..." />
        <select id="practice-topic-filter" class="select-input">
          <option value="ALL">Tất cả chuyên đề</option>
          ${topicsOptions}
        </select>
        <select id="practice-fav-filter" class="select-input">
          <option value="ALL">Tất cả câu hỏi</option>
          <option value="FAV">⭐ Câu hỏi yêu thích đã lưu</option>
        </select>
        <button type="button" id="reset-practice-btn" class="btn btn-outline btn-sm">Làm mới lựa chọn</button>
      </div>

      <div id="practice-questions-list"></div>
    `;

    const renderFilteredQuestions = () => {
      const keyword = document.getElementById('practice-search').value.trim().toLowerCase();
      const topicFilter = document.getElementById('practice-topic-filter').value;
      const favFilter = document.getElementById('practice-fav-filter').value;

      const filtered = data.questions.filter(q => {
        const matchKeyword = !keyword ||
          q.question.toLowerCase().includes(keyword) ||
          q.explanation.toLowerCase().includes(keyword) ||
          q.topicName.toLowerCase().includes(keyword);
        const matchTopic = topicFilter === 'ALL' || q.topicId === topicFilter;
        const matchFav = favFilter === 'ALL' || DataLoader.isFavoriteQuestion(q.id);
        return matchKeyword && matchTopic && matchFav;
      });

      this.updatePracticeBadge(data);
      const listEl = document.getElementById('practice-questions-list');

      if (filtered.length === 0) {
        listEl.innerHTML = `
          <div class="card" style="text-align: center; padding: 2.5rem;">
            <p>Không tìm thấy câu hỏi nào khớp với bộ lọc hiện tại.</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = filtered.map((q, idx) => {
        const isFav = DataLoader.isFavoriteQuestion(q.id);
        const letters = ['A', 'B', 'C', 'D'];
        const optionsHtml = q.options.map((opt, optIdx) => `
          <div class="option-item" data-qid="${q.id}" data-opt="${optIdx}">
            <strong>${letters[optIdx]}.</strong>
            <span>${this.escapeHtml(opt)}</span>
          </div>
        `).join('');

        return `
          <div class="question-card" id="qcard-${q.id}">
            <div class="card-header">
              <div>
                <span class="badge">${q.topicName}</span>
                <span class="badge badge-warning" style="margin-left: 0.35rem;">${q.level}</span>
              </div>
              <button type="button" class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${q.id}">
                ${isFav ? '★ Đã yêu thích' : '☆ Yêu thích'}
              </button>
            </div>
            <div style="font-weight: 600; font-size: 1.05rem; white-space: pre-line;">
              Câu ${idx + 1}: ${this.escapeHtml(q.question)}
            </div>
            <div class="options-list">
              ${optionsHtml}
            </div>
            <div class="explanation-box" id="exp-${q.id}">
              <strong>💡 Giải thích chi tiết:</strong> ${this.escapeHtml(q.explanation)}
            </div>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.option-item').forEach(optEl => {
        optEl.addEventListener('click', () => {
          const qId = optEl.getAttribute('data-qid');
          const selectedIdx = Number(optEl.getAttribute('data-opt'));
          const questionObj = data.questions.find(item => item.id === qId);
          if (!questionObj) return;

          const cardEl = document.getElementById(`qcard-${qId}`);
          cardEl.querySelectorAll('.option-item').forEach((el, i) => {
            el.classList.remove('selected', 'correct', 'incorrect');
            if (i === questionObj.correctIndex) {
              el.classList.add('correct');
            } else if (i === selectedIdx) {
              el.classList.add('incorrect');
            }
          });

          const expEl = document.getElementById(`exp-${qId}`);
          if (expEl) expEl.classList.add('show');

          DataLoader.recordPracticeAnswer(qId, selectedIdx === questionObj.correctIndex);
          this.updatePracticeBadge(data);
        });
      });

      listEl.querySelectorAll('[data-fav-id]').forEach(favBtn => {
        favBtn.addEventListener('click', () => {
          const qId = favBtn.getAttribute('data-fav-id');
          const isNowFav = DataLoader.toggleFavoriteQuestion(qId);
          favBtn.classList.toggle('active', isNowFav);
          favBtn.textContent = isNowFav ? '★ Đã yêu thích' : '☆ Yêu thích';
          if (document.getElementById('practice-fav-filter').value === 'FAV') {
            renderFilteredQuestions();
          }
        });
      });
    };

    document.getElementById('practice-search').addEventListener('input', renderFilteredQuestions);
    document.getElementById('practice-topic-filter').addEventListener('change', renderFilteredQuestions);
    document.getElementById('practice-fav-filter').addEventListener('change', renderFilteredQuestions);
    document.getElementById('reset-practice-btn').addEventListener('click', renderFilteredQuestions);

    renderFilteredQuestions();
  },

  updatePracticeBadge(data) {
    const badge = document.getElementById('practice-score-badge');
    if (!badge) return;
    const summary = DataLoader.getProgressSummary(data);
    badge.textContent = `Đã làm: ${summary.answeredCount}/${summary.totalQuestions} câu (Đúng: ${summary.correctCount})`;
  },

  renderExamsPage(data) {
    this.stopTimer();
    const container = document.getElementById('page-content');
    if (!container) return;

    const history = DataLoader.getExamHistory();
    const examCardsHtml = data.exams.map(exam => `
      <div class="card">
        <div>
          <div class="card-header">
            <span class="badge">${exam.level}</span>
            <span class="badge badge-warning">⏱️ ${exam.durationMinutes} phút</span>
          </div>
          <h3 class="card-title" style="margin-bottom: 0.5rem;">${exam.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 1rem;">
            ${exam.description}
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">
            <strong>Số lượng câu hỏi:</strong> ${exam.questionIds.length} câu trắc nghiệm
          </p>
        </div>
        <button type="button" class="btn btn-primary start-exam-btn" data-exam-id="${exam.id}">
          🚀 Bắt đầu làm đề
        </button>
      </div>
    `).join('');

    const historyHtml = history.length === 0
      ? `<p style="color: var(--text-muted);">Chưa có lượt làm đề nào được lưu. Hãy chọn một đề thi phía trên để bắt đầu!</p>`
      : `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
                <th style="padding: 0.65rem;">Tên đề thi</th>
                <th style="padding: 0.65rem;">Điểm số (Thang 10)</th>
                <th style="padding: 0.65rem;">Số câu đúng</th>
                <th style="padding: 0.65rem;">Thời gian nộp</th>
              </tr>
            </thead>
            <tbody>
              ${history.map(item => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.65rem; font-weight: 600;">${item.examTitle}</td>
                  <td style="padding: 0.65rem;"><span class="badge badge-success">${item.score10} / 10</span></td>
                  <td style="padding: 0.65rem;">${item.correctCount} / ${item.totalQuestions}</td>
                  <td style="padding: 0.65rem; color: var(--text-muted);">${item.submittedAt}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

    container.innerHTML = `
      <div class="card" style="margin-bottom: 1.5rem;">
        <h1 class="card-title" style="font-size: 1.5rem;">⏱️ Phòng Thi Thử Tốt Nghiệp THPT Môn Tin Học</h1>
        <p style="color: var(--text-secondary);">Hệ thống tích hợp đồng hồ đếm ngược, tự động chấm điểm thang 10, hiển thị đáp án giải thích và lưu lịch sử thi vào LocalStorage.</p>
      </div>

      <div id="exam-workspace">
        <div class="grid-3" style="margin-bottom: 2rem;">
          ${examCardsHtml}
        </div>

        <div class="card">
          <h2 class="card-title" style="margin-bottom: 1rem;">📊 Lịch sử kết quả làm đề của bạn</h2>
          ${historyHtml}
        </div>
      </div>
    `;

    container.querySelectorAll('.start-exam-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const examId = btn.getAttribute('data-exam-id');
        const exam = data.exams.find(e => e.id === examId);
        if (exam) this.startExamSession(exam, data);
      });
    });
  },

  startExamSession(exam, data) {
    this.stopTimer();
    this.activeExam = exam;
    this.userExamAnswers = {};
    this.remainingSeconds = exam.durationMinutes * 60;

    const workspace = document.getElementById('exam-workspace');
    const examQuestions = exam.questionIds
      .map(id => data.questions.find(q => q.id === id))
      .filter(Boolean);

    const letters = ['A', 'B', 'C', 'D'];

    // Phân nhóm hiển thị theo từng phần (Phần I: Nhiều lựa chọn, Phần II: Đúng/Sai, Phần III: Trả lời ngắn)
    let currentPart = '';
    const questionsHtml = examQuestions.map((q, idx) => {
      const qType = q.type || 'single';
      let partHeaderHtml = '';

      const partTitle = q.part || (
        qType === 'true_false' 
          ? 'Phần II: Câu trắc nghiệm Đúng / Sai' 
          : qType === 'short_answer' 
            ? 'Phần III: Câu trắc nghiệm Trả lời ngắn' 
            : 'Phần I: Câu trắc nghiệm nhiều phương án lựa chọn'
      );

      if (partTitle !== currentPart) {
        currentPart = partTitle;
        const partSub = qType === 'true_false'
          ? 'Mỗi câu có 4 ý a, b, c, d. Thí sinh chọn Đúng hoặc Sai cho từng ý.'
          : qType === 'short_answer'
            ? 'Thí sinh điền kết quả ngắn (số hoặc từ khóa) vào ô nhập liệu.'
            : 'Thí sinh chọn duy nhất 1 phương án đúng trong 4 phương án A, B, C, D.';

        partHeaderHtml = `
          <div class="exam-part-header">
            <div>
              <h3>${partTitle}</h3>
              <div style="font-size: 0.85rem; opacity: 0.9; margin-top: 0.2rem;">${partSub}</div>
            </div>
            <span>Chuẩn GDPT 2018</span>
          </div>
        `;
      }

      // 1. Dạng câu hỏi Đúng / Sai
      if (qType === 'true_false') {
        const rowsHtml = (q.items || []).map(item => `
          <tr class="tf-row" id="exam-tfrow-${q.id}-${item.id}">
            <td class="tf-statement-cell">
              <strong>${item.id})</strong> ${this.escapeHtml(item.text)}
              <div class="tf-feedback" id="exam-tffeedback-${q.id}-${item.id}" style="display: none;"></div>
            </td>
            <td class="tf-actions-cell">
              <div class="tf-btn-group">
                <button type="button" class="tf-btn" data-qid="${q.id}" data-item="${item.id}" data-val="true">Đúng</button>
                <button type="button" class="tf-btn" data-qid="${q.id}" data-item="${item.id}" data-val="false">Sai</button>
              </div>
            </td>
          </tr>
        `).join('');

        return `
          ${partHeaderHtml}
          <div class="question-card" id="exam-qcard-${q.id}">
            <div class="card-header">
              <span class="badge">Câu ${idx + 1} / ${examQuestions.length}</span>
              <span class="badge badge-warning">Đúng / Sai</span>
              <span class="badge">${q.topicName}</span>
            </div>
            <div style="font-weight: 600; font-size: 1.05rem; white-space: pre-line; margin-bottom: 0.5rem;">
              ${this.escapeHtml(q.question)}
            </div>
            <table class="tf-table">
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
            <div class="explanation-box" id="exam-exp-${q.id}">
              <strong>💡 Giải thích chi tiết & Điểm đạt được:</strong>
              <div id="exam-exp-details-${q.id}" style="margin-top: 0.5rem;"></div>
            </div>
          </div>
        `;
      }

      // 2. Dạng câu hỏi Trả lời ngắn
      if (qType === 'short_answer') {
        return `
          ${partHeaderHtml}
          <div class="question-card" id="exam-qcard-${q.id}">
            <div class="card-header">
              <span class="badge">Câu ${idx + 1} / ${examQuestions.length}</span>
              <span class="badge badge-success">Trả lời ngắn</span>
              <span class="badge">${q.topicName}</span>
            </div>
            <div style="font-weight: 600; font-size: 1.05rem; white-space: pre-line; margin-bottom: 0.75rem;">
              ${this.escapeHtml(q.question)}
            </div>
            <div class="short-answer-container">
              <div class="short-answer-input-wrap">
                <input 
                  type="text" 
                  class="short-answer-input" 
                  id="exam-sainput-${q.id}" 
                  data-qid="${q.id}" 
                  placeholder="Nhập câu trả lời (số hoặc chuỗi)..." 
                  autocomplete="off"
                />
              </div>
              <div id="exam-saresult-${q.id}" style="margin-top: 0.5rem; font-size: 0.92rem; display: none;"></div>
            </div>
            <div class="explanation-box" id="exam-exp-${q.id}">
              <strong>💡 Đáp án đúng:</strong> <span style="color: #10b981; font-weight: bold;">${Array.isArray(q.correctAnswers) ? q.correctAnswers.join(' hoặc ') : (q.correctAnswer || '')}</span>.
              <div style="margin-top: 0.4rem;">${this.escapeHtml(q.explanation || '')}</div>
            </div>
          </div>
        `;
      }

      // 3. Dạng câu hỏi 4 lựa chọn A, B, C, D (Mặc định)
      const optionsHtml = (q.options || []).map((opt, optIdx) => `
        <div class="option-item exam-option" data-qid="${q.id}" data-opt="${optIdx}">
          <strong>${letters[optIdx]}.</strong>
          <span>${this.escapeHtml(opt)}</span>
        </div>
      `).join('');

      return `
        ${partHeaderHtml}
        <div class="question-card" id="exam-qcard-${q.id}">
          <div class="card-header">
            <span class="badge">Câu ${idx + 1} / ${examQuestions.length}</span>
            <span class="badge">${q.topicName}</span>
          </div>
          <div style="font-weight: 600; font-size: 1.05rem; white-space: pre-line;">
            ${this.escapeHtml(q.question)}
          </div>
          <div class="options-list">
            ${optionsHtml}
          </div>
          <div class="explanation-box" id="exam-exp-${q.id}">
            <strong>💡 Đáp án đúng: ${letters[q.correctIndex]}.</strong> ${this.escapeHtml(q.explanation || '')}
          </div>
        </div>
      `;
    }).join('');

    workspace.innerHTML = `
      <div class="exam-sticky-bar">
        <div>
          <strong>${exam.title}</strong>
          <div style="font-size: 0.85rem; color: var(--text-secondary);" id="exam-answered-counter">
            Đã làm: 0 / ${examQuestions.length} câu
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="timer-display" id="exam-timer-display">00:00</div>
          <button type="button" class="btn btn-primary" id="submit-exam-btn">Nộp bài & Chấm điểm</button>
          <button type="button" class="btn btn-outline btn-sm" id="cancel-exam-btn">Thoát đề</button>
        </div>
      </div>

      <div id="exam-result-banner"></div>
      <div id="exam-questions-container">${questionsHtml}</div>
    `;

    // Cập nhật bộ đếm câu đã làm
    const updateProgressCount = () => {
      let count = 0;
      examQuestions.forEach(q => {
        const qType = q.type || 'single';
        const ans = this.userExamAnswers[q.id];
        if (qType === 'single' && typeof ans === 'number') {
          count++;
        } else if (qType === 'true_false' && ans && typeof ans === 'object') {
          if (Object.keys(ans).length === (q.items || []).length) count++;
        } else if (qType === 'short_answer' && typeof ans === 'string' && ans.trim() !== '') {
          count++;
        }
      });
      const counterEl = document.getElementById('exam-answered-counter');
      if (counterEl) {
        counterEl.textContent = `Đã làm: ${count} / ${examQuestions.length} câu`;
      }
    };

    // 1. Xử lý sự kiện cho câu Single Choice
    workspace.querySelectorAll('.exam-option').forEach(optEl => {
      optEl.addEventListener('click', () => {
        if (!this.activeExam) return;
        const qId = optEl.getAttribute('data-qid');
        const optIdx = Number(optEl.getAttribute('data-opt'));
        this.userExamAnswers[qId] = optIdx;

        const card = document.getElementById(`exam-qcard-${qId}`);
        if (card) {
          card.querySelectorAll('.exam-option').forEach((el, i) => {
            el.classList.toggle('selected', i === optIdx);
          });
        }
        updateProgressCount();
      });
    });

    // 2. Xử lý sự kiện cho câu Đúng / Sai
    workspace.querySelectorAll('.tf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.activeExam) return;
        const qId = btn.getAttribute('data-qid');
        const itemId = btn.getAttribute('data-item');
        const val = btn.getAttribute('data-val') === 'true';

        if (!this.userExamAnswers[qId]) {
          this.userExamAnswers[qId] = {};
        }
        this.userExamAnswers[qId][itemId] = val;

        const row = document.getElementById(`exam-tfrow-${qId}-${itemId}`);
        if (row) {
          const btnGroup = row.querySelector('.tf-btn-group');
          btnGroup.querySelectorAll('.tf-btn').forEach(b => {
            b.classList.remove('selected-true', 'selected-false');
          });
          if (val) {
            btn.classList.add('selected-true');
          } else {
            btn.classList.add('selected-false');
          }
        }
        updateProgressCount();
      });
    });

    // 3. Xử lý sự kiện cho câu Trả lời ngắn
    workspace.querySelectorAll('.short-answer-input').forEach(input => {
      input.addEventListener('input', () => {
        if (!this.activeExam) return;
        const qId = input.getAttribute('data-qid');
        this.userExamAnswers[qId] = input.value.trim();
        updateProgressCount();
      });
    });

    document.getElementById('submit-exam-btn').addEventListener('click', () => {
      this.submitExam(exam, examQuestions, data);
    });

    document.getElementById('cancel-exam-btn').addEventListener('click', () => {
      this.renderExamsPage(data);
    });

    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.remainingSeconds -= 1;
      this.updateTimerDisplay();
      if (this.remainingSeconds <= 0) {
        this.submitExam(exam, examQuestions, data);
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const el = document.getElementById('exam-timer-display');
    if (!el) return;
    const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
    const secs = Math.max(0, this.remainingSeconds) % 60;
    el.textContent = `⏳ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  submitExam(exam, examQuestions, data) {
    this.stopTimer();
    this.activeExam = null;

    let totalScoreSum = 0;
    let maxPossibleScore = 0;
    let fullCorrectQuestionsCount = 0;

    let part1Correct = 0;
    let part1Total = 0;
    let part2StatementsCorrect = 0;
    let part2StatementsTotal = 0;
    let part3Correct = 0;
    let part3Total = 0;

    examQuestions.forEach(q => {
      const qType = q.type || 'single';
      maxPossibleScore += 1.0;

      // 1. Chấm điểm Trắc nghiệm 4 chọn 1
      if (qType === 'single') {
        part1Total += 1;
        const userChoice = this.userExamAnswers[q.id];
        const isCorrect = userChoice === q.correctIndex;
        if (isCorrect) {
          totalScoreSum += 1.0;
          fullCorrectQuestionsCount += 1;
          part1Correct += 1;
        }

        const card = document.getElementById(`exam-qcard-${q.id}`);
        if (card) {
          card.querySelectorAll('.exam-option').forEach((el, idx) => {
            el.classList.remove('selected');
            if (idx === q.correctIndex) {
              el.classList.add('correct');
            } else if (idx === userChoice) {
              el.classList.add('incorrect');
            }
          });
        }
        const expEl = document.getElementById(`exam-exp-${q.id}`);
        if (expEl) expEl.classList.add('show');
      }

      // 2. Chấm điểm Trắc nghiệm Đúng / Sai
      else if (qType === 'true_false') {
        const userAns = this.userExamAnswers[q.id] || {};
        const items = q.items || [];
        let itemsCorrectCount = 0;
        let detailsHtml = '<ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.92rem; line-height: 1.6;">';

        items.forEach(item => {
          part2StatementsTotal += 1;
          const userVal = userAns[item.id];
          const hasAnswered = typeof userVal === 'boolean';
          const isItemCorrect = hasAnswered && userVal === item.correct;
          if (isItemCorrect) {
            itemsCorrectCount += 1;
            part2StatementsCorrect += 1;
          }

          const row = document.getElementById(`exam-tfrow-${q.id}-${item.id}`);
          const feedbackEl = document.getElementById(`exam-tffeedback-${q.id}-${item.id}`);

          if (row) {
            row.classList.remove('correct-row', 'incorrect-row');
            row.classList.add(isItemCorrect ? 'correct-row' : 'incorrect-row');
          }

          if (feedbackEl) {
            feedbackEl.style.display = 'block';
            feedbackEl.className = `tf-feedback ${isItemCorrect ? 'is-correct' : 'is-incorrect'}`;
            const userText = hasAnswered ? (userVal ? 'Đúng' : 'Sai') : 'Chưa chọn';
            const expectedText = item.correct ? 'ĐÚNG' : 'SAI';
            feedbackEl.innerHTML = `
              <strong>${isItemCorrect ? '✓ Đúng' : '✗ Sai'}</strong> — 
              Đáp án chuẩn: <strong>${expectedText}</strong> (Bạn chọn: ${userText}). 
              ${item.explanation ? `<br><em>${this.escapeHtml(item.explanation)}</em>` : ''}
            `;
          }

          detailsHtml += `
            <li>
              <strong>Ý ${item.id})</strong> Đáp án chuẩn là <strong>${item.correct ? 'ĐÚNG' : 'SAI'}</strong>. 
              ${item.explanation ? `(${this.escapeHtml(item.explanation)})` : ''}
            </li>
          `;
        });
        detailsHtml += '</ul>';

        // Quy chế tính điểm trắc nghiệm Đúng/Sai của Bộ GD&ĐT:
        // Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.50đ | Đúng 4 ý: 1.0đ
        let qScore = 0;
        if (itemsCorrectCount === 1) qScore = 0.1;
        else if (itemsCorrectCount === 2) qScore = 0.25;
        else if (itemsCorrectCount === 3) qScore = 0.5;
        else if (itemsCorrectCount === 4) {
          qScore = 1.0;
          fullCorrectQuestionsCount += 1;
        }
        totalScoreSum += qScore;

        const expEl = document.getElementById(`exam-exp-${q.id}`);
        const detailsEl = document.getElementById(`exam-exp-details-${q.id}`);
        if (detailsEl) {
          detailsEl.innerHTML = `
            <div style="font-size: 0.95rem; margin-bottom: 0.5rem; font-weight: 600; color: ${qScore === 1.0 ? '#10b981' : '#d97706'};">
              ★ Bạn trả lời đúng ${itemsCorrectCount} / ${items.length} ý. Đạt: +${qScore.toFixed(2)} điểm (theo quy chế Bộ GD&ĐT).
            </div>
            ${detailsHtml}
          `;
        }
        if (expEl) expEl.classList.add('show');
      }

      // 3. Chấm điểm Trắc nghiệm Trả lời ngắn
      else if (qType === 'short_answer') {
        part3Total += 1;
        const userText = String(this.userExamAnswers[q.id] || '').trim().toLowerCase();
        const acceptableAnswers = Array.isArray(q.correctAnswers) 
          ? q.correctAnswers.map(a => String(a).trim().toLowerCase())
          : [String(q.correctAnswer || '').trim().toLowerCase()];

        const isCorrect = userText !== '' && acceptableAnswers.includes(userText);
        if (isCorrect) {
          totalScoreSum += 1.0;
          fullCorrectQuestionsCount += 1;
          part3Correct += 1;
        }

        const inputEl = document.getElementById(`exam-sainput-${q.id}`);
        const resEl = document.getElementById(`exam-saresult-${q.id}`);

        if (inputEl) {
          inputEl.disabled = true;
          inputEl.classList.add(isCorrect ? 'correct' : 'incorrect');
        }

        if (resEl) {
          resEl.style.display = 'block';
          resEl.innerHTML = isCorrect 
            ? `<span style="color: #10b981; font-weight: 600;">✓ Bạn trả lời chính xác! (+1.0 điểm)</span>`
            : `<span style="color: #ef4444; font-weight: 600;">✗ Chưa chính xác. Bạn đã nhập: "${this.escapeHtml(userText || '(trống)')}"</span>`;
        }

        const expEl = document.getElementById(`exam-exp-${q.id}`);
        if (expEl) expEl.classList.add('show');
      }
    });

    const totalQuestions = examQuestions.length;
    // Thang điểm 10 chuẩn hóa
    const score10 = maxPossibleScore > 0 ? ((totalScoreSum / maxPossibleScore) * 10).toFixed(2) : '0.00';

    DataLoader.saveExamResult({
      examId: exam.id,
      examTitle: exam.title,
      correctCount: fullCorrectQuestionsCount,
      totalQuestions,
      score10
    });

    const submitBtn = document.getElementById('submit-exam-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    const bannerEl = document.getElementById('exam-result-banner');
    if (bannerEl) {
      let breakdownHtml = '<div style="margin-top: 0.75rem; font-size: 0.92rem; display: flex; flex-wrap: wrap; gap: 1rem;">';
      if (part1Total > 0) {
        breakdownHtml += `<span>• <strong>Phần I (Nhiều lựa chọn):</strong> Đúng ${part1Correct}/${part1Total} câu</span>`;
      }
      if (part2StatementsTotal > 0) {
        breakdownHtml += `<span>• <strong>Phần II (Đúng/Sai):</strong> Đúng ${part2StatementsCorrect}/${part2StatementsTotal} ý</span>`;
      }
      if (part3Total > 0) {
        breakdownHtml += `<span>• <strong>Phần III (Trả lời ngắn):</strong> Đúng ${part3Correct}/${part3Total} câu</span>`;
      }
      breakdownHtml += '</div>';

      bannerEl.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem; border: 2px solid var(--success); background-color: var(--success-bg);">
          <h2 class="card-title" style="color: var(--success);">🎉 Kết quả bài thi: ${score10} / 10 điểm</h2>
          <p style="margin-top: 0.4rem;">
            Bạn đã hoàn thành bài thi với tổng điểm quy đổi là <strong>${score10} / 10</strong>.
          </p>
          ${breakdownHtml}
          <div style="margin-top: 1.25rem;">
            <button type="button" class="btn btn-primary btn-sm" id="back-to-exam-list-btn">Quay lại danh sách Đề thi</button>
          </div>
        </div>
      `;
      document.getElementById('back-to-exam-list-btn').addEventListener('click', () => {
        this.renderExamsPage(data);
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

window.QuizEngine = QuizEngine;