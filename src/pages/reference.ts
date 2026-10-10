import { marked } from 'marked';
import reference from '../../content/reference.md?raw';

const slug = (s: string) => s.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// the detailed Scheduler API: from "Use and Setup" on, without the "run the examples locally" steps
const body = reference.slice(reference.indexOf('## Use and Setup')).replace(/### Run examples locally[\s\S]*?(?=\n# API)/, '');

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      // shift one level down: the page itself owns h1/h2
      const level = Math.min(depth + 1, 6);
      return `<h${level} id="ref-${slug(text)}">${text}</h${level}>\n`;
    },
  },
});

export const referenceHtml = marked.parse(body, { async: false });

/** Headings for the table of contents (h2 and h3 of the reference). */
export const referenceToc = marked
  .lexer(body)
  .flatMap(t => (t.type === 'heading' && t.depth <= 3 ? [{ id: `ref-${slug(t.text)}`, title: t.text.replace(/\(.*$/, '').replace(/[`[\]]/g, '').trim(), depth: t.depth }] : []));
