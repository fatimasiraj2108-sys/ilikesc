// Shared across every page: smooth internal-link page transitions,
// scroll-reveal animations, and (on pages that have it) the hero glow.

(function () {
  // ---- Smooth page-to-page transition ----
  // Intercept clicks on same-site links, fade the page out, then navigate.
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let cmd/ctrl-click open in new tab normally

    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(function () {
      window.location.href = href;
    }, 220);
  });

  // ---- Scroll-reveal ----
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  // ---- Hero glow (cursor-follow light) ----
  function initHeroGlow() {
    const hero = document.querySelector('.hero');
    const glow = document.querySelector('.hero-glow');
    if (!hero || !glow) return;

    let targetX = hero.offsetWidth * 0.25, targetY = 40;
    let curX = targetX, curY = targetY;

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    function tick() {
      curX += (targetX - curX) * 0.1;
      curY += (targetY - curY) * 0.1;
      glow.style.transform = 'translate3d(' + curX.toFixed(1) + 'px,' + curY.toFixed(1) + 'px,0)';
      requestAnimationFrame(tick);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(tick);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initHeroGlow();
  });
})();
