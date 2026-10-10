import dayjs from 'dayjs';
import type { CalendarEvent } from 'react-big-schedule';

/** Event colours are shades of the current palette accent (plus red/green for contrast), so a theme change recolours them. */
export const SHADES = [
  'var(--rbs-accent)',
  'color-mix(in srgb, var(--rbs-accent) 78%, #fff)',
  'color-mix(in srgb, var(--rbs-accent) 72%, #000)',
  'var(--rbs-accent)',
  'color-mix(in srgb, var(--rbs-accent) 60%, #ec4899)',
  'color-mix(in srgb, var(--rbs-accent) 60%, #06b6d4)',
];
const [P1, P2, P3, , P5, P6] = SHADES;

const at = (offset: number, time: string) => dayjs().add(offset, 'day').format(`YYYY-MM-DD[T]${time}`);
const day = (offset: number) => dayjs().add(offset, 'day').format('YYYY-MM-DD');

const base = (): CalendarEvent[] => [
  { id: 1, title: 'Standup', start: at(0, '09:00'), end: at(0, '09:30'), color: P1 },
  { id: 2, title: 'Design review', start: at(0, '11:00'), end: at(0, '12:00'), color: P2 },
  { id: 3, title: 'Sprint planning', start: at(1, '10:00'), end: at(1, '11:30'), color: P6 },
  { id: 4, title: 'Customer call', start: at(1, '10:30'), end: at(1, '11:00'), color: P5 },
  { id: 5, title: 'Offsite', start: day(3), end: day(6), allDay: true, color: '#22c55e' },
  { id: 6, title: 'Release freeze', start: day(-2), allDay: true, color: '#ef4444' },
  { id: 7, title: 'Architecture', start: at(2, '13:00'), end: at(2, '14:30'), color: P3 },
  { id: 8, title: 'Retro', start: at(4, '16:00'), end: at(4, '17:00'), color: P5 },
  { id: 9, title: 'Lunch', start: at(0, '12:00'), end: at(0, '13:00'), display: 'background', color: '#facc15' },
  { id: 10, title: 'Quarter close', start: at(8, '09:00'), end: at(8, '17:00'), color: P2 },
  { id: 11, title: 'Planning', start: at(-6, '10:00'), end: at(-6, '11:00'), color: P1 },
  { id: 12, title: 'Hiring', start: at(10, '14:00'), end: at(10, '15:00'), color: P6 },
];

const COLORS = SHADES;

// a handful of events in every month of the current year so the year views are never empty
const monthly = [
  { title: 'Team sync', d: 3, from: '09:30', to: '10:00' },
  { title: 'Product review', d: 8, from: '14:00', to: '15:30' },
  { title: 'Workshop', d: 12, from: '10:00', to: '12:00' },
  { title: 'Offsite', d: 15, days: 2 },
  { title: '1:1', d: 19, from: '11:00', to: '11:30' },
  { title: 'Demo day', d: 22, from: '16:00', to: '17:00' },
  { title: 'Planning', d: 26, from: '09:00', to: '10:30' },
];

const yearEvents = (): CalendarEvent[] => {
  const year = dayjs().year();
  return Array.from({ length: 12 }, (_, m) => dayjs(new Date(year, m, 1))).flatMap((first, m) =>
    monthly.map((e, i): CalendarEvent => {
      const date = first.date(e.d);
      const color = COLORS[(m + i) % COLORS.length];
      return e.days
        ? { id: 1000 + m * 10 + i, title: e.title, start: date.format('YYYY-MM-DD'), end: date.add(e.days + 1, 'day').format('YYYY-MM-DD'), allDay: true, color }
        : { id: 1000 + m * 10 + i, title: e.title, start: date.format(`YYYY-MM-DD[T]${e.from}`), end: date.format(`YYYY-MM-DD[T]${e.to}`), color };
    })
  );
};

export const makeEvents = (): CalendarEvent[] => [...base(), ...yearEvents()];
