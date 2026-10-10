import Code from '../components/Code';
import Compare from '../components/Compare';
import { compact, useRegistryStats } from '../components/useRegistryStats';
import LiveCalendar from '../components/LiveCalendar';

const Heading = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-site-ink">{eyebrow}</p>
    <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
    {sub && <p className="mt-4 text-white/65">{sub}</p>}
  </div>
);

const features: { title: string; text: string; code: string }[] = [
  {
    title: 'Every calendar view',
    text: 'Month, week, day, list and three year layouts from one component. Switch with the built-in toolbar or drive it yourself.',
    code: `import { Calendar } from 'react-big-schedule';
import 'react-big-schedule/dist/css/style.css';

<Calendar
  events={events}
  initialView="dayGridMonth"
  views={['dayGridMonth', 'timeGridWeek', 'listWeek', 'multiMonthYear']}
  editable
  selectable
  onEventDrop={({ event }) => save(event)}
/>`,
  },
  {
    title: 'Free resource timeline',
    text: 'Rows are people, rooms or machines. Drag to move across resources, resize, and group. A paid feature elsewhere.',
    code: `import { Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';

const DndScheduler = wrapperFun(Scheduler);
const data = new SchedulerData(new Date(), ViewType.Week);
data.setResources(resources);
data.setEvents(events);

<DndScheduler schedulerData={data} prevClick={prev} nextClick={next}
  onViewChange={change} onSelectDate={select} />`,
  },
  {
    title: 'Event sources',
    text: 'Pass an array, an async function or a JSON feed. Requests carry start and end, and stale ones are cancelled as you navigate.',
    code: `<Calendar
  events={async ({ start, end }, signal) => {
    const res = await fetch(\`/api/events?start=\${start.format()}&end=\${end.format()}\`, { signal });
    return res.json();
  }}
  eventSources={[{ url: '/holidays.json', color: '#6fa088' }]}
  onLoading={setLoading}
/>`,
  },
  {
    title: 'Recurring events',
    text: 'RFC 5545 RRULE strings or a simple weekly form, expanded only for the visible range, with exceptions.',
    code: `const events = [
  { id: 1, title: 'Standup', rrule: 'DTSTART:20261012T090000\\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR',
    exceptions: ['2026-10-14'] },
  { id: 2, title: 'Office hours', recurrence: { daysOfWeek: [2, 4], startTime: '14:00', endTime: '15:00' } },
];`,
  },
  {
    title: 'Time zones',
    text: 'Show everything in local time, UTC or any IANA zone. Callbacks, the today highlight and the now line follow the zone.',
    code: `<Calendar events={events} timeZone="Asia/Kolkata" nowIndicator businessHours />`,
  },
  {
    title: 'Themes in CSS variables',
    text: 'Default (transparent, follows your page), dark and light out of the box. Re-skin by overriding a few variables, no UI library, no build step.',
    code: `<Calendar theme="dark" events={events} />

.my-app {
  --rbs-accent: #e8814f;
  --rbs-radius: 10px;
  --rbs-surface: #101010;
}`,
  },
];

const missed: { title: string; text: string; status: string; tone: string }[] = [
  {
    title: 'Screen reader ready',
    text: 'ARIA grids, roving focus and full keyboard navigation are built in. A manual NVDA, JAWS and VoiceOver audit is next.',
    status: 'Built in · audit planned',
    tone: 'text-emerald-300',
  },
  {
    title: 'Heavy loads, odd shapes',
    text: 'Events are normalised once and bucketed per day, with memoised cells. Virtual rendering for 10,000 events on one day is on the roadmap.',
    status: 'Planned',
    tone: 'text-fuchsia-300',
  },
  {
    title: 'Print (on paper)',
    text: 'Yes, people still print calendars. A media-aware print stylesheet ships in the free core: no toolbar, no ink-wasting backgrounds, no clipped rows.',
    status: 'Built in · free',
    tone: 'text-emerald-300',
  },
  {
    title: 'The finishing touch',
    text: 'Pointer-based drag and drop works on touch screens today. Long-press tuning and competing scroll panes get a dedicated pass next.',
    status: 'Planned',
    tone: 'text-fuchsia-300',
  },
];

