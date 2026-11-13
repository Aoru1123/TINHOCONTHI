/**
 * DATA-LOADER.JS
 * Chịu trách nhiệm tải dữ liệu trung tâm từ file data.json và quản lý LocalStorage
 */

const STORAGE_KEYS = {
  THEME: 'studyhub_theme',
  COMPLETED_LESSONS: 'studyhub_completed_lessons',
  FAVORITE_QUESTIONS: 'studyhub_favorite_questions',
  PRACTICE_STATS: 'studyhub_practice_stats',
  EXAM_HISTORY: 'studyhub_exam_history',
  ROADMAP_TASKS: 'studyhub_roadmap_tasks'
};

const DataLoader = {
  cache: null,

  async loadData() {
    if (this.cache) {
      return this.cache;
    }
    try {
      const response = await fetch('data.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Không thể tải data.json (HTTP ${response.status})`);
      }
      const data = await response.json();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Lỗi đọc file JSON:', error);
      throw error;
    }
  },

  getArray(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveArray(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
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

  isLessonCompleted(lessonId) {
    return this.getArray(STORAGE_KEYS.COMPLETED_LESSONS).includes(lessonId);
  },

  toggleLessonCompleted(lessonId) {
    return this.toggleItemInArray(STORAGE_KEYS.COMPLETED_LESSONS, lessonId);
  },

  isFavoriteQuestion(questionId) {
    return this.getArray(STORAGE_KEYS.FAVORITE_QUESTIONS).includes(questionId);
  },

  toggleFavoriteQuestion(questionId) {
    return this.toggleItemInArray(STORAGE_KEYS.FAVORITE_QUESTIONS, questionId);
  },

  isRoadmapTaskDone(taskId) {
    return this.getArray(STORAGE_KEYS.ROADMAP_TASKS).includes(taskId);
  },

  toggleRoadmapTask(taskId) {
    return this.toggleItemInArray(STORAGE_KEYS.ROADMAP_TASKS, taskId);
  },

  recordPracticeAnswer(questionId, isCorrect) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
      const stats = raw ? JSON.parse(raw) : {};
      stats[questionId] = {
        isCorrect: Boolean(isCorrect),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  },

  getPracticeStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  saveExamResult(examResult) {
    const history = this.getArray(STORAGE_KEYS.EXAM_HISTORY);
    history.unshift({
      ...examResult,
      submittedAt: new Date().toLocaleString('vi-VN')
    });
    this.saveArray(STORAGE_KEYS.EXAM_HISTORY, history.slice(0, 20));
  },

  getExamHistory() {
    return this.getArray(STORAGE_KEYS.EXAM_HISTORY);
  },

  getProgressSummary(data) {
    const completedLessons = this.getArray(STORAGE_KEYS.COMPLETED_LESSONS).length;
    const totalLessons = data.theory ? data.theory.length : 0;

    const practiceStats = this.getPracticeStats();
    const answeredCount = Object.keys(practiceStats).length;
    const correctCount = Object.values(practiceStats).filter(x => x.isCorrect).length;
    const totalQuestions = data.questions ? data.questions.length : 0;

    let totalRoadmapTasks = 0;
    if (data.roadmap) {
      data.roadmap.forEach(stage => {
        totalRoadmapTasks += stage.tasks.length;
      });
    }
    const doneRoadmapTasks = this.getArray(STORAGE_KEYS.ROADMAP_TASKS).length;
    const examHistory = this.getExamHistory();

    return {
      completedLessons,
      totalLessons,
      lessonPercent: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
      answeredCount,
      correctCount,
      totalQuestions,
      practicePercent: totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0,
      doneRoadmapTasks,
      totalRoadmapTasks,
      roadmapPercent: totalRoadmapTasks ? Math.round((doneRoadmapTasks / totalRoadmapTasks) * 100) : 0,
      examsTaken: examHistory.length
    };
  }
};

window.DataLoader = DataLoader;
window.STORAGE_KEYS = STORAGE_KEYS;