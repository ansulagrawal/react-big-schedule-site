import dayjs from 'dayjs';
import { type ReactNode, useState } from 'react';
import { Calendar, type CalendarEvent, type SchedulerEvent, ViewType } from 'react-big-schedule';
import { CalendarView, type LookProps } from '../components/LiveCalendar';
import { SHADES } from '../sample';
import TimelineDemo from '../components/TimelineDemo';

export type Status = 'free' | 'pro' | 'soon';

export interface Demo {
  id: string;
  title: string;
  group: string;
  status: Status;
  /** One line shown under the title. */
  blurb: string;
  /** Live demo; omitted for features that are still being built. */
  render?: (look: LookProps) => ReactNode;
  code: string;
  /** Shown for pro / soon items. */
  note?: string;
}

const day = (offset: number, time: string) => dayjs().add(offset, 'day').format(`YYYY-MM-DD[T]${time}`);

function EventSourcesDemo(look: LookProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <p className="mb-2 h-5 text-xs text-white/55">{loading ? 'Loading events from the function source…' : 'Navigate to fetch another range'}</p>
      <CalendarView
        {...look}
        height={620}
        onLoading={setLoading}
        events={({ start, end }) =>
          new Promise<CalendarEvent[]>(resolve =>
            setTimeout(() => {
              const out: CalendarEvent[] = [];
              for (let d = start; d.isBefore(end); d = d.add(1, 'day')) {
                if (d.day() === 0 || d.day() === 6) continue;
                out.push({ id: d.format('YYYYMMDD'), title: `Report ${d.format('MMM D')}`, start: d.hour(10).format('YYYY-MM-DDTHH:mm'), end: d.hour(11).format('YYYY-MM-DDTHH:mm'), color: d.date() % 2 ? '#6366f1' : '#14b8a6' });
              }
              resolve(out);
            }, 600),
          )
        }
      />
    </div>
  );
}

function TimeZoneDemo(look: LookProps) {
  const [tz, setTz] = useState('UTC');
  const events: CalendarEvent[] = [
    { id: 1, title: 'Standup (10:00 UTC)', start: `${dayjs().format('YYYY-MM-DD')}T10:00:00Z`, end: `${dayjs().format('YYYY-MM-DD')}T10:30:00Z`, color: '#6366f1' },
    { id: 2, title: 'Release (15:00 UTC)', start: `${dayjs().format('YYYY-MM-DD')}T15:00:00Z`, end: `${dayjs().format('YYYY-MM-DD')}T16:30:00Z`, color: '#e11d48' },
  ];
  return (
    <div>
      <label className="mb-3 inline-flex items-center gap-2 text-sm text-white/70">
        Time zone
        <select value={tz} onChange={e => setTz(e.target.value)} className="rounded-lg border border-white/20 bg-[#1b1b1b] px-2 py-1 text-white">
          {['UTC', 'Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'local'].map(z => (
            <option key={z}>{z}</option>
          ))}
        </select>
      </label>
      <CalendarView {...look} height={620} initialView="timeGridDay" events={events} timeZone={tz as 'UTC'} />
    </div>
  );
}

const recurringEvents: CalendarEvent[] = [
  { id: 'r1', title: 'Standup (Mon/Wed/Fri)', start: day(0, '09:00'), end: day(0, '09:30'), rrule: `DTSTART:${dayjs().format('YYYYMMDD')}T090000\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR`, color: '#6366f1' },
  { id: 'r2', title: 'Office hours', start: day(0, '14:00'), end: day(0, '15:00'), recurrence: { daysOfWeek: [2, 4], startTime: '14:00', endTime: '15:00' }, color: '#14b8a6' },
  { id: 'r3', title: 'Monthly review', start: day(0, '16:00'), end: day(0, '17:00'), rrule: `DTSTART:${dayjs().startOf('month').format('YYYYMMDD')}T160000\nRRULE:FREQ=MONTHLY;BYMONTHDAY=15`, color: '#f59e0b' },
];

const backgroundEvents: CalendarEvent[] = [
  { id: 'b1', title: 'Focus time', start: day(0, '09:00'), end: day(0, '12:00'), display: 'background', color: '#6366f1' },
  { id: 'b2', title: 'Lunch', start: day(0, '12:00'), end: day(0, '13:00'), display: 'background', color: '#f59e0b' },
  { id: 'b3', title: 'Design review', start: day(0, '14:00'), end: day(0, '15:30'), color: '#e11d48' },
  { id: 'b4', title: '1:1', start: day(1, '10:00'), end: day(1, '10:45'), color: '#14b8a6' },
];

