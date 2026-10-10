import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface Router {
  path: string;
  navigate: (to: string) => void;
}

const Ctx = createContext<Router>({ path: '/', navigate: () => undefined });

export const usePath = () => useContext(Ctx).path;
export const useNavigate = () => useContext(Ctx).navigate;

const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

/** History-API routing in ~40 lines: real URLs (indexable), and plain <a href="/x"> links are intercepted. `path` is given when rendering on the server. */
export function RouterProvider({ path: initial, children }: { path?: string; children: ReactNode }) {
  const [path, setPath] = useState(() => initial ?? clean(window.location.pathname));

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    history.pushState(null, '', url.pathname + url.search + url.hash);
    setPath(clean(url.pathname));
    // let the new page render, then jump to the #anchor (or the top)
    requestAnimationFrame(() => (url.hash && document.getElementById(url.hash.slice(1))?.scrollIntoView()) || (!url.hash && window.scrollTo(0, 0)));
  }, []);

  useEffect(() => {
    const onPop = () => setPath(clean(window.location.pathname));
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target || !href.startsWith('/') || href.startsWith('//')) return;
      e.preventDefault();
      navigate(href);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, [navigate]);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
