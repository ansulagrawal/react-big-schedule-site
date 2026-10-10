import { type CSSProperties, useEffect, useState } from 'react';
import { DemoData, Scheduler, SchedulerData, type SchedulerConfig, type SchedulerEvent, ViewType, wrapperFun } from 'react-big-schedule';
import type { LookProps } from './LiveCalendar';

const DndScheduler = wrapperFun(Scheduler);

const copyOf = (d: SchedulerData) => Object.assign(Object.create(Object.getPrototypeOf(d)), d) as SchedulerData;

/** The resource timeline / vertical resource view on the current week's demo data. */
export default function TimelineDemo({
  theme,
  look,
  palette,
  accent,
  radius = 6,
  viewType = ViewType.Week,
  config,
  events = DemoData.events,
}: LookProps & { viewType?: ViewType; config?: Partial<SchedulerConfig>; events?: SchedulerEvent[] }) {
  const [data, setData] = useState(() => {
    const d = new SchedulerData(new Date(), viewType, false, false, { theme, look, palette, ...config });
    d.setResources(DemoData.resources);
    d.setEvents(events);
    return d;
  });

  // theme is read from config on every render; keep it in sync with the page control
  useEffect(() => {
    data.config.theme = theme;
    data.config.look = look;
    data.config.palette = palette;
    setData(copyOf(data));
  }, [theme, look, palette]);

  const next = (d: SchedulerData) => {
    d.setEvents(events);
    setData(copyOf(d));
  };
  const style = { ...(accent ? { '--rbs-accent': accent } : {}), '--rbs-radius': `${radius}px` } as CSSProperties;

  return (
    <DndScheduler
      schedulerData={data}
      style={style}
      prevClick={d => {
        d.prev();
        next(d);
      }}
      nextClick={d => {
        d.next();
        next(d);
      }}
      onSelectDate={(d, date) => {
        d.setDate(date);
        next(d);
      }}
      onViewChange={(d, view) => {
        d.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        next(d);
      }}
    />
  );
}
