import { normalizeText, tokenize } from '../utils/normalize';

interface Entry {
  k: 'post' | 'project';
  t: string;
  u: string;
  d: string;
  c: string;
  g: string[];
  n: string;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Highlight query words in text that is shown as-is (only exact, case-insensitive raw matches). */
function highlight(text: string, words: string[]): string {
  const safe = esc(text);
  const raw = words.filter((w) => w.length > 1).map((w) => esc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!raw.length) return safe;
  return safe.replace(new RegExp(`(${raw.join('|')})`, 'giu'), '<mark>$1</mark>');
}

export function initSearch() {
  const root = document.querySelector<HTMLElement>('[data-search-root]');
  if (!root) return;
  const input = root.querySelector<HTMLInputElement>('[data-search-input]')!;
  const clear = root.querySelector<HTMLButtonElement>('[data-search-clear]')!;
  const status = root.querySelector<HTMLElement>('[data-search-status]')!;
  const list = root.querySelector<HTMLOListElement>('[data-search-results]')!;
  const empty = root.querySelector<HTMLElement>('[data-search-empty]')!;
  const counts: string[] = JSON.parse(root.dataset.counts ?? '[]');
  const labels = JSON.parse(root.dataset.labels ?? '{}') as Record<string, string>;
  const indexUrl = root.dataset.index!;

  let entries: Entry[] | null = null;
  let loading: Promise<void> | null = null;
  let failed = false;

  function load(): Promise<void> {
    loading ??= fetch(indexUrl)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: Entry[]) => {
        entries = data;
      })
      .catch(() => {
        failed = true;
      });
    return loading;
  }

  async function run() {
    const q = input.value.trim();
    clear.dataset.visible = String(q.length > 0);
    const url = new URL(location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);

    const words = tokenize(q);
    list.replaceChildren();
    empty.hidden = true;
    if (!words.length) {
      status.textContent = labels.prompt ?? '';
      return;
    }
    await load();
    if (failed || !entries) {
      status.textContent = labels.loadError ?? '';
      return;
    }
    // Ignore stale runs if the input changed while the index was loading
    if (input.value.trim() !== q) return;

    const scored = entries
      .map((e) => {
        if (!words.every((w) => e.n.includes(w))) return null;
        const title = normalizeText(e.t);
        const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 0) + (normalizeText(e.g.join(' ')).includes(w) ? 1 : 0), 0);
        return { e, score };
      })
      .filter((x): x is { e: Entry; score: number } => x !== null)
      .sort((a, b) => b.score - a.score);

    const rawWords = q.split(/\s+/).filter(Boolean);
    for (const { e } of scored) {
      const li = document.createElement('li');
      li.className = 'result';
      li.innerHTML =
        `<span class="badge">${esc(e.k === 'post' ? (labels.article ?? '') : (labels.project ?? ''))}</span>` +
        `<h2><a href="${esc(e.u)}">${highlight(e.t, rawWords)}</a></h2>` +
        `<p>${highlight(e.d, rawWords)}</p>` +
        `<p>${esc([e.c, ...e.g].join(' · '))}</p>`;
      list.append(li);
    }
    const n = scored.length;
    status.textContent = counts[Math.min(n, counts.length - 1)] ?? String(n);
    empty.hidden = n > 0;
  }

  let timer: number | undefined;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = window.setTimeout(run, 150);
  });
  input.addEventListener('focus', () => void load(), { once: true });
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    void run();
  });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && input.value) {
      input.value = '';
      void run();
    }
  });

  const initial = new URL(location.href).searchParams.get('q');
  if (initial) {
    input.value = initial;
    void run();
  }
}
