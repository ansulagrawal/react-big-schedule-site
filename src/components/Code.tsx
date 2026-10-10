import { type ReactNode, useState } from 'react';
import { useSite } from '../site';

// One pass, first alternative wins. Small on purpose (JS/TSX/JSX + CSS-ish); no highlighter dependency.
const TOKEN =
  /(?<comment>\/\/.*|\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(?<tag>(?<![\w$])<\/?[A-Za-z][\w.]*(?=[\s>/]))|(?<keyword>\b(?:import|from|export|default|const|let|var|function|return|if|else|new|type|interface|as|async|await|true|false|null|undefined)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<attr>[A-Za-z_][\w-]*(?==))|(?<fn>[A-Za-z_$][\w$]*(?=\())|(?<type>\b[A-Z][\w$]*)/g;

const DARK: Record<string, string> = {
  comment: 'italic text-slate-500',
  string: 'text-emerald-300',
  tag: 'text-sky-300',
  keyword: 'text-violet-300',
  number: 'text-amber-300',
  attr: 'text-orange-300',
  fn: 'text-yellow-200',
  type: 'text-cyan-300',
};

const LIGHT: Record<string, string> = {
  comment: 'italic text-slate-500',
  string: 'text-emerald-700',
  tag: 'text-sky-700',
  keyword: 'text-violet-700',
  number: 'text-amber-700',
  attr: 'text-orange-700',
  fn: 'text-yellow-800',
  type: 'text-cyan-700',
};

function highlight(src: string, COLOR: Record<string, string>): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    const kind = Object.entries(m.groups ?? {}).find(([, v]) => v !== undefined)?.[0] ?? '';
    if (m.index > last) out.push(src.slice(last, m.index));
    out.push(
      <span key={m.index} className={COLOR[kind]}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  out.push(src.slice(last));
  return out;
}

export default function Code({ children, title }: { children: string; title?: string }) {
  const light = useSite().theme === 'light';
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 text-left ${light ? 'bg-[#fbfaf7] shadow-sm' : 'bg-[#111318]'}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/50">
        <span>{title ?? 'tsx'}</span>
        <button type="button" onClick={copy} className="rounded px-2 py-0.5 hover:bg-white/10 hover:text-white">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`overflow-x-auto p-4 text-[13px] leading-relaxed text-white/90 ${light ? '' : '[color-scheme:dark]'}`}>
        <code>{title === 'terminal' ? children : highlight(children, light ? LIGHT : DARK)}</code>
      </pre>
    </div>
  );
}
