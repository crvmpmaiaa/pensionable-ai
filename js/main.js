/* ============================================================
   pensionable.ai — main.js
   IntersectionObserver reveal animations
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Reveal on Scroll ──────────────────────────────────── */
  if (!prefersReducedMotion) {
    /* Apply stagger delays to sibling .reveal groups */
    document.querySelectorAll('.stagger').forEach(function (group) {
      var items = group.querySelectorAll('.reveal');
      items.forEach(function (el, i) {
        el.style.setProperty('--delay', (i * 100) + 'ms');
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Reduced motion: show everything immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Trust Scroller ────────────────────────────────────── */
  var slides = document.querySelectorAll('.trust-slide');
  var dots   = document.querySelectorAll('.trust-dot');
  var bar    = document.querySelector('.trust-progress__bar');

  if (slides.length && bar) {
    var current  = 0;
    var DURATION = 8000;
    var timer    = null;
    var startTs  = null;
    var rafId    = null;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      startProgress();
    }

    function startProgress() {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      bar.style.transition = 'none';
      bar.style.width = '0%';
      startTs = null;

      rafId = requestAnimationFrame(function tick(ts) {
        if (!startTs) startTs = ts;
        var elapsed = ts - startTs;
        var pct = Math.min((elapsed / DURATION) * 100, 100);
        bar.style.transition = 'none';
        bar.style.width = pct + '%';
        if (elapsed < DURATION) {
          rafId = requestAnimationFrame(tick);
        } else {
          goTo(current + 1);
        }
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    startProgress();
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  var path = window.location.pathname;
  var filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (
      href === filename ||
      (filename === '' && href === 'index.html') ||
      (filename === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

})();
