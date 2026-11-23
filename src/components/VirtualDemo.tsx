import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import type { Resource, SchedulerEvent } from 'react-big-schedule';
import { ViewType } from 'react-big-schedule';
import type { LookProps } from './LiveCalendar';
import TimelineDemo from './TimelineDemo';

const ROOMS = 1000;
const TOTAL = 10000;
const TITLES = [
  'Stand-up',
  'Design review',
  'Deep work',
  'Customer call',
  'Planning',
  'Interview',
  'Workshop',
  '1:1',
  'Demo',
  'Onboarding',
];

const resources: Resource[] = Array.from({ length: ROOMS }, (_, i) => ({
  id: `v${i}`,
  name: `Room ${String(i + 1).padStart(4, '0')}`,
}));

// 10,000 long meetings and shifts spread over the current work week, 10 per room
const events: SchedulerEvent[] = (() => {
  const week = dayjs().startOf('week').add(1, 'day');
  return Array.from({ length: TOTAL }, (_, i) => {
    const start = week.add((i * 7 + Math.floor(i / ROOMS)) % 5, 'day').add((i * 5) % 7, 'hour');
    return {
      id: 10000 + i,
      resourceId: `v${i % ROOMS}`,
      title: TITLES[i % TITLES.length] as string,
      start: start.format('YYYY-MM-DD HH:mm:ss'),
      end: start.add(12 + (i % 3) * 4, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    };
  });
})();

const fmt = (n: number) => n.toLocaleString('en-US');

/** 10,000 events over 1,000 rooms, with a live count of what is actually mounted in the DOM. */
export default function VirtualDemo(look: LookProps) {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState({ events: 0, rows: 0 });

  useEffect(() => {
    const count = () => {
      const el = root.current;
      if (!el) return;
      const next = {
        events: el.querySelectorAll('.event-container > *').length,
        rows: el.querySelectorAll('.scheduler-content-table tr').length,
      };
      setMounted(p => (p.events === next.events && p.rows === next.rows ? p : next));
    };
    count();
    const t = setInterval(count, 300);
    return () => clearInterval(t);
  }, []);

  const stat = (value: string, label: string, accent?: boolean) => (
    <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div
        className={`text-2xl font-extrabold tracking-tight tabular-nums ${accent ? 'text-emerald-300' : 'text-white'}`}
      >
        {value}
      </div>
      <div className="text-xs text-white/55">{label}</div>
    </div>
  );

  return (
    <div ref={root}>
      <div className="flex flex-wrap gap-3 border-b border-white/10 bg-panel p-3.5">
        {stat(fmt(TOTAL), 'events loaded')}
        {stat(fmt(ROOMS), 'rooms (rows)')}
        {stat(fmt(mounted.events), 'events mounted right now', true)}
        {stat(`${mounted.rows} / ${fmt(ROOMS)}`, 'rows mounted', true)}
      </div>
      <TimelineDemo
        {...look}
        viewType={ViewType.Week}
        resources={resources}
        events={events}
        config={{ schedulerContentHeight: '560px', displayWeekend: false, dayCellWidth: 160 }}
      />
      <p className="px-4 pb-3 text-xs text-white/50">
        Scroll down: rows and events mount and unmount as they enter the viewport, so the page stays fast.
      </p>
    </div>
  );
}
