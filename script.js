// ==========================================
// 1. INTEGRASI YOUTUBE IFRAME API RESMI
// ID Video: n-WY47j-baA
// ==========================================
let player;
let isPlaying = false;
const playPauseBtn = document.getElementById('play-pause-btn');
const musicStatus = document.getElementById('music-status');

// Dipanggil otomatis saat API YouTube siap
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '200',
    width: '200',
    videoId: 'n-WY47j-baA', // ID lagu dari https://youtu.be/n-WY47j-baA
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'n-WY47j-baA'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  musicStatus.innerText = 'Klik untuk Putar Musik';
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    isPlaying = true;
    playPauseBtn.innerText = '⏸️';
    musicStatus.innerText = 'Sedang Memutar...';
  } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
    isPlaying = false;
    playPauseBtn.innerText = '🎵';
    musicStatus.innerText = 'Di-pause';
  }
}

function toggleAudio() {
  if (!player) return;
  if (!isPlaying) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
}

function autoPlayMusic() {
  if (player && !isPlaying) {
    player.playVideo();
  }
}

// ==========================================
// 2. MODAL GALERI FOTO (LIGHTBOX)
// ==========================================
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// ==========================================
// 3. EFEK KONFETI & INTERAKSI TERIMA
// ==========================================
function terimaBalikan() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    alert("Terima kasih sudah memberikan kesempatan kedua ini ❤️! Aku janji bakal buat kamu selalu bahagia.");
  }, 500);
}

// ==========================================
// 4. EFEK PARTIKEL BINTANG / CAHAYA (CANVAS)
// ==========================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * -0.5 - 0.2;
    this.opacity = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(244, 114, 182, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.size, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();