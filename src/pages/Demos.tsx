import dayjs from 'dayjs';
import { useState } from 'react';
import { DemoData, Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';
import LiveCalendar from '../components/LiveCalendar';

const DndScheduler = wrapperFun(Scheduler);

function make() {
  const data = new SchedulerData(dayjs(), ViewType.Week, false, false, { theme: 'default' });
  data.setResources(DemoData.resources);
  data.setEvents(DemoData.events);
  return data;
}

function Timeline() {
  const [data, setData] = useState(make);
  const refresh = (next: SchedulerData) => setData(Object.assign(Object.create(Object.getPrototypeOf(next)), next));
  return (
    <DndScheduler
      schedulerData={data}
      prevClick={d => {
        d.prev();
        d.setEvents(DemoData.events);
        refresh(d);
      }}
      nextClick={d => {
        d.next();
        d.setEvents(DemoData.events);
        refresh(d);
      }}
      onSelectDate={(d, date) => {
        d.setDate(date);
        d.setEvents(DemoData.events);
        refresh(d);
      }}
      onViewChange={(d, view) => {
        d.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        d.setEvents(DemoData.events);
        refresh(d);
      }}
    />
  );
}

export default function Demos() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-14">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Demos</h1>
        <p className="mt-3 text-white/65">Everything below is the real library running live. Drag events around.</p>
      </header>
      <section>
        <h2 className="mb-5 text-2xl font-bold">Calendar</h2>
        <LiveCalendar height={720} />
      </section>
      <section>
        <h2 className="text-2xl font-bold">Resource timeline</h2>
        <p className="mb-5 mt-1 text-sm text-white/55">A paid feature elsewhere, free here.</p>
        <div className="card overflow-hidden p-4">
          <Timeline />
        </div>
      </section>
    </div>
  );
}
