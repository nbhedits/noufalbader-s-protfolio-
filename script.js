/* =========================================================
   script.js – Nouf Portfolio
   Handles: mobile menu toggle, smooth scroll, navbar scroll style
   ========================================================= */

(function () {
  'use strict';

  /* --- DOM refs --- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('a[href^="#"]');

  /* -------------------------------------------------------
     1. Navbar — add scrolled class after 60px
  ------------------------------------------------------- */
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* -------------------------------------------------------
     2. Mobile menu toggle
  ------------------------------------------------------- */
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu when a link is clicked */
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* -------------------------------------------------------
     3. Smooth scroll for all anchor links
  ------------------------------------------------------- */
  allLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* -------------------------------------------------------
     4. Intersection Observer – fade-in on scroll
  ------------------------------------------------------- */
  const revealItems = document.querySelectorAll(
    '.service-card, .work-card, .process-step, .ww-item, .stat, .about-text p, .about-lead, .contact-card'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(function (el, i) {
    el.style.setProperty('--reveal-delay', i * 60 + 'ms');
    observer.observe(el);
  });

})();
