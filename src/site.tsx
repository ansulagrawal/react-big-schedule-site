import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type CalTheme = 'dark' | 'light';

/** The design languages and palettes the library ships (css/style.css); labels follow the look each one is modelled on. */
export const LOOKS = {
  default: { label: 'Default', palettes: [] as string[], base: '' },
  material: { label: 'Material', palettes: ['blue', 'green', 'purple', 'red', 'amber'], base: 'purple' },
  fluent: { label: 'Fluent', palettes: ['blue', 'green', 'purple', 'red'], base: 'blue' },
  tailwind: { label: 'Tailwind', palettes: ['amber', 'emerald', 'indigo', 'rose'], base: 'indigo' },
  minimal: { label: 'Minimal', palettes: ['blue', 'green', 'purple', 'red'], base: 'red' },
  classic: { label: 'Classic', palettes: ['classic'], base: 'classic' },
} as const;
export type Look = keyof typeof LOOKS;

/** Main colour of each palette (matches the library's css) and the secondary used for the page glows. */
export const PALETTE: Record<string, { a: string; b: string }> = {
  blue: { a: '#1677ff', b: '#06b6d4' },
  green: { a: '#15803d', b: '#14b8a6' },
  purple: { a: '#6750a4', b: '#ec4899' },
  red: { a: '#dc2626', b: '#f97316' },
  amber: { a: '#b45309', b: '#f43f5e' },
  emerald: { a: '#047857', b: '#0ea5e9' },
  indigo: { a: '#4f46e5', b: '#d946ef' },
  rose: { a: '#e11d48', b: '#f59e0b' },
  classic: { a: '#3788d8', b: '#f59e0b' },
};

interface Site {
  look: Look;
  palette?: string;
  setLook: (l: Look) => void;
  setPalette: (p: string) => void;
  /** Theme of the calendars and timelines only; the page itself stays dark. */
  theme: CalTheme;
  setTheme: (t: CalTheme) => void;
  /** Corner radius override in px; undefined lets the chosen look decide. */
  radius?: number;
  setRadius: (r?: number) => void;
}

const KEY = 'rbs-site-calendar-theme';
const LOOK_KEY = 'rbs-site-calendar-look';

const read = (): CalTheme => {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const readLook = (): { look: Look; palette?: string } => {
  try {
    const [l, p] = (localStorage.getItem(LOOK_KEY) ?? '').split('/');
    if (l && l in LOOKS) return { look: l as Look, palette: p || undefined };
  } catch {
    // storage can be blocked
  }
  return { look: 'default' };
};

const Ctx = createContext<Site | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CalTheme>(read);
  const [lp, setLp] = useState(readLook);
  const [radius, setRadius] = useState<number | undefined>();
  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // storage can be blocked
    }
  }, [theme]);
  useEffect(() => {
    try {
      localStorage.setItem(LOOK_KEY, `${lp.look}/${lp.palette ?? ''}`);
    } catch {
      // storage can be blocked
    }
  }, [lp]);
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      look: lp.look,
      palette: lp.palette ?? (LOOKS[lp.look].base || undefined),
      setLook: (look: Look) => {
        setLp({ look });
        setRadius(undefined);
      },
      setPalette: (palette: string) => setLp(v => ({ ...v, palette })),
      radius,
      setRadius,
    }),
    [theme, lp, radius]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): Site {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSite must be used inside <SiteProvider>');
  return v;
}
