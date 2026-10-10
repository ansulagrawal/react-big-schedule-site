import { useState } from 'react';
import { tokenize } from '../highlight';
import { useSite } from '../site';

export default function Code({ children, title, lang = 'tsx' }: { children: string; title?: string; lang?: string }) {
  const light = useSite().theme === 'light';
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 text-left ${light ? 'bg-[#f1eee7] shadow-sm' : 'bg-[#111318]'}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/50">
        <span>{title ?? lang}</span>
        <button type="button" onClick={copy} className="rounded px-2 py-0.5 hover:bg-white/10 hover:text-white">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`overflow-x-auto p-4 text-[13px] leading-relaxed text-white/90 ${light ? '' : 'scheme-dark'}`}>
        <code>
          {tokenize(children, title === 'terminal' ? 'sh' : lang).map(([t, k], i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static token list
            <span key={i} className={k && `tk-${k}`}>
              {t}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
