import Code from '../components/Code';
import { referenceHtml, referenceToc } from './reference';

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-20 space-y-3">
    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    {children}
  </section>
);

const toc = [
  ['install', 'Install'],
  ['calendar', 'Calendar'],
  ['timeline', 'Resource timeline'],
  ['theming', 'Theming'],
  ['upgrade', 'Upgrading to 9'],
  ['ai', 'For AI assistants'],
] as const;

export default function Docs() {
  return (
    <div className="mx-auto grid max-w-352 gap-10 px-4 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <nav aria-label="On this page" className="space-y-1 text-sm">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="block rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-white">
              {label}
            </a>
          ))}
          <p className="px-3 pb-1 pt-5 text-xs font-semibold uppercase tracking-wider text-white/45">Scheduler API</p>
          {referenceToc.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block truncate rounded-lg py-1 text-white/60 hover:bg-white/5 hover:text-white ${h.depth === 2 ? 'px-3' : 'pl-6 pr-3 text-[13px]'}`}
            >
              {h.title}
            </a>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 max-w-3xl space-y-14">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Documentation</h1>
        <p className="mt-3 text-white/65">Supported from v9.0.0. Older versions are deprecated on npm.</p>
      </header>

      <Section id="install" title="Install">
        <Code>{`bun add react-big-schedule
# peers: react >=18, react-dom >=18`}</Code>
        <p className="text-white/65">Import the stylesheet once. It contains the tokens, the themes, looks, palettes and the print styles.</p>
        <Code>{`import 'react-big-schedule/dist/css/style.css';`}</Code>
      </Section>

      <Section id="calendar" title="Calendar">
        <Code>{`import { Calendar } from 'react-big-schedule';

<Calendar
  events={[{ id: 1, title: 'Standup', start: '2026-10-12T09:00', end: '2026-10-12T09:30' }]}
  initialView="dayGridMonth"
  views={['dayGridMonth', 'timeGridWeek', 'listWeek', 'multiMonthYear']}
  editable
  selectable
  onEventDrop={({ event }) => save(event)}
/>`}</Code>
        <p className="text-white/65">
          Views: dayGridMonth, dayGridWeek, dayGridDay, timeGridWeek, timeGridDay, listDay, listWeek, listMonth, listYear,
          multiMonthYear, multiMonthStack, multiMonthContinuous.
        </p>
      </Section>

      <Section id="timeline" title="Resource timeline">
        <Code>{`import { Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';

const DndScheduler = wrapperFun(Scheduler);
const data = new SchedulerData(new Date(), ViewType.Week);
data.setResources(resources);
data.setEvents(events);

<DndScheduler schedulerData={data} prevClick={...} nextClick={...} onViewChange={...} onSelectDate={...} />`}</Code>
      </Section>

      <Section id="theming" title="Theming">
        <p className="text-white/65">
          Three independent switches: <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">theme</code> (default, dark, light),{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">look</code> (material, fluent, tailwind, minimal, classic) and{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">palette</code> (blue, green, purple, red, amber, emerald, indigo, rose). Fine-tune with CSS variables.
        </p>
        <Code>{`<Calendar theme="dark" look="material" palette="purple" />`}</Code>
        <Code>{`.my-app {
  --rbs-accent: #7c3aed;
  --rbs-radius: 10px;
  --rbs-surface: #fffdf8;
}`}</Code>
      </Section>

      <Section id="upgrade" title="Upgrading to 9">
        <ul className="list-disc space-y-1 pl-5 text-white/65">
          <li>antd is no longer a dependency; the header, popovers and calendar picker are built in.</li>
          <li>The package is ESM-only and ships its own generated type declarations.</li>
          <li>Import the stylesheet from <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">react-big-schedule/dist/css/style.css</code>.</li>
        </ul>
      </Section>

      <Section id="ai" title="For AI assistants">
        <p className="text-white/65">
          Plain-text docs for LLMs: <a className="underline" href="/llms.txt">llms.txt</a> (index) and{' '}
          <a className="underline" href="/llms-full.txt">llms-full.txt</a> (the whole reference). There is also an agent skill:{' '}
          <a className="underline" href="/skills/react-big-schedule/SKILL.md">SKILL.md</a>. Save it as{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">.claude/skills/react-big-schedule/SKILL.md</code> and your coding agent will use the library correctly.
        </p>
      </Section>

      <section id="reference" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Scheduler API reference</h2>
        {/* trusted: built from our own content/reference.md */}
        <div className="md mt-4" dangerouslySetInnerHTML={{ __html: referenceHtml }} />
      </section>
      </div>
    </div>
  );
}
