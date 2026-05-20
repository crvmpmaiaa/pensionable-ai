/* ============================================================
   maiaa.ai — Main Script
   ============================================================ */

(function () {
  'use strict';

  /* --- Lazy-load iframes on intersection --- */
  const lazyIframes = document.querySelectorAll('iframe.lazy-iframe');
  if ('IntersectionObserver' in window && lazyIframes.length) {
    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) { el.src = el.dataset.src; delete el.dataset.src; }
          iframeObserver.unobserve(el);
        }
      });
    }, { rootMargin: '200px' });
    lazyIframes.forEach(el => iframeObserver.observe(el));
  }

  /* --- Lenis Smooth Scroll --- */
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    infinite: false,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* --- Anchor link smooth scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    });
  });

  /* --- Scroll reveal (IntersectionObserver) --- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  /* --- Hero elements: trigger on load (no scroll needed) --- */
  const heroEls = document.querySelectorAll('.hero .fade-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 100);
  });

  /* --- GSAP ScrollTrigger + Lenis --- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    // Statement: pin the wrap, shrink the card while pinned (desktop only)
    const statementWrap = document.getElementById('statementWrap');
    const statementCard = document.getElementById('statementCard');
    if (statementWrap && statementCard && window.innerWidth > 768) {
      gsap.fromTo(statementCard,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
        { clipPath: 'inset(0% 6% 8% 6% round 0px 0px 24px 24px)', ease: 'none',
        scrollTrigger: {
          trigger: statementWrap,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
        }
      });
    }

    // Statements scroller: auto-cycle every 2.5s (handles both desktop + mobile instances)
    function initStatementsScroller(scrollerId, dotsId) {
      const scroller = document.getElementById(scrollerId);
      const dotsWrap = document.getElementById(dotsId);
      if (!scroller || !dotsWrap) return;
      const slides = Array.from(scroller.querySelectorAll('.statement-slide'));
      const dots   = Array.from(dotsWrap.querySelectorAll('.statements-dot'));
      let current = 0;

      function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));
      setInterval(() => goTo(current + 1), 2500);
    }
    initStatementsScroller('statementsScroller', 'statementsDots');
    initStatementsScroller('statementsScrollerMobile', 'statementsDotsMobile');

    // Niche ticker: snap-to-centre stepper
    (function () {
      const ticker = document.getElementById('nicheTicker');
      if (!ticker) return;

      const items = Array.from(ticker.querySelectorAll('.niche-item'));
      let current = 0;

      function snapTo(index) {
        items[current].classList.remove('active');
        current = (index + items.length) % items.length;
        items[current].classList.add('active');

        // Offset so active item sits at horizontal centre of the wrap
        const wrap = ticker.parentElement;
        const wrapMid = wrap.offsetWidth / 2;
        const itemEl  = items[current];
        const itemMid = itemEl.offsetLeft + itemEl.offsetWidth / 2;
        ticker.style.transform = `translateX(${wrapMid - itemMid}px)`;
      }

      // Initialise on first item
      snapTo(0);
      const interval = window.innerWidth <= 768 ? 1000 : 1800;
      setInterval(() => snapTo(current + 1), interval);
    })();

    // Circular portfolio gallery
    (function () {
      const ring  = document.getElementById('circGalleryRing');
      const stage = document.getElementById('circGalleryStage');
      if (!ring || !stage) return;

      const cards  = Array.from(ring.querySelectorAll('.portfolio-circ-card'));
      const count  = cards.length;
      const isMob  = window.innerWidth <= 768;
      const RADIUS = isMob ? 240 : 380;
      const SPEED  = 0.004;

      // Inject label markup from data attributes
      cards.forEach(card => {
        const label = document.createElement('div');
        label.className = 'portfolio-circ-label';
        label.innerHTML = `<h3>${card.dataset.label}</h3><p>${card.dataset.sub}</p>`;
        card.appendChild(label);
        // Pre-position with CSS transform
        const i = cards.indexOf(card);
        card.style.transform = `rotateY(${i * (360 / count)}deg) translateZ(${RADIUS}px)`;
      });

      let rotation = 0;
      let targetTiltX = 0, targetTiltY = 0, tiltX = 0, tiltY = 0;
      let rafId = null, visible = false;

      stage.addEventListener('mousemove', e => {
        const r = stage.getBoundingClientRect();
        targetTiltX =  ((e.clientX - r.left) / r.width  - 0.5) * 10;
        targetTiltY = -((e.clientY - r.top)  / r.height - 0.5) * 8;
      });
      stage.addEventListener('mouseleave', () => { targetTiltX = 0; targetTiltY = 0; });

      function tick() {
        rotation += SPEED * (180 / Math.PI);
        tiltX += (targetTiltX - tiltX) * 0.06;
        tiltY += (targetTiltY - tiltY) * 0.06;
        ring.style.transform = `rotateX(${tiltY}deg) rotateY(${rotation}deg)`;

        cards.forEach((card, i) => {
          const angle = (i * (360 / count) + rotation) * (Math.PI / 180);
          const cos   = Math.cos(angle);
          card.style.opacity = (0.35 + 0.65 * ((cos + 1) / 2)).toFixed(3);
          card.style.zIndex  = Math.round((cos + 1) * 5);
        });

        if (visible) rafId = requestAnimationFrame(tick);
      }

      const galleryObserver = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible && !rafId) rafId = requestAnimationFrame(tick);
        if (!visible && rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }, { threshold: 0.1 });
      galleryObserver.observe(stage);
    })();

    // Process section: stagger cards in as they enter the viewport
    document.querySelectorAll('.process-step').forEach((step, i) => {
      const stepObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => step.classList.add('ps-revealed'), i * 120);
          stepObserver.unobserve(step);
        }
      }, { threshold: 0.15 });
      stepObserver.observe(step);
    });

    // Laptop: perspective tilt-in (desktop only — too heavy on mobile)
    const laptop = document.getElementById('laptopReveal');
    if (laptop && window.innerWidth > 768) {
      gsap.fromTo(laptop,
        { rotateX: 20, scale: 1.05, opacity: 0.6, y: 0 },
        {
          rotateX: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: laptop,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.2,
          }
        }
      );
    }
  }

  /* --- Hero Gradient Wave --- */
  (function () {
    const canvas = document.getElementById('gradientCanvas');
    if (!canvas || !window.GradientWave) return;
    try {
      const g = new window.GradientWave.Gradient(canvas,
        ['#CCCCFF', '#CCFFE6', '#FFFFCC', '#CCCCFF', '#FFCCE6', '#CCFFE6'],
        { shadowPower: 4, darkenTop: false, noiseFrequency: [0.0001, 0.0002], deform: { incline: 0.2, noiseAmp: 320, noiseFlow: 3 } }
      );
      g.start();
    } catch (e) {
      console.warn('GradientWave init failed:', e);
      document.getElementById('hero').style.background = 'linear-gradient(135deg,#fb7185,#e879f9,#a3e635)';
    }
  })();

  /* --- Image Carousel --- */
  (function () {
    const stage = document.getElementById('carouselStage');
    const ring  = document.getElementById('carouselRing');
    if (!stage || !ring) return;

    const cards = Array.from(ring.querySelectorAll('.carousel-card'));
    const count = cards.length;
    const RADIUS = stage.offsetWidth < 400 ? 130 : 260;

    let orbitAngle = 0;       // degrees, increments each frame
    let mouseX = 0, mouseY = 0;
    let targetTiltX = 0, targetTiltY = 0;
    let tiltX = 0, tiltY = 0;

    // Place each card around the circle
    function positionCards() {
      cards.forEach((card, i) => {
        const baseAngle  = (i / count) * (Math.PI * 2);
        const totalAngle = baseAngle + (orbitAngle * Math.PI / 180);
        const x = Math.cos(totalAngle) * RADIUS;
        const y = Math.sin(totalAngle) * RADIUS * 0.5; // flatten Y for ellipse
        const cardRot = parseFloat(card.dataset.rot || 0);

        card.style.transform = `translate(${x}px, ${y}px) rotateZ(${cardRot}deg)`;

        // Depth cue: scale + opacity by Z position
        const cosVal = Math.cos(totalAngle);
        const scale  = 0.75 + 0.35 * ((cosVal + 1) / 2);
        const opacity = 0.5 + 0.5 * ((cosVal + 1) / 2);
        card.style.transform += ` scale(${scale})`;
        card.style.opacity   = opacity;
        card.style.zIndex    = Math.round(scale * 10);
      });
    }

    function animate() {
      orbitAngle = (orbitAngle + 0.18) % 360;

      // Smooth tilt towards mouse
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;
      ring.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

      positionCards();
      requestAnimationFrame(animate);
    }

    stage.addEventListener('mousemove', e => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      targetTiltX =  nx * 18;
      targetTiltY = -ny * 12;
    });
    stage.addEventListener('mouseleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
    });

    animate();
  })();

  /* --- Mobile nav toggle --- */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  const nav = document.getElementById('nav');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    if (nav) nav.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    if (nav) nav.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

})();
