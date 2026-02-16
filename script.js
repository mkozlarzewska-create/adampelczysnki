/* ========================================
   Adam Pełczyński — Squash Coach
   Script: scroll reveals, parallax, nav
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- ELEMENTS ---------- */
  const header  = document.getElementById('header');
  const burger  = document.getElementById('burger');
  const nav     = document.getElementById('nav');
  const heroBg  = document.getElementById('heroBg');
  const links   = document.querySelectorAll('.header__link');

  /* ---------- STICKY HEADER ---------- */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- BURGER MENU ---------- */
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close nav on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- PARALLAX (HERO BG) ---------- */
  let ticking = false;
  const parallax = () => {
    if (!heroBg) return;
    const scrolled = window.scrollY;
    const heroH = document.querySelector('.hero').offsetHeight;
    if (scrolled < heroH) {
      heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.1)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(parallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial scale
  if (heroBg) heroBg.style.transform = 'translateY(0) scale(1.1)';

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.header__link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h')} 0px -40% 0px`
  });

  sections.forEach(s => navObserver.observe(s));
});
