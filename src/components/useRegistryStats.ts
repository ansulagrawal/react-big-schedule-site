import { useEffect, useState } from 'react';

export interface RegistryStats {
  downloads?: number;
  stars?: number;
  version?: string;
}

/** Live numbers from the public npm and GitHub APIs; every field stays undefined if a request fails. */
export function useRegistryStats(): RegistryStats {
  const [stats, setStats] = useState<RegistryStats>({});
  useEffect(() => {
    const ctrl = new AbortController();
    const get = <T,>(url: string) => fetch(url, { signal: ctrl.signal }).then(r => (r.ok ? (r.json() as Promise<T>) : Promise.reject(r.status)));
    const set = (patch: RegistryStats) => setStats(s => ({ ...s, ...patch }));
    get<{ downloads: number }>('https://api.npmjs.org/downloads/point/last-month/react-big-schedule')
      .then(d => set({ downloads: d.downloads }))
      .catch(() => undefined);
    get<{ version: string }>('https://registry.npmjs.org/react-big-schedule/latest')
      .then(d => set({ version: d.version }))
      .catch(() => undefined);
    get<{ stargazers_count: number }>('https://api.github.com/repos/ansulagrawal/react-big-schedule')
      .then(d => set({ stars: d.stargazers_count }))
      .catch(() => undefined);
    return () => ctrl.abort();
  }, []);
  return stats;
}

export const compact = (n?: number) =>
  n === undefined ? '—' : new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
