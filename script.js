gsap.registerPlugin(ScrollTrigger);

/* ---- NAVBAR scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ========================= */
/* HERO ANIMATIONS           */
/* ========================= */
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTL
  .from('.hero-badge',    { opacity: 0, y: -20, duration: 0.7 })
  .from('h1',            { opacity: 0, y: 40,  duration: 0.8 }, '-=0.4')
  .from('.typing-wrapper',{ opacity: 0, y: 20,  duration: 0.6 }, '-=0.5')
  .from('.subtitle',     { opacity: 0, y: 20,  duration: 0.6 }, '-=0.4')
  .from('.stack span',   { opacity: 0, y: 16,  duration: 0.5, stagger: 0.08 }, '-=0.3')
  .from('.buttons a',    { opacity: 0, y: 16,  duration: 0.5, stagger: 0.12 }, '-=0.2')
  .from('.lottie',       { opacity: 0, y: 30,  duration: 0.8 }, '-=0.4');

/* ========================= */
/* TYPING EFFECT             */
/* ========================= */
const roles = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Python & SQL Enthusiast',
  'Turning Data into Insight',
];

const typingEl = document.querySelector('.typing');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95);
}

typeEffect();

/* ========================= */
/* SCROLL ANIMATIONS         */
/* ========================= */
function animateOnScroll(selector, vars, triggerEl) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: triggerEl || selector,
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
    ...vars,
  });
}

// Section labels & titles
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    opacity: 0, y: 14, duration: 0.6,
  });
});

gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0, y: 24, duration: 0.7,
  });
});

// About
animateOnScroll('.about-text', { opacity: 0, y: 24, duration: 0.7, stagger: 0.18 }, '.about');
animateOnScroll('.edu-card',   { opacity: 0, scale: 0.94, duration: 0.7 }, '.about-right');
animateOnScroll('.stat-card',  { opacity: 0, y: 18, duration: 0.5, stagger: 0.1 }, '.stats-grid');

// Skills
gsap.utils.toArray('.skill-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%' },
    opacity: 0, y: 30, duration: 0.6, delay: i * 0.08,
  });
});

// Projects
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 90%' },
    opacity: 0, y: 36, duration: 0.6, delay: (i % 3) * 0.1,
  });
});

// Contact — animate each card individually so none get stuck
gsap.utils.toArray('.contact-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 95%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 24,
    duration: 0.6,
    delay: i * 0.12,
    ease: 'power2.out',
  });
});

/* ========================= */
/* SMOOTH ACTIVE NAV         */
/* ========================= */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? '#e5e7eb'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
