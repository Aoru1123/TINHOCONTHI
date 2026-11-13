/**
 * DATA-LOADER.JS (Phiên bản hỗ trợ đa tài khoản học viên)
 */

const STORAGE_KEYS = {
  THEME: 'studyhub_theme_mode',
  COMPLETED_LESSONS: 'studyhub_completed_lessons',
  FAVORITE_QUESTIONS: 'studyhub_favorite_questions',
  PRACTICE_RECORDS: 'studyhub_practice_records',
  EXAM_HISTORY: 'studyhub_exam_history',
  ROADMAP_CHECKLIST: 'studyhub_roadmap_checklist'
};

const DataLoader = {
  cachedData: null,

  // Tạo khóa lưu trữ riêng biệt cho từng học viên đang đăng nhập
  getUserScopedKey(baseKey) {
    if (window.AuthService && AuthService.getCurrentUser()) {
      const user = AuthService.getCurrentUser();
      return `${baseKey}_${user.username}`;
    }
    return baseKey;
  },

  async fetchSiteData() {
    if (this.cachedData) {
      return this.cachedData;
    }
    const response = await fetch('data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Không thể tải tệp data.json (HTTP ${response.status})`);
    }
    const jsonData = await response.json();
    this.cachedData = jsonData;
    return jsonData;
  },

  getList(key) {
    try {
      const scopedKey = this.getUserScopedKey(key);
      const raw = localStorage.getItem(scopedKey);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  },

  saveList(key, list) {
    const scopedKey = this.getUserScopedKey(key);
    localStorage.setItem(scopedKey, JSON.stringify(list));
  },

  toggleListItem(key, id) {
    const list = this.getList(key);
    const idx = list.indexOf(id);
    let isAdded = false;
    if (idx === -1) {
      list.push(id);
      isAdded = true;
    } else {
      list.splice(idx, 1);
    }
    this.saveList(key, list);
    return isAdded;
  },

  isLessonDone(lessonId) {
    return this.getList(STORAGE_KEYS.COMPLETED_LESSONS).includes(lessonId);
  },

  toggleLessonDone(lessonId) {
    return this.toggleListItem(STORAGE_KEYS.COMPLETED_LESSONS, lessonId);
  },

  isQuestionFavorite(questionId) {
    return this.getList(STORAGE_KEYS.FAVORITE_QUESTIONS).includes(questionId);
  },

  toggleQuestionFavorite(questionId) {
    return this.toggleListItem(STORAGE_KEYS.FAVORITE_QUESTIONS, questionId);
  },

  isRoadmapTaskCompleted(taskId) {
    return this.getList(STORAGE_KEYS.ROADMAP_CHECKLIST).includes(taskId);
  },

  toggleRoadmapTaskCompleted(taskId) {
    return this.toggleListItem(STORAGE_KEYS.ROADMAP_CHECKLIST, taskId);
  },

  savePracticeAttempt(questionId, isCorrect) {
    try {
      const scopedKey = this.getUserScopedKey(STORAGE_KEYS.PRACTICE_RECORDS);
      const raw = localStorage.getItem(scopedKey);
      const records = raw ? JSON.parse(raw) : {};
      records[questionId] = {
        isCorrect: Boolean(isCorrect),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(scopedKey, JSON.stringify(records));
    } catch (err) {
      console.error(err);
    }
  },

  getPracticeRecords() {
    try {
      const scopedKey = this.getUserScopedKey(STORAGE_KEYS.PRACTICE_RECORDS);
      const raw = localStorage.getItem(scopedKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  },

  addExamHistory(entry) {
    const list = this.getList(STORAGE_KEYS.EXAM_HISTORY);
    list.unshift({
      ...entry,
      submittedAt: new Date().toLocaleString('vi-VN')
    });
    this.saveList(STORAGE_KEYS.EXAM_HISTORY, list.slice(0, 20));
  },

  getExamHistory() {
    return this.getList(STORAGE_KEYS.EXAM_HISTORY);
  },

  calculateOverallProgress(data) {
    const doneLessons = this.getList(STORAGE_KEYS.COMPLETED_LESSONS).length;
    const totalLessons = data.theory ? data.theory.length : 0;

    const practiceRecords = this.getPracticeRecords();
    const answeredQuestions = Object.keys(practiceRecords).length;
    const correctQuestions = Object.values(practiceRecords).filter(r => r.isCorrect).length;
    const totalQuestions = data.questions ? data.questions.length : 0;

    let totalTasks = 0;
    if (data.roadmap) {
      data.roadmap.forEach(stage => {
        totalTasks += stage.tasks.length;
      });
    }
    const doneTasks = this.getList(STORAGE_KEYS.ROADMAP_CHECKLIST).length;

    return {
      doneLessons,
      totalLessons,
      lessonPercent: totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0,
      answeredQuestions,
      correctQuestions,
      totalQuestions,
      practicePercent: totalQuestions ? Math.round((answeredQuestions / totalQuestions) * 100) : 0,
      doneTasks,
      totalTasks,
      roadmapPercent: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0
    };
  }
};

window.DataLoader = DataLoader;
window.STORAGE_KEYS = STORAGE_KEYS;