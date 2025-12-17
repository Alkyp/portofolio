/* ========================= */
/* FILE: script.js */
/* ========================= */
gsap.registerPlugin(ScrollTrigger);

gsap.from('.badge', { opacity: 0, y: -30, duration: 0.8 });
gsap.from('h1', { opacity: 0, y: 40, duration: 0.8, delay: 0.2 });
gsap.from('.subtitle', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });

gsap.from('.stack span', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  stagger: 0.1,
  delay: 0.6
});

gsap.from('.buttons a', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  stagger: 0.15,
  delay: 0.9
});

gsap.to('.scroll-indicator', {
  y: 10,
  repeat: -1,
  yoyo: true,
  duration: 1.2,
  ease: 'power1.inOut'
});

// Typing Effect
const roles = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Python & SQL Enthusiast',
  'Turning Data into Insight'
];

const typingEl = document.querySelector('.typing');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// ABOUT animation
gsap.from('.section-title', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 80%'
  },
  opacity: 0,
  y: 40,
  duration: 0.8
});

gsap.from('.about-text', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 75%'
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2
});

gsap.from('.edu-card', {
  scrollTrigger: {
    trigger: '.education',
    start: 'top 80%'
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.8
});

