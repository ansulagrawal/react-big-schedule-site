import { marked } from 'marked';
import { highlightHtml } from '../highlight';
import reference from '../../content/reference.md?raw';

const slug = (s: string) => s.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// the detailed Scheduler API: from "Use and Setup" on, without the "run the examples locally" steps
const body = reference.slice(reference.indexOf('## Use and Setup')).replace(/### Run examples locally[\s\S]*?(?=\n# API)/, '');

interface Head {
  type: 'heading';
  depth: number;
  text: string;
  id?: string;
  title?: string;
}

// "SchedulerData.config(See the [config file](https://...) for details)" -> "SchedulerData.config"
const titleOf = (raw: string) => raw.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/`/g, '').replace(/\(.*$/, '').trim();

// one pass assigns every heading its id, so the table of contents and the rendered headings always agree
const tokens = marked.lexer(body);
const used = new Map<string, number>();
marked.walkTokens(tokens, t => {
  if (t.type !== 'heading') return;
  const h = t as Head;
  h.title = titleOf(h.text);
  const base = `ref-${slug(h.title) || 'section'}`;
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  h.id = n ? `${base}-${n}` : base;
});

marked.use({
  renderer: {
    code({ text, lang }) {
      const l = (lang ?? '').split(/\s/)[0] || 'js';
      return `<pre><code class="language-${l}">${highlightHtml(text, l)}</code></pre>\n`;
    },
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      // shift one level down: the page itself owns h1/h2
      const level = Math.min(token.depth + 1, 6);
      return `<h${level} id="${(token as unknown as Head).id}">${text}</h${level}>\n`;
    },
  },
});

export const referenceHtml = marked.parser(tokens);

/** Headings for the table of contents (h2 and h3 of the reference). */
export const referenceToc = tokens.flatMap(t => {
  const h = t as Head;
  return t.type === 'heading' && h.depth <= 3 && h.id ? [{ id: h.id, title: h.title ?? h.text, depth: h.depth }] : [];
});
