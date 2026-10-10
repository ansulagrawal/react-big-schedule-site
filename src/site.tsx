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

export const SWATCH: Record<string, string> = {
  blue: '#1677ff', green: '#16a34a', purple: '#6750a4', red: '#dc2626', amber: '#d97706',
  emerald: '#059669', indigo: '#4f46e5', rose: '#e11d48', classic: '#3788d8',
};

interface Site {
  look: Look;
  palette?: string;
  setLook: (l: Look) => void;
  setPalette: (p: string) => void;
  /** Theme of the calendars and timelines only; the page itself stays dark. */
  theme: CalTheme;
  setTheme: (t: CalTheme) => void;
  accent?: string;
  setAccent: (c?: string) => void;
  radius: number;
  setRadius: (r: number) => void;
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
  const [accent, setAccent] = useState<string | undefined>();
  const [radius, setRadius] = useState(6);
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
      setLook: (look: Look) => setLp({ look }),
      setPalette: (palette: string) => setLp(v => ({ ...v, palette })),
      accent,
      setAccent,
      radius,
      setRadius,
    }),
    [theme, lp, accent, radius]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): Site {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSite must be used inside <SiteProvider>');
  return v;
}
