// A tiny tokenizer (no dependency) for the snippets on this site: JS/TS/JSX, CSS, shell and JSON.
// One pass per language, first alternative wins. Colours live in styles.css as .tk-<kind>.
export type Kind = 'comment' | 'string' | 'tag' | 'keyword' | 'number' | 'attr' | 'fn' | 'type' | 'prop';

const JS =
  /(?<comment>\/\/.*|\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(?<tag>(?<![\w$])<\/?[A-Za-z][\w.]*(?=[\s>/]))|(?<keyword>\b(?:import|from|export|default|const|let|var|function|return|if|else|new|type|interface|as|async|await|class|extends|true|false|null|undefined)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<attr>[A-Za-z_][\w-]*(?==))|(?<fn>[A-Za-z_$][\w$]*(?=\())|(?<type>\b[A-Z][\w$]*)/g;

const CSS =
  /(?<comment>\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|(?<keyword>@[\w-]+)|(?<prop>--[\w-]+|[\w-]+(?=\s*:(?!:)))|(?<number>#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em|%|vh|vw|s|ms|deg)?\b)|(?<type>[^{};\n]+(?=\s*\{))/g;

const SH =
  /(?<comment>(?:^|(?<=\s))#.*)|(?<string>'[^'\n]*'|"(?:\\.|[^"\\\n])*")|(?<attr>(?<=\s)--?[A-Za-z][\w-]*)|(?<fn>^\s*(?:\$ )?(?:npm|npx|yarn|pnpm|bun|bunx|git|node|cd|curl|mkdir)\b)|(?<number>\b\d+(?:\.\d+)*\b)/gm;

const JSON_ =
  /(?<prop>"(?:\\.|[^"\\\n])*"(?=\s*:))|(?<string>"(?:\\.|[^"\\\n])*")|(?<number>-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(?<keyword>\b(?:true|false|null)\b)/g;

const LANGS: Record<string, RegExp> = {
  js: JS, jsx: JS, ts: JS, tsx: JS, javascript: JS, typescript: JS, html: JS, vue: JS,
  css: CSS, scss: CSS,
  sh: SH, bash: SH, shell: SH, zsh: SH, terminal: SH,
  json: JSON_,
};

export type Token = [text: string, kind?: Kind];

export function tokenize(src: string, lang = 'tsx'): Token[] {
  const re = LANGS[lang.toLowerCase()] ?? JS;
  const out: Token[] = [];
  let last = 0;
  for (const m of src.matchAll(re)) {
    const kind = Object.entries(m.groups ?? {}).find(([, v]) => v !== undefined)?.[0] as Kind | undefined;
    if (m[0] === '') continue;
    if (m.index > last) out.push([src.slice(last, m.index)]);
    out.push([m[0], kind]);
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push([src.slice(last)]);
  return out;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Highlighted HTML (for the markdown reference). */
export const highlightHtml = (src: string, lang?: string) =>
  tokenize(src, lang)
    .map(([t, k]) => (k ? `<span class="tk-${k}">${esc(t)}</span>` : esc(t)))
    .join('');
