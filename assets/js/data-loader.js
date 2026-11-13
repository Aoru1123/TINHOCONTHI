/**
 * DATA-LOADER.JS
 * Chịu trách nhiệm tải dữ liệu trung tâm từ file data.json và quản lý LocalStorage
 * Hỗ trợ lưu trữ riêng cho từng học viên khi đăng nhập (AuthService) và chế độ khách (Guest)
 */

const STORAGE_KEYS = {
  THEME: 'studyhub_theme',
  COMPLETED_LESSONS: 'studyhub_completed_lessons',
  FAVORITE_QUESTIONS: 'studyhub_favorite_questions',
  PRACTICE_STATS: 'studyhub_practice_stats',
  PRACTICE_RECORDS: 'studyhub_practice_stats',
  EXAM_HISTORY: 'studyhub_exam_history',
  ROADMAP_TASKS: 'studyhub_roadmap_tasks',
  ROADMAP_CHECKLIST: 'studyhub_roadmap_tasks'
};

const DataLoader = {
  cache: null,
  cachedData: null,

  // Tạo khóa lưu trữ riêng biệt cho từng học viên đang đăng nhập
  getUserScopedKey(baseKey) {
    if (window.AuthService && typeof AuthService.getCurrentUser === 'function') {
      const user = AuthService.getCurrentUser();
      if (user && user.username) {
        return `${baseKey}_${user.username}`;
      }
    }
    return baseKey;
  },

  async loadData() {
    if (this.cache) return this.cache;
    if (this.cachedData) return this.cachedData;
    try {
      const response = await fetch('data.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Không thể tải data.json (HTTP ${response.status})`);
      }
      const data = await response.json();
      this.cache = data;
      this.cachedData = data;
      return data;
    } catch (error) {
      console.error('Lỗi đọc file JSON:', error);
      throw error;
    }
  },

  async fetchSiteData() {
    return this.loadData();
  },

  getArray(key) {
    try {
      const scopedKey = this.getUserScopedKey(key);
      const raw = localStorage.getItem(scopedKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  getList(key) {
    return this.getArray(key);
  },

  saveArray(key, arr) {
    const scopedKey = this.getUserScopedKey(key);
    localStorage.setItem(scopedKey, JSON.stringify(arr));
  },

  saveList(key, list) {
    this.saveArray(key, list);
  },

  toggleItemInArray(key, itemId) {
    const list = this.getArray(key);
    const index = list.indexOf(itemId);
    let added = false;
    if (index === -1) {
      list.push(itemId);
      added = true;
    } else {
      list.splice(index, 1);
    }
    this.saveArray(key, list);
    return added;
  },

  toggleListItem(key, id) {
    return this.toggleItemInArray(key, id);
  },

  isLessonCompleted(lessonId) {
    return this.getArray(STORAGE_KEYS.COMPLETED_LESSONS).includes(lessonId);
  },

  isLessonDone(lessonId) {
    return this.isLessonCompleted(lessonId);
  },

  toggleLessonCompleted(lessonId) {
    return this.toggleItemInArray(STORAGE_KEYS.COMPLETED_LESSONS, lessonId);
  },

  toggleLessonDone(lessonId) {
    return this.toggleLessonCompleted(lessonId);
  },

  isFavoriteQuestion(questionId) {
    return this.getArray(STORAGE_KEYS.FAVORITE_QUESTIONS).includes(questionId);
  },

  isQuestionFavorite(questionId) {
    return this.isFavoriteQuestion(questionId);
  },

  toggleFavoriteQuestion(questionId) {
    return this.toggleItemInArray(STORAGE_KEYS.FAVORITE_QUESTIONS, questionId);
  },

  toggleQuestionFavorite(questionId) {
    return this.toggleFavoriteQuestion(questionId);
  },

  isRoadmapTaskDone(taskId) {
    return this.getArray(STORAGE_KEYS.ROADMAP_TASKS).includes(taskId);
  },

  isRoadmapTaskCompleted(taskId) {
    return this.isRoadmapTaskDone(taskId);
  },

  toggleRoadmapTask(taskId) {
    return this.toggleItemInArray(STORAGE_KEYS.ROADMAP_TASKS, taskId);
  },

  toggleRoadmapTaskCompleted(taskId) {
    return this.toggleRoadmapTask(taskId);
  },

  recordPracticeAnswer(questionId, isCorrect) {
    try {
      const scopedKey = this.getUserScopedKey(STORAGE_KEYS.PRACTICE_STATS);
      const raw = localStorage.getItem(scopedKey);
      const stats = raw ? JSON.parse(raw) : {};
      stats[questionId] = {
        isCorrect: Boolean(isCorrect),
        updatedAt: new Date().toISOString(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(scopedKey, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  },

  savePracticeAttempt(questionId, isCorrect) {
    this.recordPracticeAnswer(questionId, isCorrect);
  },

  getPracticeStats() {
    try {
      const scopedKey = this.getUserScopedKey(STORAGE_KEYS.PRACTICE_STATS);
      const raw = localStorage.getItem(scopedKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  getPracticeRecords() {
    return this.getPracticeStats();
  },

  saveExamResult(examResult) {
    const history = this.getArray(STORAGE_KEYS.EXAM_HISTORY);
    history.unshift({
      ...examResult,
      submittedAt: new Date().toLocaleString('vi-VN')
    });
    this.saveArray(STORAGE_KEYS.EXAM_HISTORY, history.slice(0, 20));
  },

  addExamHistory(entry) {
    this.saveExamResult(entry);
  },

  getExamHistory() {
    return this.getArray(STORAGE_KEYS.EXAM_HISTORY);
  },

  getProgressSummary(data) {
    const completedLessons = this.getArray(STORAGE_KEYS.COMPLETED_LESSONS).length;
    const totalLessons = data && data.theory ? data.theory.length : 0;

    const practiceStats = this.getPracticeStats();
    const answeredCount = Object.keys(practiceStats).length;
    const correctCount = Object.values(practiceStats).filter(x => x.isCorrect).length;
    const totalQuestions = data && data.questions ? data.questions.length : 0;

    let totalRoadmapTasks = 0;
    if (data && data.roadmap) {
      data.roadmap.forEach(stage => {
        totalRoadmapTasks += stage.tasks ? stage.tasks.length : 0;
      });
    }
    const doneRoadmapTasks = this.getArray(STORAGE_KEYS.ROADMAP_TASKS).length;
    const examHistory = this.getExamHistory();

    const lessonPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const practicePercent = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    const roadmapPercent = totalRoadmapTasks ? Math.round((doneRoadmapTasks / totalRoadmapTasks) * 100) : 0;

    return {
      completedLessons,
      doneLessons: completedLessons,
      totalLessons,
      lessonPercent,

      answeredCount,
      answeredQuestions: answeredCount,
      correctCount,
      correctQuestions: correctCount,
      totalQuestions,
      practicePercent,

      doneRoadmapTasks,
      doneTasks: doneRoadmapTasks,
      totalRoadmapTasks,
      totalTasks: totalRoadmapTasks,
      roadmapPercent,

      examsTaken: examHistory.length
    };
  },

  calculateOverallProgress(data) {
    return this.getProgressSummary(data);
  }
};

window.DataLoader = DataLoader;
window.STORAGE_KEYS = STORAGE_KEYS;
