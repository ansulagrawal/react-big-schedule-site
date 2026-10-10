import { useEffect, useMemo, useState } from 'react';
import Code from '../components/Code';
import { type Demo, demos, groups, type Status } from '../demos/registry';
import { useSite } from '../site';

const badge: Record<Status, [string, string] | null> = {
  free: null,
  pro: ['PRO', 'bg-amber-400/15 text-amber-300'],
  soon: ['SOON', 'bg-fuchsia-400/15 text-fuchsia-300'],
};

const readId = () => window.location.hash.split('/')[2] || demos[0]?.id || 'month';

function useDemoId() {
  const [id, setId] = useState(readId);
  useEffect(() => {
    const on = () => setId(readId());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return id;
}

function StatusChip({ status }: { status: Status }) {
  const b = badge[status];
  return b ? <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${b[1]}`}>{b[0]}</span> : null;
}

export default function Demos() {
  const id = useDemoId();
  const demo: Demo = demos.find(d => d.id === id) ?? (demos[0] as Demo);
  const { theme, look, palette, radius } = useSite();
  const [showCode, setShowCode] = useState(false);
  const live = Boolean(demo.render);
  const byGroup = useMemo(() => groups.map(g => [g, demos.filter(d => d.group === g)] as const), []);

  return (
    <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
      {/* Sidebar (a select on small screens) */}
      <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
        <select
          aria-label="Choose a demo"
          value={demo.id}
          onChange={e => {
            window.location.hash = `/demos/${e.target.value}`;
          }}
          className="w-full rounded-lg border border-white/20 bg-[#1b1b1b] px-3 py-2 text-sm lg:hidden"
        >
          {byGroup.map(([g, items]) => (
            <optgroup key={g} label={g}>
              {items.map(d => (
                <option key={d.id} value={d.id}>
                  {d.title}
                  {d.status === 'pro' ? ' (Pro)' : d.status === 'soon' ? ' (coming soon)' : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <nav aria-label="Demos" className="hidden space-y-6 lg:block">
          {byGroup.map(([g, items]) => (
            <div key={g}>
              <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{g}</h2>
              <ul className="space-y-0.5">
                {items.map(d => (
                  <li key={d.id}>
                    <a
                      href={`#/demos/${d.id}`}
                      aria-current={d.id === demo.id ? 'page' : undefined}
                      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                        d.id === demo.id ? 'bg-white/10 font-semibold text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{d.title}</span>
                      <StatusChip status={d.status} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <section className="min-w-0">
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight">{demo.title}</h1>
            <StatusChip status={demo.status} />
          </div>
          <p className="mt-2 max-w-2xl text-white/65">{demo.blurb}</p>
        </header>

        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <button
            type="button"
            hidden={!live}
            onClick={() => setShowCode(c => !c)}
            aria-expanded={showCode}
            className="ml-auto rounded-full border border-white/25 px-4 py-1.5 font-medium hover:bg-white/10"
          >
            {showCode ? 'Hide code' : 'Code'}
          </button>
        </div>

        {showCode && live && (
          <div className="mb-6">
            <Code>{demo.code}</Code>
          </div>
        )}

        {demo.render ? (
          <div key={demo.id} className="card overflow-hidden">
            {demo.render({ theme, look, palette, radius })}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <StatusChip status={demo.status} />
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{demo.note}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/50">
              {demo.status === 'pro'
                ? 'Pro is the paid tier of React Big Schedule. Pricing and release dates are not announced yet.'
                : 'This is on the roadmap and not shipped yet. The code above is the API we are aiming for and can change.'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <a href="#/pricing" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10">
                About Pro
              </a>
              <a
                href="https://github.com/ansulagrawal/react-big-schedule/discussions"
                className="rounded-full keep-white site-btn px-5 py-2 text-sm font-semibold"
              >
                Tell us you want it
              </a>
            </div>
            <div className="mx-auto mt-8 max-w-2xl text-left">
              <Code>{demo.code}</Code>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
