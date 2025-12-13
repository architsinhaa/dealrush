/* =========================================================
   DealRush — script.js
   Purpose: UX clarity, trust, pre-qualification
   Constraints: no libs, no gimmicks, defensive logic
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Utilities ---------- */

  function $(id) {
    return document.getElementById(id);
  }

  function isBusinessEmail(email) {
    if (!email || !email.includes('@')) return false;

    const domain = email.split('@')[1].toLowerCase();
    const blocked = [
      'gmail.com',
      'googlemail.com',
      'outlook.com',
      'hotmail.com',
      'live.com',
      'yahoo.com',
      'icloud.com',
      'me.com'
    ];

    return !blocked.includes(domain);
  }

  function showMessage(el, msg) {
    if (!el) return;
    el.innerText = msg;
    el.style.display = 'block';
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => {
      el.style.display = 'none';
    }, 2500);
  }

  /* ---------- Fade-in (no animation gimmicks) ---------- */

  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: make content visible immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Smooth scroll (internal only) ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length === 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Email gate (defensive; only runs if present) ---------- */

  const buyBtn = $('buyBtn');
  const emailInput = $('email');
  const toast = $('toast');

  if (buyBtn && emailInput) {
    buyBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!email) {
        showMessage(toast, 'Business email required.');
        return;
      }

      if (!isBusinessEmail(email)) {
        showMessage(
          toast,
          'Please use a company email (no Gmail, Outlook, or Yahoo).'
        );
        return;
      }

      // Placeholder success state — actual handoff handled server-side
      showMessage(
        toast,
        'Thanks. If this is a fit, we’ll reach out shortly.'
      );
    });
  }

})();
