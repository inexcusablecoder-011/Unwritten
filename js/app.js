/**
 * UNWRITTEN — Interactive Web Application Engine
 * ------------------------------------------------------------------
 * Handles particle animations, scroll observers, dynamic data rendering,
 * interactive card reveals, audio player synthesis, and modal windows.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.UNWRITTEN_DATA;
  if (!data) {
    console.error('UNWRITTEN_DATA is missing! Make sure js/data.js is loaded first.');
    return;
  }

  /* ==========================================================================
     1. Background Particle & Starfield System (Canvas)
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const PARTICLE_COUNT = Math.min(Math.floor(width * 0.08), 90);

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.6 + 0.4;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.speed = Math.random() * 0.2 + 0.05;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) this.y = height;
        this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;
        if (this.alpha < 0.1) this.alpha = 0.1;
        if (this.alpha > 0.9) this.alpha = 0.9;
      }

      draw() {
        ctx.fillStyle = `rgba(226, 217, 243, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Star());
    }

    function animateStars() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ==========================================================================
     2. Section 1 — Cinematic Opening Controller
     ========================================================================== */
  const openingScreen = document.getElementById('opening-screen');
  const enterBtn = document.getElementById('enter-btn');
  const openingLines = document.querySelectorAll('.opening-line');

  if (openingScreen) {
    // Lock page scroll initially
    document.body.style.overflow = 'hidden';

    // Sequence timing for text reveal
    setTimeout(() => {
      if (openingLines[0]) openingLines[0].classList.add('active');
    }, 800);

    setTimeout(() => {
      if (openingLines[1]) openingLines[1].classList.add('active');
    }, 2800);

    setTimeout(() => {
      if (enterBtn) enterBtn.classList.add('visible');
    }, 4500);

    enterBtn.addEventListener('click', () => {
      openingScreen.classList.add('dismissed');
      document.body.style.overflow = '';
      
      // Start ambient audio on enter gesture if user desires
      initAudioEngine();

      // Scroll smoothly to intro section
      const introSec = document.getElementById('section-intro');
      if (introSec) {
        setTimeout(() => {
          introSec.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    });
  }

  /* ==========================================================================
     3. Scroll Observer for Animations & Progressive Reveals
     ========================================================================== */
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    threshold: 0.2
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Check if final message section is reached
        if (entry.target.id === 'section-final') {
          triggerFinalSequence();
        }
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  function triggerFinalSequence() {
    const lines = document.querySelectorAll('.final-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('is-inview');
      }, index * 1200);
    });
  }

  /* ==========================================================================
     4. Section 3 — Chapter One Binding
     ========================================================================== */
  const ch1 = data.chapterOne;
  if (ch1) {
    const chDate = document.getElementById('chapter-date');
    const chTitle = document.getElementById('chapter-title');
    const chQuote = document.getElementById('chapter-quote');
    const chDesc = document.getElementById('chapter-desc');
    const chImg = document.getElementById('chapter-img');

    if (chDate) chDate.textContent = ch1.date;
    if (chTitle) chTitle.textContent = `${ch1.chapterNumber} — ${ch1.subheading}`;
    if (chQuote) chQuote.textContent = `“${ch1.quote}”`;
    if (chDesc) chDesc.textContent = ch1.description;
    if (chImg) {
      chImg.src = ch1.image;
      chImg.alt = ch1.title;
    }
  }

  /* ==========================================================================
     5. Section 4 — Moments Renderer & Modal Lightbox
     ========================================================================== */
  const momentsContainer = document.getElementById('moments-grid');
  const modalOverlay = document.getElementById('moment-modal');
  const modalClose = document.getElementById('modal-close-btn');

  function renderMoments() {
    if (!momentsContainer || !data.moments) return;
    momentsContainer.innerHTML = '';

    data.moments.forEach((m) => {
      const card = document.createElement('article');
      card.className = 'moment-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View moment: ${m.title}`);

      card.innerHTML = `
        <div class="moment-img-wrapper">
          <img src="${m.image}" alt="${m.title}" loading="lazy" />
        </div>
        <div class="moment-content">
          <div class="moment-meta">
            <span class="moment-date">${m.date}</span>
            <span class="moment-location">✦ ${m.location}</span>
          </div>
          <h3 class="moment-title">${m.title}</h3>
          <p class="moment-desc">${m.description.substring(0, 95)}...</p>
        </div>
      `;

      card.addEventListener('click', () => openMomentModal(m));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMomentModal(m);
        }
      });

      momentsContainer.appendChild(card);
    });
  }

  function openMomentModal(moment) {
    if (!modalOverlay) return;

    document.getElementById('modal-img').src = moment.image;
    document.getElementById('modal-img').alt = moment.title;
    document.getElementById('modal-date').textContent = moment.date;
    document.getElementById('modal-location').textContent = `✦ ${moment.location}`;
    document.getElementById('modal-title').textContent = moment.title;
    document.getElementById('modal-desc').textContent = moment.description;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  renderMoments();

  /* ==========================================================================
     6. Section 5 — Things I Never Said Out Loud
     ========================================================================== */
  const thoughtsContainer = document.getElementById('thoughts-grid');

  function renderThoughts() {
    if (!thoughtsContainer || !data.unsaidThoughts) return;
    thoughtsContainer.innerHTML = '';

    data.unsaidThoughts.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'thought-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Reveal unsaid thought`);

      card.innerHTML = `
        <span class="thought-teaser">${item.teaser}</span>
        <p class="thought-text">${item.fullText}</p>
        <span class="thought-hint">Click to reveal ✦</span>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('revealed');
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('revealed');
        }
      });

      thoughtsContainer.appendChild(card);
    });
  }

  renderThoughts();

  /* ==========================================================================
     7. Section 6 — Web Audio API Synth & Music Player
     ========================================================================== */
  let audioCtx = null;
  let isPlaying = false;
  let currentTrackIdx = 0;
  let synthInterval = null;
  let noteIndex = 0;
  let progressTimer = null;
  let currentProgress = 0;

  const playPauseBtn = document.getElementById('play-pause-btn');
  const prevBtn = document.getElementById('prev-track-btn');
  const nextBtn = document.getElementById('next-track-btn');
  const trackTitle = document.getElementById('player-track-title');
  const trackArtist = document.getElementById('player-artist');
  const trackCover = document.getElementById('player-cover-img');
  const progressFill = document.getElementById('player-progress-fill');
  const progressBar = document.getElementById('player-progress-bar');
  const currentTimeEl = document.getElementById('player-current-time');
  const durationEl = document.getElementById('player-duration');
  const headerAudioBtn = document.getElementById('header-audio-btn');

  function initAudioEngine() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playSynthNote(freq) {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.3);
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  }

  function loadTrack(index) {
    const tracks = data.soundtrack;
    if (!tracks || !tracks[index]) return;
    currentTrackIdx = index;
    const track = tracks[currentTrackIdx];

    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackCover) {
      trackCover.src = track.cover;
      trackCover.alt = track.title;
    }
    if (durationEl) durationEl.textContent = track.duration;

    resetProgress();
  }

  function resetProgress() {
    currentProgress = 0;
    if (progressFill) progressFill.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
  }

  function startPlayback() {
    initAudioEngine();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    updateUIState();

    const track = data.soundtrack[currentTrackIdx];
    noteIndex = 0;

    // Play initial note immediately
    if (track && track.notes) {
      playSynthNote(track.notes[0]);
    }

    // Loop synth notes
    synthInterval = setInterval(() => {
      if (track && track.notes) {
        noteIndex = (noteIndex + 1) % track.notes.length;
        playSynthNote(track.notes[noteIndex]);
      }
    }, 1800);

    // Progress timer mock
    progressTimer = setInterval(() => {
      currentProgress += 0.5;
      if (currentProgress > 100) {
        currentProgress = 0;
        nextTrack();
        return;
      }
      if (progressFill) progressFill.style.width = `${currentProgress}%`;
      
      const seconds = Math.floor((currentProgress / 100) * 220);
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      if (currentTimeEl) currentTimeEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }, 1000);
  }

  function stopPlayback() {
    isPlaying = false;
    updateUIState();
    if (synthInterval) clearInterval(synthInterval);
    if (progressTimer) clearInterval(progressTimer);
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  function nextTrack() {
    const wasPlaying = isPlaying;
    stopPlayback();
    const nextIdx = (currentTrackIdx + 1) % data.soundtrack.length;
    loadTrack(nextIdx);
    if (wasPlaying) startPlayback();
  }

  function prevTrack() {
    const wasPlaying = isPlaying;
    stopPlayback();
    const prevIdx = (currentTrackIdx - 1 + data.soundtrack.length) % data.soundtrack.length;
    loadTrack(prevIdx);
    if (wasPlaying) startPlayback();
  }

  function updateUIState() {
    if (playPauseBtn) {
      playPauseBtn.innerHTML = isPlaying ? '❚❚' : '▶';
      playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause soundtrack' : 'Play soundtrack');
    }
    if (headerAudioBtn) {
      if (isPlaying) {
        headerAudioBtn.classList.add('playing');
        headerAudioBtn.querySelector('.audio-text').textContent = 'Sound On';
      } else {
        headerAudioBtn.classList.remove('playing');
        headerAudioBtn.querySelector('.audio-text').textContent = 'Sound Off';
      }
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  if (headerAudioBtn) headerAudioBtn.addEventListener('click', togglePlay);
  if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  if (prevBtn) prevBtn.addEventListener('click', prevTrack);

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      currentProgress = (clickX / rect.width) * 100;
      if (progressFill) progressFill.style.width = `${currentProgress}%`;
    });
  }

  // Load initial track
  if (data.soundtrack && data.soundtrack.length > 0) {
    loadTrack(0);
  }
});
