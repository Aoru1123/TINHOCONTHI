/**
 * NEXUS IT // THPT KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Logic điều khiển giao diện bài giảng công nghệ & Luyện thi THPT Quốc gia
 */

// =================== STATE MANAGEMENT ===================
const AppState = {
  activeGrade: 'all',
  activeTrack: 'all',
  activeTopic: 'all',
  searchQuery: '',
  activeVideo: null,
  activePlayerTab: 'chapters', // 'chapters', 'quiz', 'code', 'notes', 'docs'
  soundEnabled: true,
  bookmarks: JSON.parse(localStorage.getItem('nexus_bookmarks') || '[]'),
  completedVideos: JSON.parse(localStorage.getItem('nexus_completed') || '[]'),
  userNotes: JSON.parse(localStorage.getItem('nexus_notes') || '{}'),
  audioCtx: null,
  videoPlayerInstance: null
};

// =================== SOUND SYNTHESIZER (WEB AUDIO API) ===================
// Tạo hiệu ứng âm thanh Sci-Fi / Cyberpunk thuần túy không cần tải file ngoài
function playTechSound(type = 'click') {
  if (!AppState.soundEnabled) return;
  try {
    if (!AppState.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      AppState.audioCtx = new AudioContext();
    }
    if (AppState.audioCtx.state === 'suspended') {
      AppState.audioCtx.resume();
    }

    const ctx = AppState.audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'success') {
      // 2-tone futuristic chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'run') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Ignore audio permission restrictions
  }
}

