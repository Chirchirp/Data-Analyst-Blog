/**
 * loader.js
 * ─────────────────────────────────────────────────────────────
 * Fetches and injects every HTML component / post fragment into
 * the page before main.js runs. All components live in separate
 * files, keeping the codebase modular and easy to extend.
 *
 * To add a new blog post:
 *   1. Create posts/blog7.html  (copy an existing post as a template)
 *   2. Add 'blog7' to the POSTS array below
 *   3. Add its card to components/home.html (post-list section)
 *   That's it — no changes to index.html or main.js needed.
 * ─────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── Component manifest ──────────────────────────────────── */

  const COMPONENTS = [
    { slot: 'slot-header', file: 'components/header.html' },
    { slot: 'slot-home',   file: 'components/home.html'   },
    { slot: 'slot-footer', file: 'components/footer.html' },
    { slot: 'slot-modals', file: 'components/modals.html' },
  ];

  /**
   * Post manifest — order controls DOM order (not display order).
   * Display order is determined by the navigation logic in main.js.
   * Add new posts here and in components/home.html.
   */
  const POSTS = [
    'blog-ai',
    'blog5',
    'blog6',
    'blog2',
    'blog1',
    'blog3',
    'blog4',
  ];

  /* ── Helpers ─────────────────────────────────────────────── */

  /**
   * Fetch an HTML fragment and inject it into a DOM slot.
   * @param {string} slot - ID of the target element
   * @param {string} file - Path to the HTML fragment
   * @returns {Promise<void>}
   */
  async function injectFragment(slot, file) {
    const el = document.getElementById(slot);
    if (!el) {
      console.warn(`[loader] Slot #${slot} not found in DOM.`);
      return;
    }
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${file}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(`[loader] Failed to load ${file}:`, err);
      el.innerHTML = `<p class="load-error">Could not load ${file}.</p>`;
    }
  }

  /* ── Main load sequence ──────────────────────────────────── */

  async function loadAll() {
    // 1. Load structural components in parallel
    const componentPromises = COMPONENTS.map(({ slot, file }) =>
      injectFragment(slot, file)
    );

    // 2. Load all post fragments into the posts slot in parallel,
    //    then append them all to the slot in declaration order.
    const postsSlot = document.getElementById('slot-posts');
    const postPromises = POSTS.map(async (id) => {
      const file = `posts/${id}.html`;
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        return { id, html };
      } catch (err) {
        console.error(`[loader] Failed to load post ${file}:`, err);
        return { id, html: `<div class="post-detail" id="${id}"><p class="load-error">Could not load ${id}.</p></div>` };
      }
    });

    const [, ...postResults] = await Promise.all([
      Promise.all(componentPromises),
      ...postPromises,
    ]);

    // Append posts in order
    if (postsSlot) {
      postResults.forEach(({ html }) => {
        postsSlot.insertAdjacentHTML('beforeend', html);
      });
    }

    // 3. Signal that all content is ready — main.js listens for this
    document.dispatchEvent(new CustomEvent('components:ready'));
  }

  // Kick off as soon as the script runs (body is parsed)
  loadAll();
})();
