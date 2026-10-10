import { useSite } from '../site';

/** Light / dark switch for the calendars (dark by default). */
export default function ThemeSwitch() {
  const { theme, setTheme } = useSite();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark calendar theme"
      title={dark ? 'Calendars: dark (click for light)' : 'Calendars: light (click for dark)'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={`relative inline-flex h-8 w-[3.75rem] shrink-0 items-center rounded-full border transition-colors ${
        dark ? 'border-white/25 bg-white/10' : 'border-amber-300/60 bg-amber-200/30'
      }`}
    >
      <span className="pointer-events-none absolute left-2 text-amber-300" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3" /><path d="M8 0v2M8 14v2M0 8h2M14 8h2M2.3 2.3l1.4 1.4M12.3 12.3l1.4 1.4M2.3 13.7l1.4-1.4M12.3 3.7l1.4-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
      </span>
      <span className="pointer-events-none absolute right-2 text-sky-200" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 10.2A6 6 0 0 1 5.8 2.5a6 6 0 1 0 7.7 7.7z" /></svg>
      </span>
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${dark ? 'translate-x-[1.75rem]' : 'translate-x-0.5'}`}
      />
    </button>
  );
}