// short events today, one or two per resource, so the vertical (resource columns) view reads like a day planner
const stamp = (time: string) => `${dayjs().format('YYYY-MM-DD')} ${time}:00`;
const columnEvents: SchedulerEvent[] = [
  ['r1', 'Stand-up', '09:00', '09:30', '#6366f1'],
  ['r1', 'Client call', '11:00', '12:30', '#14b8a6'],
  ['r2', 'Design review', '10:00', '11:30', '#e11d48'],
  ['r3', 'Workshop', '13:00', '16:00', '#f59e0b'],
  ['r4', 'Interview', '09:30', '10:30', '#8b5cf6'],
  ['r5', 'Deep work', '14:00', '17:00', '#0ea5e9'],
  ['r6', 'Maintenance', '08:00', '10:00', '#6fa088'],
  ['r7', 'Demo', '15:30', '16:30', '#d946ef'],
].map(([resourceId, title, a, b, bgColor], i) => ({ id: 800 + i, resourceId: resourceId as string, title: title as string, start: stamp(a as string), end: stamp(b as string), bgColor: bgColor as string }));


/** Drag over empty time to create an event; click an event to delete it. */
function SelectCreateDemo({ theme, look, palette, radius }: LookProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(() => [
    { id: 'a', title: 'Drag across the grid to add an event', start: day(0, '10:00'), end: day(0, '11:30') },
  ]);
  const style = (radius === undefined ? {} : { '--rbs-radius': `${radius}px` }) as React.CSSProperties;
  return (
    <div>
      <Calendar
        events={events}
        initialView="timeGridWeek"
        views={['timeGridWeek', 'timeGridDay', 'dayGridMonth']}
        theme={theme}
        look={look}
        palette={palette}
        style={style}
        height={620}
        editable
        selectable
        nowIndicator
        onSelect={({ start, end, allDay }) =>
          setEvents(list => [...list, { id: `n${list.length}`, title: 'New event', start: start.format(), end: end.format(), allDay, color: SHADES[list.length % SHADES.length] }])
        }
        onEventClick={({ event }) => setEvents(list => list.filter(e => e.id !== event.id))}
        onEventDrop={({ event }) => setEvents(list => list.map(e => (e.id === event.id ? event : e)))}
        onEventResize={({ event }) => setEvents(list => list.map(e => (e.id === event.id ? event : e)))}
      />
      <p className="px-4 pb-3 text-xs opacity-60">Select a range to create, click an event to remove it, drag or resize to change it.</p>
    </div>
  );
}

const iconEvents: CalendarEvent[] = [
  { id: 'i1', title: 'Flight to Berlin', start: day(0, '07:30'), end: day(0, '10:00'), extendedProps: { icon: '✈️', where: 'T3' } },
  { id: 'i2', title: 'Team lunch', start: day(0, '12:30'), end: day(0, '13:30'), extendedProps: { icon: '🍜', where: 'Canteen' } },
  { id: 'i3', title: 'Review', start: day(1, '15:00'), end: day(1, '16:00'), extendedProps: { icon: '🔍', where: 'Room 4' } },
  { id: 'i4', title: 'Gym', start: day(2, '18:00'), end: day(2, '19:00'), extendedProps: { icon: '🏋️', where: '' } },
];

const cal = (initialView: string, views: string[], extra = '') =>
  `import { Calendar } from 'react-big-schedule';
import 'react-big-schedule/dist/css/style.css';

<Calendar
  events={events}
  initialView="${initialView}"
  views={[${views.map(v => `'${v}'`).join(', ')}]}
  editable
  selectable${extra}
  onEventDrop={({ event }) => save(event)}
/>`;

const timeline = (view: string, extra = '') =>
  `import { Scheduler, SchedulerData, ViewType, wrapperFun } from 'react-big-schedule';

const DndScheduler = wrapperFun(Scheduler);
const data = new SchedulerData(new Date(), ViewType.${view}${extra});
data.setResources(resources);
data.setEvents(events);

<DndScheduler schedulerData={data} prevClick={prev} nextClick={next}
  onViewChange={change} onSelectDate={select} />`;

