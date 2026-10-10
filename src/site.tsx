import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type CalTheme = 'dark' | 'light';

interface Site {
  /** Theme of the calendars and timelines only; the page itself stays dark. */
  theme: CalTheme;
  setTheme: (t: CalTheme) => void;
  accent?: string;
  setAccent: (c?: string) => void;
  radius: number;
  setRadius: (r: number) => void;
}

const KEY = 'rbs-site-calendar-theme';

const read = (): CalTheme => {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const Ctx = createContext<Site | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CalTheme>(read);
  const [accent, setAccent] = useState<string | undefined>();
  const [radius, setRadius] = useState(6);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // storage can be blocked
    }
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme, accent, setAccent, radius, setRadius }), [theme, accent, radius]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): Site {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSite must be used inside <SiteProvider>');
  return v;
}
