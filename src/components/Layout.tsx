import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import Footer from './Footer';
import Logo from './Logo';
import { PALETTE, useSite } from '../site';
import ThemePanel from './ThemePanel';
import ThemeSwitch from './ThemeSwitch';

const links = [
  ['#/demos', 'Demos'],
  ['#/docs', 'Docs'],
  ['#/pricing', 'Pricing'],
] as const;

const GITHUB = 'https://github.com/ansulagrawal/react-big-schedule';

export default function Layout({ route, children }: { route: string; children: ReactNode }) {
  // the bar is transparent at the very top and gets its background after a little scrolling
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const { theme, look, palette } = useSite();
  const colours = look !== 'default' && palette ? PALETTE[palette] : undefined;
  const base = `/${route.split('/')[1] ?? ''}`;

  return (
    <div
      className={`site-bg min-h-screen antialiased ${theme === 'light' ? 'site-light' : ''}`}
      style={
        colours
          ? ({ '--site-btn': colours.a, '--site-ga': colours.a, '--site-gb': colours.b, '--site-ink-dark': `color-mix(in srgb, ${colours.a} 55%, white)`, '--site-ink': theme === 'light' ? colours.a : `color-mix(in srgb, ${colours.a} 55%, white)` } as CSSProperties)
          : undefined
      }
    >
      <div className="flex h-9 items-center justify-center keep-white bg-black/50 px-4 text-xs text-white/90">
        <span>New in v9: TypeScript, no antd, a brand-new Calendar.</span>
        <a href="#/docs" className="ml-2 font-semibold text-[var(--site-ink-dark)] hover:underline">
          Read the upgrade guide →
        </a>
      </div>
      <header
        className={`sticky top-0 z-40 border-b text-white transition-[background-color,backdrop-filter,border-color] duration-200 ${
          scrolled ? 'border-white/10 bg-[#1a1a1a]/75 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto grid h-16 w-full max-w-[88rem] grid-cols-[1fr_auto_1fr] items-center px-4 lg:px-8">
          <a href="#/" aria-label="React Big Schedule home" className="justify-self-start">
            <Logo />
          </a>
          <div className="flex items-center gap-8 text-sm font-medium">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={base === href.slice(1) ? 'text-[var(--site-ink)]' : 'text-white/85 hover:text-white'}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 justify-self-end">
            <ThemePanel />
            <ThemeSwitch />
          <a
            href={GITHUB}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.6 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 0z" />
            </svg>
            <span>GitHub</span>
          </a>
          </div>
        </nav>
      </header>
      <div className="page-glows">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
