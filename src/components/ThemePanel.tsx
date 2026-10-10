import { useEffect, useRef, useState } from 'react';
import { type Look, LOOKS, PALETTE, useSite } from '../site';

// how each look is sketched in its tile: corner radius, border strength, how "today" is marked
const SKETCH: Record<Look, { r: number; line: number; today: 'dot' | 'bar' | 'fill'; header?: boolean }> = {
  default: { r: 6, line: 14, today: 'fill' },
  material: { r: 10, line: 8, today: 'dot' },
  fluent: { r: 2, line: 24, today: 'bar', header: true },
  tailwind: { r: 6, line: 14, today: 'dot' },
  minimal: { r: 8, line: 5, today: 'dot' },
  classic: { r: 2, line: 32, today: 'fill', header: true },
};

// the radius each look uses in the library, shown as the slider's starting point
const LIB_RADIUS: Record<Look, number> = { default: 6, material: 14, fluent: 4, tailwind: 8, minimal: 10, classic: 3 };

function Tile({ look, accent }: { look: Look; accent: string }) {
  const k = SKETCH[look];
  const cells = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      className="grid grid-cols-7 overflow-hidden bg-white/[0.04]"
      style={{ borderRadius: k.r, border: `1px solid color-mix(in srgb, var(--color-white) ${k.line}%, transparent)` }}
      aria-hidden="true"
    >
      {k.header &&
        Array.from({ length: 7 }, (_, i) => <span key={`h${i}`} className="h-1.5 bg-white/15" />)}
      {cells.map(i => (
        <span
          key={i}
          className="relative h-3.5"
          style={{
            borderRight: i % 7 === 6 ? 0 : `1px solid color-mix(in srgb, var(--color-white) ${k.line}%, transparent)`,
            borderBottom: i < 7 ? `1px solid color-mix(in srgb, var(--color-white) ${k.line}%, transparent)` : 0,
            background: i === 9 && k.today === 'fill' ? `color-mix(in srgb, ${accent} 35%, transparent)` : undefined,
            boxShadow: i === 9 && k.today === 'bar' ? `inset 0 2px 0 ${accent}` : undefined,
          }}
        >
          {i === 9 && k.today === 'dot' && (
            <i className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          )}
          {i === 2 && <i className="absolute inset-x-0.5 bottom-0.5 h-1 rounded-sm" style={{ background: accent, opacity: 0.85 }} />}
        </span>
      ))}
    </div>
  );
}

/** Header control: a popover to pick the design language and its palette. Drives the calendars and the site colours. */
export default function ThemePanel() {
  const { look, setLook, palette, setPalette, radius, setRadius } = useSite();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const palettes = LOOKS[look].palettes as readonly string[];
  const current = look !== 'default' && palette ? PALETTE[palette]?.a : undefined;

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-white/10"
      >
        <span
          className="h-3.5 w-3.5 rounded-full ring-2 ring-white/30"
          style={{ background: current ?? 'conic-gradient(#d9703f, #5f8a73, #6366f1, #d9703f)' }}
        />
        Theme
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Theme"
          className="absolute right-0 top-full z-50 mt-2 w-[22.5rem] rounded-2xl border border-white/15 bg-[#1b1b1b] p-4 text-white shadow-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Style</p>
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {(Object.keys(LOOKS) as Look[]).map(k => {
              const on = k === look;
              const base = LOOKS[k].base;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLook(k)}
                  className={`rounded-xl border p-1.5 text-left transition-colors ${
                    on ? 'border-white/60 bg-white/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <Tile look={k} accent={(base && PALETTE[base]?.a) || '#4096ff'} />
                  <span className="mt-1.5 block px-0.5 text-xs font-medium">{LOOKS[k].label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50">Palette</p>
          {palettes.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Palette">
              {palettes.map(p => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={palette === p}
                  onClick={() => setPalette(p)}
                  className={`flex items-center gap-1.5 rounded-full border py-1 pl-1.5 pr-3 text-xs font-medium capitalize ${
                    palette === p ? 'border-white/60 bg-white/10' : 'border-white/15 hover:bg-white/5'
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: PALETTE[p]?.a }} />
                  {p}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-white/50">{look === 'default' ? 'The original site colours.' : 'This style has a single palette.'}</p>
          )}
          <label className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/50">
            Corner radius
            <span className="font-medium normal-case tracking-normal text-white/70">{radius ?? LIB_RADIUS[look]}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={16}
            value={radius ?? LIB_RADIUS[look]}
            onChange={e => setRadius(Number(e.target.value))}
            aria-label="Corner radius"
            className="mt-2 w-full"
          />
          <p className="mt-4 text-xs text-white/40">Changes every calendar and the colours of this site.</p>
        </div>
      )}
    </div>
  );
}
