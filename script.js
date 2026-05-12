// ── UI LOGIC ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Rotating tagline animation
  initTaglineRotation();
  
  // Cosmic tracking & scroll animation
  const cosmic = document.getElementById('bg-cosmic');
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    updateCosmic();
  });

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateCosmic();
  });

  function updateCosmic() {
    if (!cosmic) return;
    
    const rotY = mouseX * 10; 
    const rotX = -mouseY * 10;
    const scrollFactor = window.scrollY / 1000;
    const scale = 1.0 + scrollFactor * 0.05; 
    
    cosmic.style.transform = `translate(-50%, -50%) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
  }

  // Shooting Stars Logic
  const starsContainer = document.getElementById('stars-container');
  
  function createStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const angle = Math.random() * 360;
    const dist = 500 + Math.random() * 1000;
    
    const distX = Math.cos(angle * Math.PI / 180) * dist;
    const distY = Math.sin(angle * Math.PI / 180) * dist;
    
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.setProperty('--angle', `${angle}deg`);
    star.style.setProperty('--distX', `${distX}px`);
    star.style.setProperty('--distY', `${distY}px`);
    
    const duration = 1 + Math.random() * 2;
    star.style.animation = `shoot ${duration}s linear forwards`;
    
    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
  }

  setInterval(createStar, 800);

  // Falling Stars Logic
  function createFallingStar() {
    const star = document.createElement('div');
    star.className = 'falling-star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    
    const duration = 5 + Math.random() * 10;
    star.style.animationDuration = `${duration}s`;
    
    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
  }

  setInterval(createFallingStar, 200);

  // Reveal animation on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.section');
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
    s.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(s);
  });
});

function toggleMenu() {
  const links = document.getElementById('nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  if (links.style.display === 'flex') {
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.width = '100%';
    links.style.background = 'rgba(5,5,5,0.95)';
    links.style.padding = '20px';
    links.style.borderBottom = '1px solid var(--border)';
  }
}

function initTaglineRotation() {
  const phrases = [
    'AI-powered AgriTech',
    'Computer Vision Systems',
    'Precision Farm Tools',
    'Deep Learning Models'
  ];
  let i = 0;
  const el = document.getElementById('tagline-rotating');
  
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'all 0.4s ease';
    
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400);
  }, 3000);
}

function filterProjects(category, btn) {
  // Update buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cats = card.getAttribute('data-cat').split(' ');
    if (category === 'all' || cats.includes(category)) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

function handleContact(e) {
  e.preventDefault();
  const success = document.getElementById('contact-success');
  success.classList.remove('hidden');
  e.target.reset();
  setTimeout(() => success.classList.add('hidden'), 5000);
}
