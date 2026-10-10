import { useState } from 'react';

export default function Code({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-left">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/50">
        <span>{title ?? 'tsx'}</span>
        <button type="button" onClick={copy} className="rounded px-2 py-0.5 hover:bg-white/10 hover:text-white">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}