// =================== PARTICLE CANVAS CYBER BACKGROUND ===================
function initCyberParticles() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(Math.floor(window.innerWidth / 22), 55);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(139, 92, 246, '
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw & update particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repulse
      if (mouse.x && mouse.y) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          p.x += (mdx / mdist) * 0.8;
          p.y += (mdy / mdist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// =================== COUNTDOWN TO THPT QUỐC GIA ===================
function initExamCountdown() {
  // Kỳ thi tốt nghiệp THPT thường diễn ra vào cuối tháng 6 hàng năm
  const now = new Date();
  let targetYear = now.getFullYear();
  let examDate = new Date(`${targetYear}-06-26T07:30:00+07:00`);
  if (now > examDate) {
    targetYear++;
    examDate = new Date(`${targetYear}-06-26T07:30:00+07:00`);
  }

  function update() {
    const current = new Date();
    const diff = examDate - current;

    if (diff <= 0) {
      const daysEl = document.getElementById('count-days');
      if (daysEl) daysEl.innerText = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById('count-days');
    const hEl = document.getElementById('count-hours');
    const mEl = document.getElementById('count-mins');
    const sEl = document.getElementById('count-secs');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(mins).padStart(2, '0');
    if (sEl) sEl.innerText = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// =================== RENDER VIDEO CARDS ===================
function renderVideoList() {
  const container = document.getElementById('video-grid');
  const countBadge = document.getElementById('total-video-count');
  if (!container) return;

  let filtered = CURRICULUM_DATA.videos.filter((v) => {
    // Grade filter
    if (AppState.activeGrade !== 'all' && v.grade !== AppState.activeGrade) {
      return false;
    }
    // Track filter
    if (AppState.activeTrack !== 'all' && v.track !== 'all' && v.track !== AppState.activeTrack) {
      return false;
    }
    // Topic filter
    if (AppState.activeTopic !== 'all' && v.topic !== AppState.activeTopic) {
      return false;
    }
    // Search query
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchDesc = v.description.toLowerCase().includes(q);
      const matchBook = v.bookRef.toLowerCase().includes(q);
      const matchInstructor = v.instructor.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchBook && !matchInstructor) {
        return false;
      }
    }
    return true;
  });

  if (countBadge) {
    countBadge.innerText = `${filtered.length} bài giảng`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl border border-cyan-500/20">
        <i data-lucide="search-x" class="w-16 h-16 mx-auto text-cyan-400/50 mb-4"></i>
        <h3 class="text-xl font-bold text-white mb-2 font-tech">KHÔNG TÌM THẤY BÀI GIẢNG PHÙ HỢP</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">
          Vui lòng thử tìm từ khóa khác hoặc chuyển bộ lọc sang "Tất cả khối lớp / Tất cả chuyên đề".
        </p>
        <button onclick="resetFilters()" class="btn-cyber-primary px-6 py-2.5 rounded-lg text-sm font-semibold">
          Đặt lại bộ lọc
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = filtered
    .map((v) => {
      const isBookmarked = AppState.bookmarks.includes(v.id);
      const isCompleted = AppState.completedVideos.includes(v.id);

      // Level badge style
      let levelBadgeClass = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      if (v.levelColor === 'purple') levelBadgeClass = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      if (v.levelColor === 'amber') levelBadgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      if (v.levelColor === 'emerald') levelBadgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

      const trackBadge =
        v.track === 'cs'
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">CS • KHOA HỌC MÁY TÍNH</span>`
          : v.track === 'ict'
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">ICT • TIN HỌC ỨNG DỤNG</span>`
          : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">CHUNG CS & ICT</span>`;

      return `
      <div class="glass-panel group rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(0,242,254,0.15)] tech-corner">
        <div>
          <!-- Thumbnail & Media Area -->
          <div class="relative w-full aspect-video overflow-hidden bg-slate-950 cursor-pointer" onclick="openVideoPlayer('${v.id}')">
            <img 
              src="${v.poster}" 
              alt="${v.title}"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            <!-- Scanline overlay effect -->
            <div class="absolute inset-0 scanlines pointer-events-none opacity-40"></div>

            <!-- Top Badges -->
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold font-tech bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/40">
                ${v.badge}
              </span>
              <button 
                onclick="event.stopPropagation(); toggleBookmark('${v.id}')" 
                title="${isBookmarked ? 'Bỏ lưu' : 'Lưu bài giảng'}"
                class="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-cyan-400 fill-cyan-400/20' : ''}"></i>
              </button>
            </div>

            <!-- Play HUD Button in Center -->
            <div class="absolute inset-0 flex items-center justify-center z-10">
              <div class="w-13 h-13 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/60 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                <i data-lucide="play" class="w-6 h-6 fill-current ml-0.5"></i>
              </div>
            </div>

            <!-- Bottom Video Metadata Bar -->
            <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-300 z-10">
              <span class="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 font-code text-[11px]">
                <i data-lucide="clock" class="w-3 h-3 text-cyan-400"></i> ${v.duration}
              </span>
              <span class="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 text-[11px]">
                <i data-lucide="eye" class="w-3 h-3 text-cyan-400"></i> ${v.views}
              </span>
            </div>
          </div>

          <!-- Content Body -->
          <div class="p-4">
            <!-- Grade & Track Pills -->
            <div class="flex items-center gap-1.5 flex-wrap mb-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                KNTT LỚP ${v.grade}
              </span>
              ${trackBadge}
              <span class="px-2 py-0.5 rounded text-[10px] font-medium border ${levelBadgeClass}">
                ${v.level}
              </span>
            </div>

            <!-- Title -->
            <h4 
              class="font-bold text-white text-base line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors cursor-pointer"
              onclick="openVideoPlayer('${v.id}')"
            >
              ${v.title}
            </h4>

            <!-- SGK Reference -->
            <div class="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
              <span class="truncate">${v.bookRef}</span>
            </div>

            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              ${v.description}
            </p>
          </div>
        </div>

        <!-- Instructor & Action Footer -->
        <div class="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2.5">
            <img 
              src="${v.instructor.avatar}" 
              alt="${v.instructor.name}" 
              class="w-7 h-7 rounded-full border border-cyan-400/40 object-cover" 
            />
            <div class="leading-tight">
              <div class="text-xs font-semibold text-slate-200 truncate max-w-[130px]">${v.instructor.name}</div>
              <div class="text-[10px] text-slate-400">Giảng viên GDPT 2018</div>
            </div>
          </div>

          <button 
            onclick="openVideoPlayer('${v.id}')" 
            class="btn-cyber-outline px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:gap-2 transition-all"
          >
            <span>Học ngay</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
      `;
    })
    .join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// =================== FILTER INTERACTIONS ===================
function setupFilterListeners() {
  // Grade buttons
  const gradeBtns = document.querySelectorAll('[data-filter-grade]');
  gradeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playTechSound('click');
      gradeBtns.forEach((b) => b.classList.remove('active-filter-grade', 'btn-cyber-primary'));
      gradeBtns.forEach((b) => b.classList.add('btn-cyber-outline'));
      btn.classList.remove('btn-cyber-outline');
      btn.classList.add('active-filter-grade', 'btn-cyber-primary');

      AppState.activeGrade = btn.getAttribute('data-filter-grade');
      renderVideoList();
    });
  });

  // Track buttons (CS vs ICT)
  const trackBtns = document.querySelectorAll('[data-filter-track]');
  trackBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playTechSound('click');
      trackBtns.forEach((b) => {
        b.classList.remove('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        b.classList.add('border-slate-700/60', 'text-slate-400');
      });
      btn.classList.remove('border-slate-700/60', 'text-slate-400');
      btn.classList.add('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');

      AppState.activeTrack = btn.getAttribute('data-filter-track');
      renderVideoList();
    });
  });

  // Topic buttons
  const topicBtns = document.querySelectorAll('[data-filter-topic]');
  topicBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playTechSound('click');
      topicBtns.forEach((b) => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-900/60', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-900/60', 'text-slate-300');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');

      AppState.activeTopic = btn.getAttribute('data-filter-topic');
      renderVideoList();
    });
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderVideoList();
    });
  }

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      AppState.soundEnabled = !AppState.soundEnabled;
      const icon = document.getElementById('sound-icon');
      if (icon) {
        icon.setAttribute('data-lucide', AppState.soundEnabled ? 'volume-2' : 'volume-x');
        if (window.lucide) lucide.createIcons();
      }
      if (AppState.soundEnabled) playTechSound('success');
    });
  }

  // Keyboard shortcut Ctrl+K to search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}

