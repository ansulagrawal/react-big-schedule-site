import { type CSSProperties, useState } from 'react';
import { Calendar, type CalendarEvent, type CalendarProps, type CalendarViewName } from 'react-big-schedule';
import { makeEvents } from '../sample';
import { useSite } from '../site';

export type Theme = 'default' | 'dark' | 'light';

const VIEWS: CalendarViewName[] = ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek', 'multiMonthYear'];

export interface LookProps {
  theme: Theme;
  look?: string;
  palette?: string;
  radius?: number;
}

/** The library Calendar with a themed look and a one-line activity log; used by the home page and every calendar demo. */
export function CalendarView({
  theme,
  look,
  palette,
  radius,
  height = 640,
  initialView = 'dayGridMonth',
  views = VIEWS,
  events: initialEvents,
  ...rest
}: LookProps & { height?: number; initialView?: CalendarViewName; views?: CalendarViewName[] } & Partial<
    Omit<CalendarProps, 'theme' | 'style' | 'height' | 'initialView' | 'views'>
  >) {
  const [events, setEvents] = useState<CalendarEvent[]>(() => (Array.isArray(initialEvents) ? initialEvents : makeEvents()));
  const [log, setLog] = useState('Drag, resize, click or select something');
  const patch = (next: CalendarEvent) => setEvents(list => list.map(e => (e.id === next.id ? next : e)));
  const style = (radius === undefined ? {} : { '--rbs-radius': `${radius}px` }) as CSSProperties;
  const dynamic = initialEvents !== undefined && !Array.isArray(initialEvents);
  return (
    <div>
      <Calendar
        editable
        selectable
        nowIndicator
        businessHours
        dayMaxEvents
        {...rest}
        theme={theme}
        look={look}
        palette={palette}
        style={style}
        events={dynamic ? initialEvents : events}
        views={views}
        initialView={initialView}
        height={height}
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
      <p className="mt-2 text-xs text-white/45">{log}</p>
    </div>
  );
}

export default function LiveCalendar({
  height = 640,
  initialView = 'dayGridMonth',
}: {
  height?: number;
  initialView?: CalendarViewName;
}) {
  // theme comes from the navbar switch; colour and radius are shared with the demos page
  const { theme, look, palette, radius } = useSite();

  return (
    <div
      className={`rounded-2xl border p-4 ${
        theme === 'light' ? 'border-[#e6e2da] bg-[#f3f0ea] text-slate-900' : 'border-white/10 bg-[#14161c] text-white'
      }`}
    >
      <CalendarView theme={theme} look={look} palette={palette} radius={radius} height={height} initialView={initialView} />
    </div>
  );
}
