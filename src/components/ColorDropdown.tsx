import { useEffect, useId, useRef, useState } from 'react';

export const COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Orange', value: '#e8814f' },
  { name: 'Sage', value: '#6fa088' },
  { name: 'Crimson', value: '#a3202c' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Teal', value: '#14b8a6' },
] as const;

export default function ColorDropdown({ value, onChange }: { value?: string; onChange: (value?: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = COLORS.find(c => c.value === value) ?? COLORS[0];

  useEffect(() => {
    if (!open) return undefined;
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const choose = (i: number) => {
    onChange(COLORS[i]?.value);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive(a => Math.min(a + 1, COLORS.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(active);
    }
  };

  return (
    <div ref={root} className="relative" onKeyDown={onKey}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setActive(Math.max(0, COLORS.indexOf(selected)));
          setOpen(o => !o);
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
      >
        <span className="h-4 w-4 rounded-full border border-white/30" style={{ background: selected.value ?? 'var(--rbs-accent, #1677ff)' }} />
        {selected.name}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <ul
          id={id}
          role="listbox"
          aria-label="Accent color"
          className="absolute left-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/15 bg-[#1b1b1b] py-1 text-sm text-white shadow-2xl"
        >
          {COLORS.map((c, i) => (
            <li key={c.name} role="option" aria-selected={c.value === value}>
              <button
                type="button"
                onClick={() => choose(i)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${i === active ? 'bg-white/10' : ''}`}
              >
                <span className="h-4 w-4 rounded-full border border-white/30" style={{ background: c.value ?? 'conic-gradient(#4f46e5, #e8814f, #6fa088, #4f46e5)' }} />
                <span className="flex-1">{c.name}</span>
                {c.value === value && <span aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
