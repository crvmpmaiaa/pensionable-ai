/* Animated cycling gradient background for the CTA section */
(function () {

  const gradients = [
    'linear-gradient(135deg, #CCE5FF 0%, #CCFFE6 100%)',
    'linear-gradient(135deg, #CCFFE6 0%, #FFFFCC 100%)',
    'linear-gradient(135deg, #FFFFCC 0%, #FFCCE6 100%)',
    'linear-gradient(135deg, #FFCCE6 0%, #CCCCFF 100%)',
    'linear-gradient(135deg, #CCCCFF 0%, #CCE5FF 100%)',
  ];

  function init() {
    const section = document.querySelector('.cta-dark');
    if (!section) return;

    // Build two layers and cross-fade between them
    const layerA = document.createElement('div');
    const layerB = document.createElement('div');
    const layerStyle = 'position:absolute;inset:0;transition:opacity 2s ease;';
    layerA.style.cssText = layerStyle + 'z-index:0;opacity:1;';
    layerB.style.cssText = layerStyle + 'z-index:0;opacity:0;';

    section.style.position = 'relative';
    section.insertBefore(layerB, section.firstChild);
    section.insertBefore(layerA, section.firstChild);

    // Ensure all existing children sit above the gradient layers
    Array.from(section.children).forEach(el => {
      if (el !== layerA && el !== layerB) el.style.zIndex = '2';
    });

    let current = 0;
    let showingA = true;

    layerA.style.background = gradients[0];
    layerB.style.background = gradients[1];

    setInterval(() => {
      current = (current + 1) % gradients.length;
      const next = (current + 1) % gradients.length;

      if (showingA) {
        // Fade in B (which already has next gradient set)
        layerB.style.opacity = '1';
        layerA.style.opacity = '0';
        // While B is showing, quietly update A for the next swap
        setTimeout(() => { layerA.style.background = gradients[next]; }, 2100);
      } else {
        layerA.style.opacity = '1';
        layerB.style.opacity = '0';
        setTimeout(() => { layerB.style.background = gradients[next]; }, 2100);
      }

      showingA = !showingA;
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
