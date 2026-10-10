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
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center">
          <p className="mx-auto mb-4 w-fit rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-brand">
            v9 · MIT · React 18/19
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
            The React calendar and scheduler,{' '}
            <span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">resource timeline included</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Month, week, day, list and year views, drag and drop, themes and a free resource timeline. Free and open source.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="#/docs" className="rounded-lg bg-brand px-5 py-2.5 font-medium text-white shadow hover:opacity-90">
              Get started
            </a>
            <a href="#/demos" className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-50">
              View demos
            </a>
          </div>
          <div className="mx-auto mt-6 max-w-md">
            <Code>bun add react-big-schedule</Code>
          </div>
        </div>
      </section>

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
