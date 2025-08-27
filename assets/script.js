/* Theme toggle: honors system pref by default; user choice persisted */
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') html.setAttribute('data-theme', saved);

  const btn = document.querySelector('.toggle-theme');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'auto';
      const next = current === 'dark' ? 'light' : (current === 'light' ? 'auto' : 'dark');
      html.setAttribute('data-theme', next);
      if (next === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
      btn.textContent = (next === 'dark') ? '☀' : '☾';
    });
  }
})();

/* Parallax on hero heading (subtle, hero only) */
(function () {
  const hero = document.querySelector('.hero[data-parallax] .heading-group');
  if (!hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const onScroll = () => {
    const y = Math.max(0, window.scrollY);
    const shift = Math.min(24, y * 0.15); // cap movement
    hero.style.transform = `translateY(${shift}px)`;
    hero.style.opacity = `${1 - Math.min(0.2, y / 800)}`;
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* Copy-to-clipboard for marked quotes/lines */
(function () {
  function textFromTarget(sel) {
    const el = document.querySelector(sel);
    if (!el) return '';
    // read from data-copy attribute if set; fallback to textContent
    return el.getAttribute('data-copy') || el.textContent.trim();
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selector = btn.getAttribute('data-copy-target');
      try {
        const text = textFromTarget(selector);
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = original), 1200);
      } catch (e) {
        btn.textContent = 'Press ⌘/Ctrl+C';
        setTimeout(() => (btn.textContent = 'Copy'), 1200);
      }
    });
  });
})();
