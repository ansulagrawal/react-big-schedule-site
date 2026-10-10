import dayjs from 'dayjs';
import { useState } from 'react';
import { DemoData, Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';
import LiveCalendar from '../components/LiveCalendar';

const DndScheduler = wrapperFun(Scheduler);

function make() {
  const data = new SchedulerData(dayjs('2022-12-22'), ViewType.Week, false, false, { theme: 'light' } as never);
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
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Demos</h1>
        <p className="mt-2 text-slate-600">Everything below is the real library running live. Drag events around.</p>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Calendar</h2>
        <LiveCalendar height={700} />
      </section>
      <section>
        <h2 className="mb-1 text-2xl font-semibold">Resource timeline</h2>
        <p className="mb-4 text-sm text-slate-600">A paid feature elsewhere, free here.</p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 p-3">
          <Timeline />
        </div>
      </section>
    </div>
  );
}