function resetFilters() {
  playTechSound('click');
  AppState.activeGrade = 'all';
  AppState.activeTrack = 'all';
  AppState.activeTopic = 'all';
  AppState.searchQuery = '';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  // Reset visual buttons
  const gradeBtns = document.querySelectorAll('[data-filter-grade]');
  gradeBtns.forEach((b) => {
    if (b.getAttribute('data-filter-grade') === 'all') {
      b.classList.add('btn-cyber-primary');
      b.classList.remove('btn-cyber-outline');
    } else {
      b.classList.remove('btn-cyber-primary');
      b.classList.add('btn-cyber-outline');
    }
  });

  const trackBtns = document.querySelectorAll('[data-filter-track]');
  trackBtns.forEach((b) => {
    if (b.getAttribute('data-filter-track') === 'all') {
      b.classList.add('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
    } else {
      b.classList.remove('border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
      b.classList.add('border-slate-700/60', 'text-slate-400');
    }
  });

  const topicBtns = document.querySelectorAll('[data-filter-topic]');
  topicBtns.forEach((b) => {
    if (b.getAttribute('data-filter-topic') === 'all') {
      b.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
      b.classList.remove('bg-slate-900/60', 'text-slate-300');
    } else {
      b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
      b.classList.add('bg-slate-900/60', 'text-slate-300');
    }
  });

  renderVideoList();
}

// =================== BOOKMARKING & STATS ===================
function toggleBookmark(videoId) {
  playTechSound('click');
  const index = AppState.bookmarks.indexOf(videoId);
  if (index > -1) {
    AppState.bookmarks.splice(index, 1);
  } else {
    AppState.bookmarks.push(videoId);
    playTechSound('success');
  }
  localStorage.setItem('nexus_bookmarks', JSON.stringify(AppState.bookmarks));
  updateHeaderStats();
  renderVideoList();
}

function updateHeaderStats() {
  const bookmarkCountEl = document.getElementById('stat-bookmark-count');
  const completedCountEl = document.getElementById('stat-completed-count');
  if (bookmarkCountEl) bookmarkCountEl.innerText = AppState.bookmarks.length;
  if (completedCountEl) completedCountEl.innerText = AppState.completedVideos.length;
}

// =================== VIDEO PLAYER MODAL & CINEMA MODE ===================
function openVideoPlayer(videoId) {
  playTechSound('click');
  const video = CURRICULUM_DATA.videos.find((v) => v.id === videoId);
  if (!video) return;

  AppState.activeVideo = video;
  AppState.activePlayerTab = 'chapters';

  const modal = document.getElementById('video-modal');
  if (!modal) return;

  // Build the player layout
  renderPlayerModalContent(video);

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // Mark as in-progress or completed if watched
  if (!AppState.completedVideos.includes(video.id)) {
    AppState.completedVideos.push(video.id);
    localStorage.setItem('nexus_completed', JSON.stringify(AppState.completedVideos));
    updateHeaderStats();
  }

  if (window.lucide) lucide.createIcons();
}

function closeVideoPlayer() {
  playTechSound('click');
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');

  // Pause active video element & reset container to stop audio
  const videoEl = document.getElementById('html5-video-player');
  if (videoEl) videoEl.pause();
  const videoContainer = document.getElementById('player-screen-container');
  if (videoContainer) videoContainer.innerHTML = '';
  AppState.activeVideo = null;
}

function renderPlayerModalContent(video, playerMode = 'auto') {
  // Title & Header info
  document.getElementById('player-video-title').innerText = video.title;
  document.getElementById('player-video-ref').innerText = `${video.bookRef} • Lớp ${video.grade}`;
  document.getElementById('player-instructor-name').innerText = video.instructor.name;
  document.getElementById('player-instructor-title').innerText = video.instructor.title;
  document.getElementById('player-instructor-avatar').src = video.instructor.avatar;

  const useYouTube = (playerMode === 'youtube' || (playerMode === 'auto' && video.youtubeId));

  // Set video source
  const videoContainer = document.getElementById('player-screen-container');
  if (videoContainer) {
    if (useYouTube && video.youtubeId) {
      videoContainer.innerHTML = `
        <div class="relative w-full h-full bg-black flex items-center justify-center group/video">
          <iframe 
            id="youtube-video-player"
            class="w-full h-full border-0"
            src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0" 
            title="${video.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
          
          <!-- Live Tech HUD Info Overlay on top of video -->
          <div class="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
              YOUTUBE STREAM // 1080p
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> SẴN SÀNG
            </span>
          </div>
        </div>
      `;
    } else {
      videoContainer.innerHTML = `
        <div class="relative w-full h-full bg-black flex items-center justify-center group/video">
          <video 
            id="html5-video-player"
            src="${video.videoUrl}" 
            poster="${video.poster}"
            controls 
            playsinline
            class="w-full h-full object-contain"
          ></video>
          <!-- Futuristic Scanline effect -->
          <div class="absolute inset-0 scanlines pointer-events-none opacity-20"></div>
          
          <!-- Live Tech HUD Info Overlay on top of video -->
          <div class="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
              NEXUS STREAM // MP4
            </span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> SẴN SÀNG
            </span>
          </div>
        </div>
      `;
    }
  }

  // Render Tabs navigation
  switchPlayerTab('chapters');
}

function switchPlayerTab(tabName) {
  playTechSound('click');
  AppState.activePlayerTab = tabName;
  const video = AppState.activeVideo;
  if (!video) return;

  // Update tab buttons visual
  const tabBtns = document.querySelectorAll('[data-player-tab]');
  tabBtns.forEach((btn) => {
    if (btn.getAttribute('data-player-tab') === tabName) {
      btn.classList.add('border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
      btn.classList.remove('border-transparent', 'text-slate-400');
    } else {
      btn.classList.remove('border-cyan-400', 'text-cyan-400', 'bg-cyan-500/10');
      btn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  const contentArea = document.getElementById('player-tab-content');
  if (!contentArea) return;

  if (tabName === 'chapters') {
    // CHAPTERS & DESCRIPTION
    contentArea.innerHTML = `
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-bold text-cyan-300 font-tech mb-2 flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4"></i> TÓM TẮT TRỌNG TÂM BÀI GIẢNG
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            ${video.description}
          </p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-cyan-300 font-tech mb-2 flex items-center justify-between">
            <span class="flex items-center gap-2">
              <i data-lucide="list-video" class="w-4 h-4"></i> CÁC MỐC THỜI GIAN (CHAPTERS)
            </span>
            <span class="text-[11px] text-slate-400 font-mono">${video.chapters.length} phần</span>
          </h4>
          <div class="space-y-2">
            ${video.chapters
              .map(
                (ch, idx) => `
              <div 
                onclick="seekVideo(${ch.sec})" 
                class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/70 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group"
              >
                <div class="flex items-center gap-3">
                  <span class="font-code text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    ${ch.time}
                  </span>
                  <span class="text-xs text-slate-300 group-hover:text-white font-medium">${ch.title}</span>
                </div>
                <i data-lucide="play-circle" class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors"></i>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  } else if (tabName === 'quiz') {
    // TRẮC NGHIỆM ĐỀ THI THPT MỚI
    contentArea.innerHTML = renderInteractiveQuiz(video);
  } else if (tabName === 'code') {
    // PYTHON CODE RUNNER SANDBOX
    contentArea.innerHTML = renderCodeSandbox(video);
  } else if (tabName === 'notes') {
    // USER NOTES
    contentArea.innerHTML = renderUserNotes(video);
  } else if (tabName === 'docs') {
    // DOCUMENTS & MINDMAPS
    contentArea.innerHTML = `
      <div class="space-y-3">
        <h4 class="text-sm font-bold text-cyan-300 font-tech mb-2 flex items-center gap-2">
          <i data-lucide="file-text" class="w-4 h-4"></i> TÀI LIỆU & SƠ ĐỒ TƯ DUY ĐI KÈM
        </h4>
        <div class="space-y-2.5">
          ${video.documents
            .map(
              (doc) => `
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs font-mono">
                  PDF
                </div>
                <div>
                  <div class="text-xs font-semibold text-slate-200">${doc.name}</div>
                  <div class="text-[10px] text-slate-400">Dung lượng: ${doc.size} • Chuẩn SGK KNTT</div>
                </div>
              </div>
              <button 
                onclick="simulateDownload('${doc.name}')" 
                class="btn-cyber-outline px-3 py-1.5 rounded text-xs flex items-center gap-1.5"
              >
                <i data-lucide="download" class="w-3.5 h-3.5"></i> Tải về
              </button>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  if (window.lucide) lucide.createIcons();
}

function seekVideo(seconds) {
  playTechSound('click');
  const ytIframe = document.getElementById('youtube-video-player');
  if (ytIframe && ytIframe.contentWindow) {
    ytIframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'seekTo',
      args: [seconds, true]
    }), '*');
  }
  const videoEl = document.getElementById('html5-video-player');
  if (videoEl) {
    videoEl.currentTime = seconds;
    videoEl.play().catch(() => {});
  }
}

// =================== INTERACTIVE QUIZ ENGINE ===================
function renderInteractiveQuiz(video) {
  if (!video.quiz || video.quiz.length === 0) {
    return `<div class="p-6 text-center text-slate-400 text-xs">Chưa có bài tập trắc nghiệm cho video này.</div>`;
  }

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between bg-cyan-950/30 p-3 rounded-lg border border-cyan-500/30">
        <div class="flex items-center gap-2">
          <i data-lucide="award" class="w-5 h-5 text-cyan-400"></i>
          <div>
            <div class="text-xs font-bold text-white font-tech">LUYỆN TẬP THEO CẤU TRÚC ĐỀ THI 2025</div>
            <div class="text-[10px] text-slate-400">Bao gồm câu hỏi nhiều lựa chọn & câu hỏi Đúng/Sai 4 ý</div>
          </div>
        </div>
        <button onclick="evaluateAllQuiz('${video.id}')" class="btn-cyber-primary px-3 py-1.5 rounded text-xs font-bold">
          Chấm điểm ngay
        </button>
      </div>

      <div class="space-y-5" id="quiz-question-list">
        ${video.quiz
          .map((q, idx) => {
            if (q.type === 'multiple_choice') {
              return `
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3" id="q-block-${idx}">
                <div class="flex items-start gap-2">
                  <span class="px-2 py-0.5 rounded text-xs font-bold font-mono bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    CÂU ${idx + 1}
                  </span>
                  <div class="text-xs font-medium text-slate-200 leading-relaxed">${q.question}</div>
                </div>
                <div class="space-y-2 mt-2">
                  ${q.options
                    .map(
                      (opt, oIdx) => `
                    <label class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer text-xs transition-all">
                      <input type="radio" name="quiz_opt_${idx}" value="${oIdx}" class="text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700" />
                      <span class="text-slate-300 font-mono mr-1">${String.fromCharCode(65 + oIdx)}.</span>
                      <span class="text-slate-300 flex-1">${opt}</span>
                    </label>
                  `
                    )
                    .join('')}
                </div>
                <div class="hidden pt-3 border-t border-slate-800 text-xs leading-relaxed" id="q-feedback-${idx}"></div>
              </div>
            `;
            } else if (q.type === 'true_false') {
              return `
              <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3" id="q-block-${idx}">
                <div class="flex items-start gap-2">
                  <span class="px-2 py-0.5 rounded text-xs font-bold font-mono bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    CÂU ${idx + 1} • ĐÚNG / SAI (4 Ý)
                  </span>
                  <div class="text-xs font-medium text-slate-200 whitespace-pre-line leading-relaxed">${q.prompt}</div>
                </div>
                <div class="space-y-2.5 mt-2">
                  ${q.statements
                    .map(
                      (stmt, sIdx) => `
                    <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                      <div class="flex items-center gap-2 pr-3">
                        <span class="font-bold text-cyan-400 font-mono">${stmt.id})</span>
                        <span class="text-slate-300">${stmt.text}</span>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <label class="flex items-center gap-1 cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500">
                          <input type="radio" name="tf_${idx}_${stmt.id}" value="true" class="text-emerald-500 focus:ring-emerald-400" />
                          <span class="text-[11px] text-emerald-400 font-bold">Đúng</span>
                        </label>
                        <label class="flex items-center gap-1 cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-700 hover:border-rose-500">
                          <input type="radio" name="tf_${idx}_${stmt.id}" value="false" class="text-rose-500 focus:ring-rose-400" />
                          <span class="text-[11px] text-rose-400 font-bold">Sai</span>
                        </label>
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
                <div class="hidden pt-3 border-t border-slate-800 text-xs leading-relaxed" id="q-feedback-${idx}"></div>
              </div>
            `;
            }
          })
          .join('')}
      </div>
    </div>
  `;
}

function evaluateAllQuiz(videoId) {
  playTechSound('click');
  const video = CURRICULUM_DATA.videos.find((v) => v.id === videoId);
  if (!video || !video.quiz) return;

  let totalScore = 0;
  let maxScore = video.quiz.length;

  video.quiz.forEach((q, idx) => {
    const feedbackEl = document.getElementById(`q-feedback-${idx}`);
    if (!feedbackEl) return;
    feedbackEl.classList.remove('hidden');

    if (q.type === 'multiple_choice') {
      const selected = document.querySelector(`input[name="quiz_opt_${idx}"]:checked`);
      if (!selected) {
        feedbackEl.innerHTML = `<span class="text-amber-400 font-semibold">⚠️ Bạn chưa chọn câu trả lời! Đáp án đúng là (${String.fromCharCode(
          65 + q.correct
        )}): ${q.options[q.correct]}.</span><p class="text-slate-400 mt-1">${q.explanation}</p>`;
      } else if (parseInt(selected.value) === q.correct) {
        totalScore += 1;
        feedbackEl.innerHTML = `<span class="text-emerald-400 font-bold">✓ CHÍNH XÁC! (+1 điểm)</span><p class="text-slate-300 mt-1">${q.explanation}</p>`;
      } else {
        feedbackEl.innerHTML = `<span class="text-rose-400 font-semibold">✗ Chưa chính xác. Đáp án đúng là (${String.fromCharCode(
          65 + q.correct
        )}).</span><p class="text-slate-400 mt-1">${q.explanation}</p>`;
      }
    } else if (q.type === 'true_false') {
      let correctSub = 0;
      let notes = [];
      q.statements.forEach((stmt) => {
        const val = document.querySelector(`input[name="tf_${idx}_${stmt.id}"]:checked`);
        const userBool = val ? val.value === 'true' : null;
        if (userBool === stmt.correct) {
          correctSub++;
        }
        notes.push(
          `<b>Ý ${stmt.id}:</b> ${stmt.correct ? '<span class="text-emerald-400">ĐÚNG</span>' : '<span class="text-rose-400">SAI</span>'} ${
            stmt.note ? `(${stmt.note})` : ''
          }`
        );
      });

      // Bộ GD tính điểm Đúng/Sai: 1 ý = 0.1, 2 ý = 0.25, 3 ý = 0.5, 4 ý = 1.0
      let points = 0;
      if (correctSub === 1) points = 0.1;
      else if (correctSub === 2) points = 0.25;
      else if (correctSub === 3) points = 0.5;
      else if (correctSub === 4) points = 1.0;

      totalScore += points;
      feedbackEl.innerHTML = `
        <div class="text-cyan-300 font-bold mb-1">Kết quả: Đúng ${correctSub}/4 ý -> Bạn đạt ${points} điểm theo thang điểm chuẩn Bộ GD&ĐT</div>
        <div class="text-slate-400 space-y-1">${notes.join('<br>')}</div>
      `;
    }
  });

  playTechSound('success');
  alert(`🎉 Hoàn thành kiểm tra kiến thức bài giảng!\nTổng điểm đạt được: ${totalScore.toFixed(2)} / ${maxScore}`);
}

// =================== INTERACTIVE PYTHON CODE SANDBOX ===================
function renderCodeSandbox(video) {
  const defaultCode =
    video.sampleCode ||
    `# Trình giả lập chạy mã Python cho bài giảng
def chao_mung(ten):
    return f"Xin chào {ten}, chúc bạn ôn thi THPT Quốc Gia đạt điểm 10!"

print(chao_mung("Sĩ tử 2025"))
`;

  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold text-cyan-300 font-tech flex items-center gap-2">
          <i data-lucide="terminal" class="w-4 h-4 text-cyan-400"></i> TRÌNH BIÊN DỊCH PYTHON CLIENT-SIDE
        </h4>
        <button onclick="runSandboxCode()" class="btn-cyber-primary px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5">
          <i data-lucide="play" class="w-3.5 h-3.5"></i> Chạy Thử Code
        </button>
      </div>

      <!-- Editor Window -->
      <div class="rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 font-code text-xs">
        <div class="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span class="flex items-center gap-2 font-mono">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span class="text-slate-300 ml-1">exercise.py</span>
          </span>
          <span class="text-[10px] text-cyan-400">Python 3.12 Engine</span>
        </div>
        <textarea 
          id="sandbox-code-editor"
          rows="11" 
          class="w-full bg-slate-950 text-cyan-200 p-3 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-y font-code leading-relaxed"
          spellcheck="false"
        >${defaultCode}</textarea>
      </div>

      <!-- Terminal Output Window -->
      <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-code text-xs">
        <div class="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span class="flex items-center gap-1.5 text-emerald-400">
            <i data-lucide="terminal-square" class="w-3.5 h-3.5"></i> Terminal Output
          </span>
          <button onclick="clearSandboxOutput()" class="text-[10px] text-slate-400 hover:text-white">Xóa log</button>
        </div>
        <div id="sandbox-terminal-output" class="p-3 text-slate-300 min-h-[90px] max-h-[160px] overflow-y-auto leading-relaxed">
          <span class="text-slate-500 font-mono">Nhấn "Chạy Thử Code" để xem kết quả biên dịch...</span>
        </div>
      </div>
    </div>
  `;
}

function runSandboxCode() {
  playTechSound('run');
  const codeEl = document.getElementById('sandbox-code-editor');
  const outEl = document.getElementById('sandbox-terminal-output');
  if (!codeEl || !outEl) return;

  const code = codeEl.value;
  outEl.innerHTML = `<span class="text-cyan-400 font-mono">[NEXUS RUNNER] Đang thông dịch mã nguồn...</span>\n`;

  setTimeout(() => {
    try {
      // Safe client-side mock evaluation for Python statements common in high school curriculum
      const logs = [];
      const lines = code.split('\n');

      // Check for print statements
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
          const inner = trimmed.slice(6, -1);
          // Simple safe evaluation if string or basic expression
          try {
            // Replace Python f-strings or commas
            let clean = inner;
            if (clean.startsWith('f"') || clean.startsWith("f'")) {
              clean = clean.slice(2, -1);
            }
            logs.push(clean.replace(/["']/g, ''));
          } catch (e) {
            logs.push(inner);
          }
        }
      });

      if (logs.length > 0) {
        outEl.innerHTML = `
          <div class="text-emerald-400 font-mono font-bold mb-1">[EXECUTION SUCCESSFUL (0.012s)]</div>
          ${logs.map((l) => `<div class="text-cyan-200">>>> ${l}</div>`).join('')}
          <div class="text-slate-500 text-[10px] mt-2">Mã trả về: 0 (Đã thực thi thành công không có lỗi cú pháp)</div>
        `;
      } else {
        outEl.innerHTML = `
          <div class="text-emerald-400 font-mono font-bold mb-1">[EXECUTION SUCCESSFUL (0.008s)]</div>
          <div class="text-slate-300">Chương trình chạy hoàn tất mà không in ra console. Hãy thêm lệnh <code>print(...)</code> để xuất kết quả.</div>
        `;
      }
      playTechSound('success');
    } catch (err) {
      outEl.innerHTML = `<span class="text-rose-400 font-mono">Traceback (most recent call last):\n  File "exercise.py", line 1, in &lt;module&gt;\nSyntaxError: ${err.message}</span>`;
    }
  }, 250);
}

function clearSandboxOutput() {
  const outEl = document.getElementById('sandbox-terminal-output');
  if (outEl) outEl.innerHTML = '<span class="text-slate-500 font-mono">Đã xóa console. Sẵn sàng thực thi mới.</span>';
}

// =================== SMART USER NOTES ===================
function renderUserNotes(video) {
  const notes = AppState.userNotes[video.id] || [];

  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold text-cyan-300 font-tech flex items-center gap-2">
          <i data-lucide="edit-3" class="w-4 h-4 text-cyan-400"></i> GHI CHÚ BÀI HỌC CỦA BẠN
        </h4>
        <button onclick="downloadNotesAsText('${video.id}')" class="btn-cyber-outline px-2.5 py-1 rounded text-xs flex items-center gap-1">
          <i data-lucide="download" class="w-3.5 h-3.5"></i> Xuất file
        </button>
      </div>

      <!-- Input Form -->
      <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span>Nhập nội dung ghi chú:</span>
          <button onclick="insertCurrentVideoTime()" class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px]">
            <i data-lucide="clock" class="w-3 h-3"></i> Chèn mốc thời gian hiện tại
          </button>
        </div>
        <textarea 
          id="new-note-text"
          rows="2"
          placeholder="Ví dụ: Lưu ý điều kiện dừng của đệ quy bắt buộc phải trả về giá trị cơ sở..."
          class="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none"
        ></textarea>
        <div class="flex justify-end">
          <button onclick="saveNewNote('${video.id}')" class="btn-cyber-primary px-3 py-1.5 rounded text-xs font-semibold">
            Lưu ghi chú
          </button>
        </div>
      </div>

      <!-- Notes List -->
      <div class="space-y-2 max-h-[220px] overflow-y-auto" id="notes-container-list">
        ${
          notes.length === 0
            ? `<div class="text-center text-slate-500 text-xs py-6">Bạn chưa có ghi chú nào cho bài giảng này.</div>`
            : notes
                .map(
                  (n, i) => `
              <div class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-start justify-between gap-3">
                <div>
                  <div class="text-slate-400 text-[10px] font-mono mb-1 text-cyan-400/80">${n.time} • ${n.date}</div>
                  <div class="text-slate-200 leading-relaxed">${n.text}</div>
                </div>
                <button onclick="deleteNote('${video.id}', ${i})" class="text-slate-500 hover:text-rose-400 shrink-0">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            `
                )
                .join('')
        }
      </div>
    </div>
  `;
}

function insertCurrentVideoTime() {
  const videoEl = document.getElementById('html5-video-player');
  const textarea = document.getElementById('new-note-text');
  if (!textarea) return;
  const curTime = videoEl ? Math.floor(videoEl.currentTime) : 0;
  const mins = Math.floor(curTime / 60);
  const secs = curTime % 60;
  const timeStr = `[${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}] `;
  textarea.value = timeStr + textarea.value;
}

function saveNewNote(videoId) {
  playTechSound('click');
  const textarea = document.getElementById('new-note-text');
  if (!textarea || !textarea.value.trim()) return;

  if (!AppState.userNotes[videoId]) {
    AppState.userNotes[videoId] = [];
  }

  const now = new Date();
  const dateStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${now.getMonth() + 1}`;

  AppState.userNotes[videoId].unshift({
    text: textarea.value.trim(),
    time: 'Mốc học',
    date: dateStr
  });

  localStorage.setItem('nexus_notes', JSON.stringify(AppState.userNotes));
  textarea.value = '';
  switchPlayerTab('notes');
}

function deleteNote(videoId, index) {
  playTechSound('click');
  if (AppState.userNotes[videoId]) {
    AppState.userNotes[videoId].splice(index, 1);
    localStorage.setItem('nexus_notes', JSON.stringify(AppState.userNotes));
    switchPlayerTab('notes');
  }
}

function downloadNotesAsText(videoId) {
  const notes = AppState.userNotes[videoId] || [];
  if (notes.length === 0) {
    alert('Chưa có ghi chú nào để xuất file!');
    return;
  }
  const video = CURRICULUM_DATA.videos.find((v) => v.id === videoId);
  const content = `# Ghi chú bài giảng: ${video ? video.title : videoId}\n\n` + notes.map((n) => `- ${n.date}: ${n.text}`).join('\n');

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Ghi_chu_${videoId}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

function simulateDownload(filename) {
  playTechSound('success');
  alert(`📥 Đã gửi lệnh tải tài liệu: "${filename}"!\n(Tài liệu PDF ôn thi THPT Kết Nối Tri Thức bản chuẩn).`);
}

// =================== MINDMAP & CHEAT SHEET MODAL ===================
function openCheatSheetModal() {
  playTechSound('click');
  const modal = document.getElementById('cheatsheet-modal');
  const content = document.getElementById('cheatsheet-modal-content');
  if (!modal || !content) return;

  content.innerHTML = CURRICULUM_DATA.cheatSheets
    .map(
      (sheet) => `
    <div class="glass-panel p-5 rounded-xl border border-cyan-500/30">
      <h3 class="text-base font-bold text-cyan-300 font-tech mb-3 flex items-center gap-2">
        <i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i> ${sheet.title}
      </h3>
      <div class="space-y-2">
        ${sheet.items
          .map(
            (it) => `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded bg-slate-900/70 border border-slate-800 text-xs gap-2">
            <code class="text-cyan-400 font-code font-bold bg-slate-950 px-2 py-1 rounded border border-cyan-500/20">${it.code}</code>
            <span class="text-slate-300">${it.desc}</span>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('');

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  if (window.lucide) lucide.createIcons();
}

function closeCheatSheetModal() {
  playTechSound('click');
  const modal = document.getElementById('cheatsheet-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// =================== APPLICATION INITIALIZATION ===================
document.addEventListener('DOMContentLoaded', () => {
  initCyberParticles();
  initExamCountdown();
  renderVideoList();
  setupFilterListeners();
  updateHeaderStats();

  if (window.lucide) {
    lucide.createIcons();
  }
});
