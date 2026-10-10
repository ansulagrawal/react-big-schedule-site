import type { ReactNode } from 'react';
import Logo from './Logo';

const links = [
  ['#/demos', 'Demos'],
  ['#/docs', 'Docs'],
  ['#/pricing', 'Pricing'],
] as const;

const GITHUB = 'https://github.com/ansulagrawal/react-big-schedule';

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.2l2.1 4.5 4.9.6-3.6 3.4.9 4.9L8 12.2 3.7 14.6l.9-4.9L1 6.3l4.9-.6L8 1.2z" />
    </svg>
  );
}

export default function Layout({ route, children }: { route: string; children: ReactNode }) {
  const home = route === '/';
  const dark = home;
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="flex h-9 items-center justify-center bg-[#0f0f0f] px-4 text-xs text-white/90">
        <span>New in v9: TypeScript, no antd, a brand-new Calendar.</span>
        <a href="#/docs" className="ml-2 font-semibold text-[#ff8a4b] hover:underline">
          Read the upgrade guide →
        </a>
      </div>
      <header
        className={
          dark
            ? 'absolute inset-x-0 top-9 z-30 text-white'
            : 'relative z-30 border-b border-slate-200 bg-white'
        }
      >
        <nav className="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
          <a href="#/" aria-label="React Big Schedule home" className="justify-self-start">
            <Logo />
          </a>
          <div className="flex items-center gap-8 text-sm font-medium">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={
                  route === href.slice(1)
                    ? 'text-[#ff8a4b]'
                    : dark
                      ? 'text-white/85 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href={GITHUB}
            className={`inline-flex items-center gap-2 justify-self-end rounded-full border px-3.5 py-1.5 text-sm font-medium ${
              dark
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.500 7.500 0 0 1 4 0c1.500-1 2.200-.8 2.200-.8.400 1.100.2 1.900.1 2.100.5.600.8 1.300.8 2.100 0 3.100-1.900 3.800-3.600 4 .3.300.6.800.6 1.500v2.200c0 .2.100.5.600.4A8 8 0 0 0 8 0z" />
            </svg>
            <Star />
            <span>Star</span>
          </a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        MIT licensed core · Built with TypeScript · <a href="#/pricing" className="underline">Pro add-ons</a>
      </footer>
    </div>
  );
}
