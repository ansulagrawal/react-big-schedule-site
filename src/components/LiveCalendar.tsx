import { type CSSProperties, useState } from 'react';
import { Calendar, type CalendarEvent, type CalendarViewName } from 'react-big-schedule';
import { makeEvents } from '../sample';
import ColorDropdown from './ColorDropdown';

const THEMES = ['light', 'dark', 'classic'] as const;
type Theme = (typeof THEMES)[number];

const VIEWS: CalendarViewName[] = ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek', 'multiMonthYear'];

export default function LiveCalendar({
  height = 640,
  initialView = 'dayGridMonth',
  customizer = true,
}: {
  height?: number;
  initialView?: CalendarViewName;
  customizer?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccent] = useState<string | undefined>();
  const [radius, setRadius] = useState(6);
  const [events, setEvents] = useState<CalendarEvent[]>(makeEvents);
  const [log, setLog] = useState('Drag, resize, click or select something');
  const patch = (next: CalendarEvent) => setEvents(list => list.map(e => (e.id === next.id ? next : e)));
  const panelDark = theme === 'dark';
  const style = { ...(accent ? { '--rbs-accent': accent } : {}), '--rbs-radius': `${radius}px` } as CSSProperties;

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm capitalize transition ${
      active
        ? 'border-transparent bg-white text-slate-900'
        : panelDark
          ? 'border-white/20 text-white/80 hover:bg-white/10'
          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <div
      className={`rounded-2xl border p-4 ${
        panelDark ? 'border-white/10 bg-[#101010] text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
      }`}
    >
      {customizer && (
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Theme</span>
            {THEMES.map(t => (
              <button key={t} type="button" onClick={() => setTheme(t)} className={chip(theme === t)}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Color</span>
            <ColorDropdown value={accent} onChange={setAccent} />
          </div>
          <label className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Radius</span>
            <input type="range" min={0} max={16} value={radius} onChange={e => setRadius(Number(e.target.value))} />
          </label>
          <span className="ml-auto truncate text-xs opacity-60">{log}</span>
        </div>
      )}
      <Calendar
        theme={theme}
        style={style}
        events={events}
        views={VIEWS}
        initialView={initialView}
        height={height}
        editable
        selectable
        nowIndicator
        businessHours
        dayMaxEvents
        onEventClick={i => setLog(`Clicked “${i.event.title}”`)}
        onDateClick={i => setLog(`Date click ${i.date.format('MMM D, HH:mm')}`)}
        onSelect={i => setLog(`Selected ${i.start.format('MMM D HH:mm')} → ${i.end.format('MMM D HH:mm')}`)}
        onEventDrop={i => {
          patch(i.event);
          setLog(`Moved “${i.event.title}”`);
        }}
        onEventResize={i => {
          patch(i.event);
          setLog(`Resized “${i.event.title}”`);
        }}
      />
    </div>
  );
}
