/* Playing-card tilt + glare effect — ported from Spencer Lynch credential cards */
(function () {

  function initCards() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      const shine = card.querySelector('.ps-shine');
      const baseRot = parseFloat(getComputedStyle(card).getPropertyValue('--card-rot')) || 0;

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.12s ease, box-shadow 0.15s ease';
      });

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top)  / rect.height;

        const rotX = (y - 0.5) * -14;
        const rotY = (x - 0.5) *  14;

        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04) translateY(-12px)`;

        if (shine) {
          shine.style.opacity = '1';
          shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.45s ease, box-shadow 0.15s ease';
        card.style.transform = `rotate(${baseRot}deg)`;
        if (shine) shine.style.opacity = '0';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    initCards();
  }

})();
