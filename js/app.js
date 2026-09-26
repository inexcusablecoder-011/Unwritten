/**
 * UNWRITTEN — Interactive Web Application Engine
 * ------------------------------------------------------------------
 * Handles particle & tulip petal animations, scroll observers, dynamic data,
 * interactive cards, HTML5 audio playback with synth fallback, and lightbox modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.UNWRITTEN_DATA;
  if (!data) {
    console.error('UNWRITTEN_DATA is missing! Make sure js/data.js is loaded first.');
    return;
  }

  /* ==========================================================================
     1. Background Particle & Floating Tulip Petal Canvas
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = [];
    const petals = [];
    const STAR_COUNT = Math.min(Math.floor(width * 0.06), 70);
    const PETAL_COUNT = 25; // Gentle floating tulip petals

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.4;
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

    class TulipPetal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30;
        this.size = Math.random() * 10 + 7;
        this.speedY = Math.random() * 0.7 + 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
        this.opacity = Math.random() * 0.5 + 0.3;
        const colors = ['#fb7185', '#f472b6', '#ec4899', '#c084fc', '#fda4af'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.008) * 0.4 + this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y > height + 30) this.reset(false);
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.6, -this.size * 0.5, this.size * 0.6, this.size * 0.5, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.6, this.size * 0.5, -this.size * 0.6, -this.size * 0.5, 0, -this.size);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
    for (let i = 0; i < PETAL_COUNT; i++) petals.push(new TulipPetal());

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => { s.update(); s.draw(); });
      petals.forEach((p) => { p.update(); p.draw(); });
      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();

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
    document.body.style.overflow = 'hidden';

    setTimeout(() => { if (openingLines[0]) openingLines[0].classList.add('active'); }, 800);
    setTimeout(() => { if (openingLines[1]) openingLines[1].classList.add('active'); }, 2800);
    setTimeout(() => { if (enterBtn) enterBtn.classList.add('visible'); }, 4500);

    enterBtn.addEventListener('click', () => {
      openingScreen.classList.add('dismissed');
      document.body.style.overflow = '';
      initAudioEngine();

      const introSec = document.getElementById('section-intro');
      if (introSec) {
        setTimeout(() => { introSec.scrollIntoView({ behavior: 'smooth' }); }, 400);
      }
    });
  }

  /* ==========================================================================
     3. Scroll Observer for Animations & Progressive Reveals
     ========================================================================== */
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.id === 'section-final') {
          triggerFinalSequence();
        }
      }
    });
  }, { threshold: 0.2 });

  sections.forEach((sec) => sectionObserver.observe(sec));

  function triggerFinalSequence() {
    const lines = document.querySelectorAll('.final-line');
    lines.forEach((line, index) => {
      setTimeout(() => { line.classList.add('is-inview'); }, index * 1200);
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
     5. Section 4 — Moments Renderer & Lightbox Modal
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
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) closeModal();
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

      card.addEventListener('click', () => card.classList.toggle('revealed'));
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
     7. Section 6 — Soundtrack Player (HTML5 Audio + Tum Hi Ho Piano Synth)
     ========================================================================== */
  let audioCtx = null;
  let isPlaying = false;
  let currentTrackIdx = 0;
  let synthTimeout = null;
  let noteIndex = 0;

  const realAudio = new Audio();
  let isUsingRealAudio = false;

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
  const audioFileInput = document.getElementById('audio-file-input');

  function initAudioEngine() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  // Soft piano timbre synthesizer for Tum Hi Ho melody
  function playPianoNote(freq, noteDuration = 0.5) {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime); // Harmonic octave

      const now = audioCtx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + noteDuration + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + noteDuration + 0.7);
      osc2.stop(now + noteDuration + 0.7);
    } catch (err) {}
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function loadTrack(index) {
    const tracks = data.soundtrack;
    if (!tracks || !tracks[index]) return;
    currentTrackIdx = index;
    const track = tracks[currentTrackIdx];

    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackCover) { trackCover.src = track.cover; trackCover.alt = track.title; }
    if (durationEl) durationEl.textContent = track.duration;

    if (track.audioSrc && !realAudio.src) {
      realAudio.src = track.audioSrc;
    }
  }

  // Handle local user MP3 file upload
  if (audioFileInput) {
    audioFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        realAudio.src = objectUrl;
        isUsingRealAudio = true;
        stopPlayback();
        startPlayback();
      }
    });
  }

  realAudio.addEventListener('timeupdate', () => {
    if (realAudio.duration) {
      const percent = (realAudio.currentTime / realAudio.duration) * 100;
      if (progressFill) progressFill.style.width = `${percent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(realAudio.currentTime);
      if (durationEl) durationEl.textContent = formatTime(realAudio.duration);
    }
  });

  realAudio.addEventListener('ended', () => {
    stopPlayback();
  });

  function playTumHiHoMelodyLoop(track) {
    if (!isPlaying || isUsingRealAudio) return;
    const notes = track.notes || [];
    if (notes.length === 0) return;

    const note = notes[noteIndex];
    const freq = typeof note === 'object' ? note.freq : note;
    const duration = typeof note === 'object' ? note.duration : 0.5;

    playPianoNote(freq, duration);

    noteIndex = (noteIndex + 1) % notes.length;
    synthTimeout = setTimeout(() => {
      playTumHiHoMelodyLoop(track);
    }, (duration + 0.15) * 1000);
  }

  function startPlayback() {
    initAudioEngine();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

    isPlaying = true;
    updateUIState();

    const track = data.soundtrack[currentTrackIdx];

    if (realAudio.src && realAudio.src.length > 0) {
      realAudio.play().then(() => {
        isUsingRealAudio = true;
      }).catch(() => {
        isUsingRealAudio = false;
        noteIndex = 0;
        playTumHiHoMelodyLoop(track);
      });
    } else {
      isUsingRealAudio = false;
      noteIndex = 0;
      playTumHiHoMelodyLoop(track);
    }
  }

  function stopPlayback() {
    isPlaying = false;
    updateUIState();
    if (realAudio) realAudio.pause();
    if (synthTimeout) clearTimeout(synthTimeout);
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
      const pct = clickX / rect.width;
      if (isUsingRealAudio && realAudio.duration) {
        realAudio.currentTime = pct * realAudio.duration;
      } else if (progressFill) {
        progressFill.style.width = `${pct * 100}%`;
      }
    });
  }

  if (data.soundtrack && data.soundtrack.length > 0) {
    loadTrack(0);
  }
});
