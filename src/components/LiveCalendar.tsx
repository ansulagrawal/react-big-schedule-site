import { useState } from 'react';
import { Calendar, type CalendarEvent, type CalendarViewName } from 'react-big-schedule';
import { makeEvents } from '../sample';

const THEMES = ['light', 'dark', 'classic'] as const;
type Theme = (typeof THEMES)[number];

const VIEWS: CalendarViewName[] = ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek', 'multiMonthYear'];

export default function LiveCalendar({
  height = 640,
  initialView = 'dayGridMonth',
  showThemes = true,
}: {
  height?: number;
  initialView?: CalendarViewName;
  showThemes?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>('light');
  const [events, setEvents] = useState<CalendarEvent[]>(makeEvents);
  const [log, setLog] = useState('Drag, resize, click or select something');
  const patch = (next: CalendarEvent) => setEvents(list => list.map(e => (e.id === next.id ? next : e)));

  return (
    <div className={`rounded-2xl border border-slate-200 p-3 shadow-sm ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        {showThemes &&
          THEMES.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`rounded-full border px-3 py-1 capitalize ${
                theme === t ? 'border-brand bg-brand text-white' : 'border-slate-300 bg-white text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        <span className={`ml-auto truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{log}</span>
      </div>
      <Calendar
        theme={theme}
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
