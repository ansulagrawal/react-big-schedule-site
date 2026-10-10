import LiveCalendar from '../components/LiveCalendar';
import Code from '../components/Code';

const features = [
  ['Every view you expect', 'Month, week, day, list, year grid, stacked and continuous, plus a free resource timeline and vertical resource view.'],
  ['Yours to style', 'CSS variables and three stock themes (light, dark, classic). No UI framework required, no antd.'],
  ['Drag, resize, select', 'Move and resize events, select ranges, create events, with a configurable drop preview.'],
  ['TypeScript first', 'Written in strict TypeScript; types are generated from the source, never hand-maintained.'],
  ['Fast by design', 'Events are normalised once, bucketed per day, and rendering is memoised per cell and column.'],
  ['Accessible', 'ARIA grids, roving focus, keyboard navigation, reduced-motion support and print styles.'],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero-mesh">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-36 text-center">
          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Crafting the Future of Calendars &amp; Scheduling
          </h1>
          <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-10">
            {[
              ['12', 'Views\nbuilt in'],
              ['3', 'Themes,\nyour tokens'],
              ['0', 'UI library\ndependencies'],
            ].map(([n, label], i) => (
              <div key={n + label} className={`flex items-center gap-3 ${i ? 'border-l border-white/30 pl-10' : ''}`}>
                <span className="text-5xl font-bold text-amber-100">{n}</span>
                <span className="whitespace-pre-line text-left text-sm leading-tight text-white/85">{label}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/80">
            A free, open-source React calendar and resource timeline: month, week, day, list and year views, drag and drop, themes
            and TypeScript, with nothing to unlearn.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <a href="#/docs" className="rounded-full bg-[#a3202c] px-6 py-3 font-semibold text-white hover:bg-[#b9262f]">
              Get started
            </a>
            <a href="#/demos" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              View demos
            </a>
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <Code>bun add react-big-schedule</Code>
          </div>
        </div>
      </section>

      <div className="h-10" />

      <section className="mx-auto max-w-6xl px-4">
        <LiveCalendar />
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight">Everything in the free core</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Need more?</h2>
        <p className="mt-3 text-slate-600">
          Pro adds iCal / CSV export, undo and redo, a conflict engine and priority support. Pricing is coming soon.
        </p>
        <a href="#/pricing" className="mt-6 inline-block rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-50">
          See what is planned
        </a>
      </section>
    </>
  );
}