const roadmap: [string, string[]][] = [
  ['Shipped in v9', ['Calendar: month, week, day, list, year', 'Free resource timeline and vertical view', 'Event sources, recurrence, time zones', 'Themes, dark mode, print styles', 'TypeScript source, no UI library']],
  ['Next', ['Virtual rendering for 10k+ events', 'Touch long-press and scroll-pane tuning', 'Screen-reader audit and fixes', '“+N more” popover in time grid', 'Resource columns in <Calendar>']],
  ['Pro (coming soon)', ['iCal and CSV export, PDF export', 'Undo / redo and conflict engine', 'Nested resource tree, Gantt dependencies', 'Google and Outlook sync', 'Priority support']],
];

export default function Home() {
  const stats = useRegistryStats();
  return (
    <>
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 text-center">
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
                <span className="text-5xl font-bold text-site-ink">{n}</span>
                <span className="whitespace-pre-line text-left text-sm leading-tight text-white/85">{label}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/80">
            A free, open-source React calendar and resource timeline: month, week, day, list and year views, drag and drop, themes and
            TypeScript, with nothing to unlearn.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <a href="/docs" className="rounded-full keep-white site-btn px-6 py-3 font-semibold text-white">
              Get started
            </a>
            <a href="/demos" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              View demos
            </a>
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <Code title="terminal">bun add react-big-schedule</Code>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="card grid grid-cols-2 gap-6 p-6 text-center sm:grid-cols-4">
          {[
            [compact(stats.downloads), 'npm downloads / month'],
            [compact(stats.stars), 'GitHub stars'],
            [stats.version ? `v${stats.version}` : '—', 'latest on npm'],
            ['MIT', 'open-source licence'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-extrabold text-site-ink">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <Heading eyebrow="Live demo" title="Drag it, theme it, make it yours" sub="Everything on this page is the real library. Pick a theme and palette in the navbar, and change the corner radius." />
        <LiveCalendar height={680} />
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Heading eyebrow="Build with it" title="From install to calendar in minutes" sub="Each feature is a prop or a function. Here is the code for all of them." />
        <div className="grid gap-6 lg:grid-cols-2">
          {features.map(f => (
            <article key={f.title} className="card flex flex-col gap-4 p-6">
              <div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.text}</p>
              </div>
              <Code>{f.code}</Code>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4">
        <Heading eyebrow="The details" title="The things you (or your LLM) would have missed" sub="We are honest about what ships today and what is coming." />
        <div className="grid gap-6 sm:grid-cols-2">
          {missed.map(m => (
            <article key={m.title} className="card p-7">
              <p className={`text-xs font-semibold uppercase tracking-wider ${m.tone}`}>{m.status}</p>
              <h3 className="mt-2 text-xl font-bold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{m.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="compare" className="mx-auto mt-28 max-w-6xl scroll-mt-10 px-4">
        <Heading eyebrow="Compare" title="How it stacks up" sub="What other libraries offer, what we ship today, and what is still coming." />
        <Compare />
      </section>

      <section id="roadmap" className="mx-auto mt-28 max-w-6xl scroll-mt-10 px-4">
        <Heading eyebrow="Roadmap" title="What we shipped and what is next" />
        <div className="grid gap-6 md:grid-cols-3">
          {roadmap.map(([title, items]) => (
            <div key={title} className="card p-7">
              <h3 className="text-lg font-bold">{title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {items.map(i => (
                  <li key={i} className="flex gap-2">
                    <span className="text-site-ink">›</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-4xl px-4">
        <div className="card p-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Free forever at the core. Pro when you need more.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            The MIT-licensed core includes the resource timeline. Pro adds export, undo and redo, a conflict engine and priority support.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <a href="/docs" className="rounded-full keep-white site-btn px-6 py-3 font-semibold">
              Get started
            </a>
            <a href="/pricing" className="rounded-full border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">
              See pricing
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
