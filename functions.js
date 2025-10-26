document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const heroText = document.querySelector('.hero h2');
  const products = document.querySelectorAll('.product');
  const navLinks = document.querySelectorAll('nav a');
  const waBtn = document.querySelector('.whatsapp-btn');

  // Hero muncul halus
  hero.style.opacity = 0;
  hero.style.transform = 'translateY(30px)';
  setTimeout(() => {
    hero.style.transition = '1s ease';
    hero.style.opacity = 1;
    hero.style.transform = 'translateY(0)';
  }, 300);

  // Smooth scroll menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Produk muncul fade-in saat discroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  products.forEach(prod => {
    prod.style.opacity = 0;
    prod.style.transform = 'translateY(30px)';
    prod.style.transition = 'all 0.8s cubic-bezier(0.2, 0.6, 0.2, 1)';
    observer.observe(prod);

    // Klik produk → efek glow halus
    prod.addEventListener('click', () => {
      prod.style.boxShadow = '0 0 25px rgba(255, 200, 200, 0.7)';
      prod.style.transform = 'scale(1.05)';
      prod.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        prod.style.boxShadow = '';
        prod.style.transform = 'scale(1)';
      }, 500);
    });
  });

  // Tombol WhatsApp berdenyut halus
  function pulse() {
    waBtn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.1)' },
      { transform: 'scale(1)' }
    ], {
      duration: 1800,
      iterations: Infinity
    });
  }
  pulse();

  // ❄️ Efek salju di hero
  const canvas = document.createElement('canvas');
  canvas.classList.add('snow');
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 1;
  hero.style.position = 'relative';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let snowflakes = [];

  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < 60; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() + 0.5
      });
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    for (let i = 0; i < snowflakes.length; i++) {
      const f = snowflakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    updateSnowflakes();
  }

  let angle = 0;
  function updateSnowflakes() {
    angle += 0.01;
    for (let i = 0; i < snowflakes.length; i++) {
      const f = snowflakes[i];
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 0.5;
      if (f.y > canvas.height) {
        snowflakes[i] = {
          x: Math.random() * canvas.width,
          y: 0,
          r: f.r,
          d: f.d
        };
      }
    }
  }

  function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
  }

  resizeCanvas();
  createSnowflakes();
  animateSnow();
  window.addEventListener('resize', resizeCanvas);
});
