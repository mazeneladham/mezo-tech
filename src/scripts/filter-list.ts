/**
 * Client-side filtering for the blog and projects listings.
 * Works without any backend: every card is already in the HTML, and
 * this script only hides/shows cards. Without JavaScript all cards stay visible.
 *
 * Filters combine: keyword AND category AND every selected tag.
 * State is mirrored into the URL (?q=…&category=…&tag=a,b) so filtered views can be shared.
 */
import { tokenize } from '../utils/normalize';
import { ui, isLang, type Lang } from '../i18n/ui';

function setup(root: HTMLElement): void {
  const lang: Lang = isLang(root.dataset.lang) ? root.dataset.lang : 'en';
  const t = ui[lang].filters;
  const pageSize = Number(root.dataset.pageSize) || 9;

  const items = [...root.querySelectorAll<HTMLElement>('[data-filter-item]')];
  const input = root.querySelector<HTMLInputElement>('[data-filter-input]');
  const inputClear = root.querySelector<HTMLButtonElement>('[data-filter-input-clear]');
  const categoryButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-category]')];
  const tagButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-tag]')];
  const countEl = root.querySelector<HTMLElement>('[data-filter-count]');
  const emptyEl = root.querySelector<HTMLElement>('[data-filter-empty]');
  const moreEl = root.querySelector<HTMLElement>('[data-filter-more]');
  const moreBtn = moreEl?.querySelector<HTMLButtonElement>('button');
  const clearAll = root.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const resetButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter-clear], [data-filter-reset]')];

  const state = { q: '', category: '', tags: new Set<string>() };
  let limit = pageSize;

  // ---- read initial state from the URL ----
  const params = new URLSearchParams(window.location.search);
  state.q = params.get('q') ?? '';
  state.category = params.get('category') ?? '';
  (params.get('tag') ?? '')
    .split(',')
    .filter(Boolean)
    .forEach((x) => state.tags.add(x));
  // Ignore values that do not exist on this page
  if (!categoryButtons.some((b) => b.dataset.filterCategory === state.category)) state.category = '';
  for (const tag of [...state.tags]) {
    if (!tagButtons.some((b) => b.dataset.filterTag === tag)) state.tags.delete(tag);
  }
  if (input) input.value = state.q;

  function writeUrl(): void {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.category) p.set('category', state.category);
    if (state.tags.size) p.set('tag', [...state.tags].join(','));
    const qs = p.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
    window.history.replaceState(null, '', url);
  }

  function apply(): void {
    const tokens = tokenize(state.q);
    const matched = items.filter((el) => {
      const hay = el.dataset.search ?? '';
      if (tokens.some((tok) => !hay.includes(tok))) return false;
      if (state.category && el.dataset.category !== state.category) return false;
      if (state.tags.size) {
        const own = (el.dataset.tags ?? '').split(' ');
        for (const tag of state.tags) if (!own.includes(tag)) return false;
      }
      return true;
    });

    const visible = new Set(matched.slice(0, limit));
    items.forEach((el) => {
      el.hidden = !visible.has(el);
    });

    const active = Boolean(state.q || state.category || state.tags.size);
    categoryButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filterCategory === state.category)));
    tagButtons.forEach((b) => b.setAttribute('aria-pressed', String(state.tags.has(b.dataset.filterTag ?? ''))));
    if (inputClear) inputClear.dataset.visible = String(Boolean(state.q));
    if (clearAll) clearAll.hidden = !active;
    if (countEl) countEl.textContent = t.results(matched.length);
    if (emptyEl) emptyEl.hidden = matched.length > 0;
    if (moreEl) moreEl.hidden = matched.length <= limit;
    writeUrl();
  }

  // ---- events ----
  let timer: number | undefined;
  input?.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      state.q = input.value.trim();
      limit = pageSize;
      apply();
    }, 120);
  });
  inputClear?.addEventListener('click', () => {
    if (input) {
      input.value = '';
      input.focus();
    }
    state.q = '';
    limit = pageSize;
    apply();
  });
  categoryButtons.forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.filterCategory ?? '';
      state.category = state.category === id ? '' : id;
      limit = pageSize;
      apply();
    }),
  );
  tagButtons.forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.filterTag ?? '';
      if (state.tags.has(id)) state.tags.delete(id);
      else state.tags.add(id);
      limit = pageSize;
      apply();
    }),
  );
  resetButtons.forEach((b) =>
    b.addEventListener('click', () => {
      state.q = '';
      state.category = '';
      state.tags.clear();
      if (input) input.value = '';
      limit = pageSize;
      apply();
    }),
  );
  moreBtn?.addEventListener('click', () => {
    const before = limit;
    limit += pageSize;
    apply();
    // Move focus to the first newly revealed card
    const firstNew = items.filter((el) => !el.hidden)[before];
    firstNew?.querySelector<HTMLElement>('a')?.focus();
  });

  apply();
}

export function initFilters(): void {
  document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach(setup);
}
