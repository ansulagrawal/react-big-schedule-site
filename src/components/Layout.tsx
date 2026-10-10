import type { ReactNode } from 'react';
import Logo from './Logo';

const links = [
  ['#/demos', 'Demos'],
  ['#/docs', 'Docs'],
  ['#/pricing', 'Pricing'],
] as const;

export default function Layout({ route, children }: { route: string; children: ReactNode }) {
  const home = route === '/';
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <header
        className={
          home
            ? 'absolute inset-x-0 top-0 z-30 text-white'
            : 'sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur'
        }
      >
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#/" aria-label="Home">
            <Logo />
          </a>
          <div className="flex items-center gap-6 text-sm">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={route === href.slice(1)
                    ? 'font-semibold text-brand'
                    : home
                      ? 'text-white/85 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'}
              >
                {label}
              </a>
            ))}
            <a
              href="https://github.com/ansulagrawal/react-big-schedule"
              className={`rounded-full px-4 py-1.5 font-medium ${home ? 'bg-[#a3202c] text-white hover:bg-[#b9262f]' : 'border border-slate-300 hover:bg-slate-50'}`}
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        MIT licensed core · Built with TypeScript · <a href="#/pricing" className="underline">Pro add-ons</a>
      </footer>
    </div>
  );
}
