---
name: react-big-schedule
description: Build calendars and resource schedulers in React with react-big-schedule 9. Use when the user wants a month/week/day/list/year calendar, drag-and-drop events, recurring events, time zones, a resource timeline (rooms, people, machines), or to theme/restyle such a component. Also use when upgrading from react-big-schedule 8 or react-big-scheduler.
---

# react-big-schedule (v9)

Free MIT React calendar (`<Calendar>`) and resource timeline (`<Scheduler>`). ESM only, strict TypeScript, React 18+ peer dependency, no UI library. Docs: https://react-big-schedule.ansulagrawal.com/docs . Full API text: https://react-big-schedule.ansulagrawal.com/llms-full.txt

## Install and import

```bash
npm install react-big-schedule   # react and react-dom >= 18 are peers; dayjs is a dependency
```

Always import the stylesheet once, or nothing is styled:

```tsx
import 'react-big-schedule/dist/css/style.css';
```

## Calendar (most requests)

```tsx
import { Calendar, type CalendarEvent } from 'react-big-schedule';

const events: CalendarEvent[] = [
  { id: 1, title: 'Standup', start: '2026-10-12T09:00', end: '2026-10-12T09:30' },
  { id: 2, title: 'Offsite', start: '2026-10-14', end: '2026-10-17', allDay: true }, // all-day end is exclusive
];

<Calendar
  events={events}
  initialView="dayGridMonth"
  views={['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek', 'multiMonthYear']}
  editable selectable nowIndicator businessHours dayMaxEvents
  height={640}
  theme="dark" look="material" palette="purple"
  onEventClick={({ event }) => {}}
  onSelect={({ start, end, allDay }) => {}}
  onEventDrop={({ event, oldEvent, revert }) => {}}
  onEventResize={({ event, oldEvent, revert }) => {}}
/>
```

- Views: `dayGridMonth|dayGridWeek|dayGridDay|timeGridWeek|timeGridDay|listDay|listWeek|listMonth|listYear|multiMonthYear|multiMonthStack|multiMonthContinuous`.
- Event: `id, title, start, end?, allDay?, color?, textColor?, display?('background'), editable?, extendedProps?, rrule?, recurrence?, exceptions?`. Dates are ISO strings, `Date`, number or dayjs. A date-only string means all-day.
- The calendar is uncontrolled for events: keep your own state and update it in `onEventDrop`/`onEventResize`/`onSelect` (call `revert()` to cancel a change). Pass `events` as an array, a `(range, signal) => Promise<CalendarEvent[]>` function, or `{ url }` JSON feed; `eventSources` merges several (each may be `{ events, color }`).
- Recurrence: `rrule: 'FREQ=WEEKLY;BYDAY=MO,WE'` (RFC 5545) or `recurrence: { daysOfWeek: [1,3], startTime: '10:00', endTime: '11:00' }`. `start`/`end` give the first occurrence and the duration.
- Other props: `locale, timeZone ('local'|'UTC'|IANA), firstDay, weekends, weekNumbers, slotDuration, slotMinTime, slotMaxTime, scrollTime, eventTimeFormat, eventContent, eventClassNames, dayCellClassNames, noEventsContent, toolbar (false hides it), view/date (controlled), initialView/initialDate`.
- Hovering an event or day shows a hover card automatically.

## Theming

Three independent switches, all optional (also valid as `data-rbs-theme|look|palette` attributes on any ancestor):

- `theme`: `'default'` (transparent, follows the page), `'light'`, `'dark'`, or your own `data-rbs-theme` value.
- `look`: `'material' | 'fluent' | 'tailwind' | 'minimal' | 'classic'` (shape, borders, today marker).
- `palette`: `blue, green, purple, red, amber, emerald, indigo, rose` (the accent).

Fine tuning is CSS variables on the calendar or an ancestor: `--rbs-accent`, `--rbs-radius`, `--rbs-surface`, `--rbs-border`, `--rbs-text`, `--rbs-muted`, `--rbs-hover`, `--rbs-group-bg`, `--rbs-nonworking-bg`, `--rbs-event-fg`, `--rbs-now`. Events without `color` use the accent; use `color-mix(in srgb, var(--rbs-accent) 70%, #000)` style values to keep events on-palette.

## Scheduler (resource timeline)

```tsx
import { Scheduler, SchedulerData, ViewType, wrapperFun, DATE_FORMAT } from 'react-big-schedule';
import dayjs from 'dayjs';

const DndScheduler = wrapperFun(Scheduler); // adds the drag and drop context; do not use <Scheduler> bare for DnD

const make = () => {
  const d = new SchedulerData(dayjs().format(DATE_FORMAT), ViewType.Week, false, false, { theme: 'dark', look: 'fluent', palette: 'blue' });
  d.setResources([{ id: 'r1', name: 'Room A' }, { id: 'r2', name: 'Room B' }]);
  d.setEvents([{ id: 1, resourceId: 'r1', title: 'Meeting', start: '2026-10-12 09:00:00', end: '2026-10-12 11:00:00', bgColor: 'var(--rbs-accent)' }]);
  return d;
};
```

- Keep `SchedulerData` in state and re-render by cloning after each change: `Object.assign(Object.create(Object.getPrototypeOf(d)), d)`.
- Handle `prevClick`, `nextClick`, `onSelectDate`, `onViewChange` (call `d.prev()/next()/setDate()/setViewType()`, then `setEvents` and set state), plus `eventItemClick`, `moveEvent`, `updateEventStart/End`, `newEvent`.
- Events array should be sorted ascending by `start`. Event colour is `bgColor`.
- Views: `ViewType.Day|Week|Month|Quarter|Year|Custom|VerticalResource`. Resources can nest with `parentId` and `groupOnly`.
- Config options (`schedulerWidth`, `eventItemHeight`, `movable`, `startResizable`, `endResizable`, `creatable`, `theme`, `look`, `palette`, ...) go in the 5th constructor argument.

## Gotchas

- v9 is ESM only; antd and `@ant-design/icons` are gone, `prop-types` is gone (use the exported TS types), `setCalendarPopoverLocale` is removed (the picker follows `setSchedulerLocale`).
- Without the stylesheet import the component renders unstyled.
- Server rendering: the library is client-side; render it in a client component (e.g. `'use client'` in Next.js).
- Release notes and upgrade guide: https://github.com/ansulagrawal/react-big-schedule/blob/master/.github/release-notes/v9.0.0.md
