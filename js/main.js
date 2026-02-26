/**
 * main.js — navigation, transitions, modals, reading progress, reactions.
 * Runs after loader.js fires the 'components:ready' event.
 */

document.addEventListener('components:ready', function () {
  'use strict';

  const homeView  = document.getElementById('home-view');
  const curtain   = document.getElementById('page-curtain');
  const progress  = document.getElementById('reading-progress');
  const header    = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allPosts  = document.querySelectorAll('.post-detail');

  let currentPost     = null;
  let isTransitioning = false;

  /* ── Reading progress ──────────────────────────────────────── */
  function updateProgress() {
    if (!currentPost) { progress.style.width = '0%'; return; }
    const total = document.body.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = pct + '%';
    progress.setAttribute('aria-valuenow', Math.round(pct));
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Sticky header ─────────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Page transition ───────────────────────────────────────── */
  function transition(cb) {
    if (isTransitioning) return;
    isTransitioning = true;
    curtain.classList.remove('sliding-down');
    curtain.classList.add('sliding-up');
    setTimeout(function () {
      cb();
      window.scrollTo(0, 0);
      curtain.classList.remove('sliding-up');
      curtain.classList.add('sliding-down');
      setTimeout(function () {
        curtain.classList.remove('sliding-down');
        isTransitioning = false;
      }, 550);
    }, 300);
  }

  function showPost(postId) {
    const target = document.getElementById(postId);
    if (!target) return;
    transition(function () {
      homeView.style.display = 'none';
      allPosts.forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      currentPost = postId;
      updateProgress();
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  function showHome() {
    transition(function () {
      allPosts.forEach(p => p.classList.remove('active'));
      homeView.style.display = '';
      currentPost = null;
      updateProgress();
      homeView.setAttribute('tabindex', '-1');
      homeView.focus({ preventScroll: true });
    });
  }

  function closeNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  /* ── Click delegation ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const postLink = e.target.closest('.post-link');
    if (postLink && !postLink.classList.contains('back-to-home')) {
      e.preventDefault();
      const id = postLink.getAttribute('data-post');
      if (id) { closeNav(); showPost(id); }
      return;
    }
    if (e.target.closest('.back-to-home')) { e.preventDefault(); closeNav(); showHome(); return; }
    if (e.target.closest('.home-trigger')) { showHome(); return; }

    const mt = e.target.closest('.modal-trigger');
    if (mt) { e.preventDefault(); openModal(mt.getAttribute('data-modal')); return; }
    const cb = e.target.closest('.modal-close-btn');
    if (cb) { closeModal(cb.closest('.modal-overlay')); return; }
    if (e.target.classList.contains('modal-overlay')) { closeModal(e.target); }

    const rb = e.target.closest('.reaction-btn');
    if (rb) { handleReaction(rb); return; }
    const sb = e.target.closest('.share-btn');
    if (sb) { handleShare(sb); return; }
  });

  document.querySelectorAll('.home-trigger').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showHome(); }
    });
  });

  hamburger.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && navLinks.classList.contains('open')) closeNav();
  });

  /* ── Modals ─────────────────────────────────────────────────── */
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { const b = m.querySelector('.modal-close-btn'); if (b) b.focus(); }, 80);
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
  });

  /* ── Contact form ───────────────────────────────────────────── */
  const cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      this.innerHTML = '<p style="font-family:var(--ff-display);font-size:1.05rem;color:var(--g700);padding:1rem 0;font-style:italic;">Message sent. I\'ll be in touch shortly.</p>';
    });
  }

  /* ══════════════════════════════════════════════════════════════
     REACTION SYSTEM — persisted in localStorage per post
  ══════════════════════════════════════════════════════════════ */

  const REACTIONS = [
    { key: 'insightful', emoji: '💡', label: 'Insightful' },
    { key: 'helpful',    emoji: '🙌', label: 'Helpful'    },
    { key: 'inspiring',  emoji: '🔥', label: 'Inspiring'  },
    { key: 'saved',      emoji: '🔖', label: 'Save'       },
  ];

  const THANKS = [
    'Thanks — reactions keep me writing!',
    'Appreciate it, genuinely.',
    'Glad this landed for you!',
    'Your feedback means a lot.',
    'That made my day — thank you.',
  ];

  // Seed counts so posts feel alive on first visit
  const SEEDS = {
    'blog-ai': { insightful:41, helpful:28, inspiring:35, saved:19 },
    'blog5':   { insightful:29, helpful:37, inspiring:18, saved:22 },
    'blog6':   { insightful:33, helpful:44, inspiring:14, saved:27 },
    'blog2':   { insightful:52, helpful:31, inspiring:39, saved:24 },
    'blog1':   { insightful:61, helpful:48, inspiring:45, saved:33 },
    'blog3':   { insightful:44, helpful:55, inspiring:38, saved:29 },
    'blog4':   { insightful:38, helpful:26, inspiring:42, saved:17 },
  };

  function rxKey(postId) { return 'rx_v1_' + postId; }

  function loadRx(postId) {
    try { const r = localStorage.getItem(rxKey(postId)); return r ? JSON.parse(r) : null; }
    catch { return null; }
  }

  function saveRx(postId, data) {
    try { localStorage.setItem(rxKey(postId), JSON.stringify(data)); }
    catch (e) { /* quota exceeded or private mode */ }
  }

  function defaultRx(postId) {
    return { counts: Object.assign({}, SEEDS[postId] || { insightful:20, helpful:18, inspiring:15, saved:10 }), user: {} };
  }

  function renderRx(container, postId, data) {
    const row = container.querySelector('.reactions-row');
    if (!row) return;
    row.innerHTML = '';
    REACTIONS.forEach(function (rt) {
      const count   = data.counts[rt.key] || 0;
      const reacted = !!data.user[rt.key];
      const btn = document.createElement('button');
      btn.className = 'reaction-btn' + (reacted ? ' reacted' : '');
      btn.setAttribute('aria-label', rt.label + ' — ' + count + ' reactions. Click to react.');
      btn.setAttribute('data-reaction', rt.key);
      btn.setAttribute('data-post', postId);
      btn.innerHTML =
        '<span class="reaction-emoji">' + rt.emoji + '</span>' +
        '<span class="reaction-count">' + count + '</span>' +
        '<span class="reaction-text">' + rt.label + '</span>';
      row.appendChild(btn);
    });
  }

  function initRx(postEl) {
    const postId    = postEl.id;
    const container = postEl.querySelector('.reactions-section');
    if (!container) return;
    let data = loadRx(postId);
    if (!data) { data = defaultRx(postId); saveRx(postId, data); }
    renderRx(container, postId, data);
  }

  function handleReaction(btn) {
    const key    = btn.getAttribute('data-reaction');
    const postId = btn.getAttribute('data-post');
    if (!key || !postId) return;
    const postEl    = document.getElementById(postId);
    const container = postEl && postEl.querySelector('.reactions-section');
    if (!container) return;

    let data = loadRx(postId) || defaultRx(postId);
    const wasOn = !!data.user[key];

    if (wasOn) {
      data.counts[key] = Math.max(0, (data.counts[key] || 1) - 1);
      delete data.user[key];
    } else {
      data.counts[key] = (data.counts[key] || 0) + 1;
      data.user[key] = true;
    }

    saveRx(postId, data);
    renderRx(container, postId, data);

    const thanks = container.querySelector('.reactions-thanks');
    if (thanks) {
      if (!wasOn) {
        thanks.textContent = THANKS[Math.floor(Math.random() * THANKS.length)];
        thanks.style.opacity = '1';
        clearTimeout(thanks._t);
        thanks._t = setTimeout(function () {
          thanks.style.opacity = '0';
          setTimeout(function () { thanks.textContent = ''; thanks.style.opacity = '1'; }, 500);
        }, 3200);
      } else {
        thanks.textContent = '';
      }
    }
  }

  function handleShare(btn) {
    const postId = btn.getAttribute('data-post');
    const url    = window.location.href.split('#')[0] + (postId ? '#' + postId : '');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Link copied!';
        btn.classList.add('copied');
        setTimeout(function () { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2200);
      });
    }
  }

  // Init reactions for all posts
  allPosts.forEach(initRx);

});
