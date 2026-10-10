import Logo from './Logo';

const GH = 'https://github.com/ansulagrawal/react-big-schedule';

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: 'Product',
    links: [
      ['Demos', '#/demos'],
      ['Docs', '#/docs'],
      ['Pricing', '#/pricing'],
      ['Compare', '#/#compare'],
      ['Roadmap', '#/#roadmap'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Getting started', '#/docs'],
      ['Upgrade to v9', '#/docs'],
      ['Changelog', `${GH}/releases`],
      ['npm package', 'https://www.npmjs.com/package/react-big-schedule'],
      ['Classic examples', 'https://react-big-schedule.vercel.app'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['GitHub', GH],
      ['Issues', `${GH}/issues`],
      ['Discussions', `${GH}/discussions`],
      ['Contributing', `${GH}/blob/master/CONTRIBUTING.md`],
      ['Code of conduct', `${GH}/blob/master/CODE_OF_CONDUCT.md`],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['MIT license', `${GH}/blob/master/LICENSE`],
      ['Security policy', `${GH}/blob/master/SECURITY.md`],
      ['Pro licence', '#/pricing'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            The free React calendar and resource timeline. MIT licensed, TypeScript first, themed with CSS variables.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={GH} aria-label="GitHub" className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.6 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 0z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/react-big-schedule"
              aria-label="npm"
              className="rounded-full border border-white/15 px-2.5 py-1.5 text-xs font-bold text-white/70 hover:text-white"
            >
              npm
            </a>
          </div>
        </div>
        {columns.map(col => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">{col.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/70 hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-white/45">
          <span>© {new Date().getFullYear()} React Big Schedule. Released under the MIT License.</span>
          <span>Created and maintained by Ansul Agrawal and contributors · Built with TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
