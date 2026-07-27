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

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
  });
})();