export const demos: Demo[] = [
  // ---- Calendar: the same set FullCalendar shows, all free ----
  { id: 'month', title: 'Month', group: 'Calendar', status: 'free', blurb: 'The month grid, with multi-day bars, “+N more” and drag, resize and select.', render: l => <CalendarView {...l} height={680} initialView="dayGridMonth" />, code: cal('dayGridMonth', ['dayGridMonth', 'dayGridWeek', 'timeGridWeek', 'listWeek'], '\n  dayMaxEvents') },
  { id: 'week', title: 'Week', group: 'Calendar', status: 'free', blurb: 'The time grid: events placed by hour, all-day row, now indicator and business hours.', render: l => <CalendarView {...l} height={680} initialView="timeGridWeek" />, code: cal('timeGridWeek', ['timeGridWeek', 'timeGridDay'], '\n  nowIndicator\n  businessHours') },
  { id: 'day', title: 'Day', group: 'Calendar', status: 'free', blurb: 'A single day on the time grid.', render: l => <CalendarView {...l} height={680} initialView="timeGridDay" />, code: cal('timeGridDay', ['timeGridDay', 'timeGridWeek']) },
  { id: 'week-grid', title: 'Week grid', group: 'Calendar', status: 'free', blurb: 'A simple week with no time axis.', render: l => <CalendarView {...l} height={520} initialView="dayGridWeek" views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']} />, code: cal('dayGridWeek', ['dayGridMonth', 'dayGridWeek', 'dayGridDay']) },
  { id: 'year-grid', title: 'Year grid', group: 'Calendar', status: 'free', blurb: 'Twelve mini-months side by side, busy days marked.', render: l => <CalendarView {...l} height={760} initialView="multiMonthYear" views={['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']} />, code: cal('multiMonthYear', ['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']) },
  { id: 'year-stacked', title: 'Year stacked', group: 'Calendar', status: 'free', blurb: 'The same twelve months stacked one above the other, each at full size.', render: l => <CalendarView {...l} height={760} initialView="multiMonthStack" views={['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']} />, code: cal('multiMonthStack', ['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']) },
  { id: 'year-continuous', title: 'Year continuous', group: 'Calendar', status: 'free', blurb: 'The whole year as one unbroken run of weeks.', render: l => <CalendarView {...l} height={760} initialView="multiMonthContinuous" views={['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']} />, code: cal('multiMonthContinuous', ['multiMonthYear', 'multiMonthStack', 'multiMonthContinuous']) },
  { id: 'list', title: 'List', group: 'Calendar', status: 'free', blurb: 'Events as an agenda, by day, week, month or year.', render: l => <CalendarView {...l} height={620} initialView="listWeek" views={['listDay', 'listWeek', 'listMonth', 'listYear']} />, code: cal('listWeek', ['listDay', 'listWeek', 'listMonth', 'listYear']) },

  // ---- Resources: premium at FullCalendar, free here ----
  { id: 'resource-timeline', title: 'Resource timeline', group: 'Resources', status: 'free', blurb: 'Rooms, people or machines down the side, time across. Premium elsewhere, free here.', render: l => <TimelineDemo {...l} viewType={ViewType.Week} />, code: timeline('Week') },
  { id: 'resource-columns', title: 'Resource columns', group: 'Resources', status: 'free', blurb: 'A column per resource with time running down (the vertical resource view).', render: l => <TimelineDemo {...l} viewType={ViewType.VerticalResource} events={columnEvents} />, code: timeline('VerticalResource') },
  { id: 'resource-grouped', title: 'Grouped header', group: 'Resources', status: 'free', blurb: 'Month and week-number rows above the day cells, nested resources.', render: l => <TimelineDemo {...l} viewType={ViewType.Quarter} config={{ showMonthRow: true, showWeekNumber: true }} />, code: `${timeline('Quarter')}\n\n// config: { showMonthRow: true, showWeekNumber: true }` },
  { id: 'resource-cadence', title: 'Month columns', group: 'Resources', status: 'free', blurb: 'One column per week, month, quarter or year with a summary row.', render: l => <TimelineDemo {...l} viewType={ViewType.Month} />, code: timeline('Month') },

  // ---- Data & behaviour ----
  { id: 'event-sources', title: 'Event sources', group: 'Data', status: 'free', blurb: 'An async function (or a JSON feed) is called for the visible range; stale requests are cancelled.', render: l => <EventSourcesDemo {...l} />, code: `<Calendar
  events={async ({ start, end }, signal) => {
    const res = await fetch(\`/api/events?start=\${start.format()}&end=\${end.format()}\`, { signal });
    return res.json();
  }}
  eventSources={[{ url: '/holidays.json', color: '#6fa088' }]}
  onLoading={setLoading}
  onEventsError={console.error}
/>` },
  { id: 'recurring', title: 'Recurring events', group: 'Data', status: 'free', blurb: 'RFC 5545 RRULE strings or a simple weekly form, expanded for the visible range.', render: l => <CalendarView {...l} height={640} initialView="dayGridMonth" events={recurringEvents} />, code: `const events = [
  { id: 1, title: 'Standup', start, end, rrule: 'DTSTART:20261012T090000\\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR' },
  { id: 2, title: 'Office hours', start, end, recurrence: { daysOfWeek: [2, 4], startTime: '14:00', endTime: '15:00' } },
];` },
  { id: 'time-zones', title: 'Time zones', group: 'Data', status: 'free', blurb: 'Display in local time, UTC or any IANA zone; callbacks and the now line follow it.', render: l => <TimeZoneDemo {...l} />, code: `<Calendar events={events} timeZone="Asia/Kolkata" nowIndicator />` },
  { id: 'background', title: 'Background events', group: 'Data', status: 'free', blurb: 'Paint ranges behind events, shade non-business hours, mark the current time.', render: l => <CalendarView {...l} height={680} initialView="timeGridWeek" events={backgroundEvents} />, code: `const events = [
  { id: 1, title: 'Focus time', start, end, display: 'background', color: '#6366f1' },
  { id: 2, title: 'Design review', start, end },
];

<Calendar events={events} businessHours nowIndicator />` },

  // ---- Options: small props that change a lot ----
  { id: 'select-create', title: 'Select to create', group: 'Options', status: 'free', blurb: 'Drag over empty time to add an event, click one to remove it. Your state, your rules.', render: l => <SelectCreateDemo {...l} />, code: `<Calendar
  events={events}
  editable
  selectable
  onSelect={({ start, end, allDay }) => add({ title: 'New event', start: start.format(), end: end.format(), allDay })}
  onEventClick={({ event }) => remove(event.id)}
  onEventDrop={({ event }) => update(event)}
  onEventResize={({ event }) => update(event)}
/>` },
  { id: 'read-only', title: 'Read only', group: 'Options', status: 'free', blurb: 'No dragging, resizing or selecting: a display-only calendar.', render: l => <CalendarView {...l} height={600} initialView="dayGridMonth" editable={false} selectable={false} />, code: `<Calendar events={events} editable={false} selectable={false} />` },
  { id: 'hide-weekends', title: 'Hide weekends', group: 'Options', status: 'free', blurb: 'Five-day weeks in every view.', render: l => <CalendarView {...l} height={620} initialView="timeGridWeek" weekends={false} />, code: `<Calendar events={events} initialView="timeGridWeek" weekends={false} />` },
  { id: 'week-numbers', title: 'Week numbers', group: 'Options', status: 'free', blurb: 'ISO week numbers down the side of the month grid.', render: l => <CalendarView {...l} height={640} initialView="dayGridMonth" weekNumbers firstDay={1} />, code: `<Calendar events={events} weekNumbers firstDay={1} /> // weeks start on Monday` },
  { id: 'slot-range', title: 'Business hours and slots', group: 'Options', status: 'free', blurb: 'Limit the visible hours, set the slot size and shade the working week.', render: l => <CalendarView {...l} height={660} initialView="timeGridWeek" slotMinTime="08:00" slotMaxTime="19:00" slotDuration={15} scrollTime="08:00" businessHours={{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '17:00' }} />, code: `<Calendar
  initialView="timeGridWeek"
  slotMinTime="08:00"
  slotMaxTime="19:00"
  slotDuration={15}
  businessHours={{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '17:00' }}
/>` },
  { id: 'custom-content', title: 'Custom event content', group: 'Options', status: 'free', blurb: 'Render anything inside an event: icons, places, badges, from extendedProps.', render: l => <CalendarView {...l} height={620} initialView="timeGridWeek" events={iconEvents} eventContent={a => (<span className="flex min-w-0 items-center gap-1"><span>{String(a.event.extendedProps?.icon ?? '')}</span><span className="truncate font-medium">{a.event.title}</span>{a.event.extendedProps?.where ? <span className="truncate opacity-75">· {String(a.event.extendedProps.where)}</span> : null}</span>)} />, code: `<Calendar
  events={[{ id: 1, title: 'Team lunch', start, end, extendedProps: { icon: '🍜', where: 'Canteen' } }]}
  eventContent={({ event }) => (
    <span>{event.extendedProps?.icon} {event.title} · {event.extendedProps?.where}</span>
  )}
/>` },

  // ---- Pro: add-ons (scaffold exists, features landing one by one) ----
  { id: 'export', title: 'iCal, CSV and PDF export', group: 'Pro', status: 'pro', blurb: 'Download any range as .ics, .csv or a print-ready PDF.', note: 'iCal and CSV are built in the Pro package (in development); PDF export is planned.', code: `import { toICS, toCSV, downloadICS } from '@react-big-schedule/pro';

downloadICS(events, 'team.ics');
const csv = toCSV(events);` },
  { id: 'undo-redo', title: 'Undo and redo', group: 'Pro', status: 'pro', blurb: 'A bounded history for every drag, resize and edit.', note: 'Built in the Pro package (in development).', code: `import { useUndoRedo } from '@react-big-schedule/pro';

const { state: events, set, undo, redo, canUndo } = useUndoRedo(initialEvents);` },
  { id: 'conflicts', title: 'Conflicts and availability', group: 'Pro', status: 'pro', blurb: 'Find double bookings and block drops that would clash.', note: 'Conflict detection is built in the Pro package (in development); availability rules are planned.', code: `import { findConflicts, wouldConflict } from '@react-big-schedule/pro';

findConflicts(events);                 // [{ a, b, resourceId }]
wouldConflict(events, droppedEvent);   // true | false` },
  { id: 'resource-tree', title: 'Resource tree', group: 'Pro', status: 'soon', blurb: 'Nested resource groups with collapse, per-resource working hours and capacity.', note: 'Planned for Pro.', code: `<DndScheduler schedulerData={data} resourceTree collapsible />` },
  { id: 'gantt', title: 'Gantt dependencies', group: 'Pro', status: 'soon', blurb: 'Link tasks, draw dependency arrows and see the critical path on the timeline.', note: 'Planned for Pro.', code: `const dependencies = [{ from: 'task-1', to: 'task-2', type: 'finish-to-start' }];` },
  { id: 'recurrence-ui', title: 'Recurrence editor', group: 'Pro', status: 'soon', blurb: 'Edit this event, this and following, or all, with a built-in dialog.', note: 'Planned for Pro.', code: `<RecurrenceEditor event={event} onSave={save} />` },
  { id: 'sync', title: 'Google and Outlook sync', group: 'Pro', status: 'soon', blurb: 'Two-way sync with Google Calendar, Outlook and CalDAV.', note: 'Planned for Pro.', code: `<Calendar eventSources={[googleCalendar({ calendarId, apiKey })]} />` },
  { id: 'realtime', title: 'Realtime collaboration', group: 'Pro', status: 'soon', blurb: 'Presence and live updates when several people edit the same calendar.', note: 'Planned for Pro.', code: `const { events, presence } = useRealtimeEvents(roomId);` },

  // ---- Core roadmap ----
  { id: 'virtual', title: 'Virtual rendering', group: 'Coming to the core', status: 'soon', blurb: 'Render only what is visible so 10,000 events on one day stay smooth.', note: 'Planned for the free core.', code: `<Calendar events={tenThousandEvents} virtualize />` },
  { id: 'calendar-resources', title: 'Resources in Calendar', group: 'Coming to the core', status: 'soon', blurb: 'Resource columns inside the day and week time grids.', note: 'Planned for the free core. Today use the vertical resource view above.', code: `<Calendar resources={rooms} initialView="resourceTimeGridDay" />` },
  { id: 'touch', title: 'Touch long-press', group: 'Coming to the core', status: 'soon', blurb: 'Long-press to drag, tuned for competing scroll panes on phones and tablets.', note: 'Planned for the free core.', code: `<Calendar eventLongPressDelay={400} />` },
];

export const groups = [...new Set(demos.map(d => d.group))];
