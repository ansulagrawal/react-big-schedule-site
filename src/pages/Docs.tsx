import Code from '../components/Code';

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-20 space-y-3">
    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    {children}
  </section>
);

export default function Docs() {
  return (
    <div className="mx-auto max-w-3xl space-y-14 px-4 py-14">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">Documentation</h1>
        <p className="mt-3 text-white/65">Supported from v9.0.0. Older versions are deprecated on npm.</p>
      </header>

      <Section id="install" title="Install">
        <Code>{`bun add react-big-schedule
# peers: react >=18, react-dom >=18`}</Code>
        <p className="text-white/65">Import the stylesheet once. It contains the tokens, three themes and the print styles.</p>
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
        <p className="text-white/65">Set <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">theme</code> to light, dark or classic, or override the CSS variables.</p>
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
    </div>
  );
}
