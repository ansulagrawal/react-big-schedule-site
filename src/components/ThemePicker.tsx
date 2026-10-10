import { LOOKS, type Look, SWATCH, useSite } from '../site';

/** Header control: pick the calendar design language and its colour palette. */
export default function ThemePicker() {
  const { look, setLook, palette, setPalette } = useSite();
  const palettes = LOOKS[look].palettes as readonly string[];
  return (
    <div className="flex items-center gap-2.5">
      <label className="flex items-center gap-1.5 text-xs text-white/60">
        <span className="hidden xl:inline">Theme</span>
        <select
          value={look}
          onChange={e => setLook(e.target.value as Look)}
          aria-label="Calendar theme"
          className="rounded-full border border-white/25 bg-transparent py-1.5 pl-3 pr-2 text-sm font-medium text-white hover:bg-white/10 [&>option]:bg-[#1b1b1b] [&>option]:text-white"
        >
          {(Object.keys(LOOKS) as Look[]).map(k => (
            <option key={k} value={k}>
              {LOOKS[k].label}
            </option>
          ))}
        </select>
      </label>
      {palettes.length > 1 && (
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Palette">
          {palettes.map(p => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={palette === p}
              aria-label={p}
              title={p}
              onClick={() => setPalette(p)}
              style={{ background: SWATCH[p] }}
              className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
                palette === p ? 'border-white ring-2 ring-white/40' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
