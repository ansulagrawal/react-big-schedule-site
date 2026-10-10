import dayjs from 'dayjs';
import type { CalendarEvent } from 'react-big-schedule';

const at = (offset: number, time: string) => dayjs().add(offset, 'day').format(`YYYY-MM-DD[T]${time}`);
const day = (offset: number) => dayjs().add(offset, 'day').format('YYYY-MM-DD');

export const makeEvents = (): CalendarEvent[] => [
  { id: 1, title: 'Standup', start: at(0, '09:00'), end: at(0, '09:30'), color: '#6366f1' },
  { id: 2, title: 'Design review', start: at(0, '11:00'), end: at(0, '12:00'), color: '#8b5cf6' },
  { id: 3, title: 'Sprint planning', start: at(1, '10:00'), end: at(1, '11:30'), color: '#06b6d4' },
  { id: 4, title: 'Customer call', start: at(1, '10:30'), end: at(1, '11:00'), color: '#f97316' },
  { id: 5, title: 'Offsite', start: day(3), end: day(6), allDay: true, color: '#22c55e' },
  { id: 6, title: 'Release freeze', start: day(-2), allDay: true, color: '#ef4444' },
  { id: 7, title: 'Architecture', start: at(2, '13:00'), end: at(2, '14:30'), color: '#3b82f6' },
  { id: 8, title: 'Retro', start: at(4, '16:00'), end: at(4, '17:00'), color: '#ec4899' },
  { id: 9, title: 'Lunch', start: at(0, '12:00'), end: at(0, '13:00'), display: 'background', color: '#facc15' },
  { id: 10, title: 'Quarter close', start: at(8, '09:00'), end: at(8, '17:00'), color: '#f59e0b' },
  { id: 11, title: 'Planning', start: at(-6, '10:00'), end: at(-6, '11:00'), color: '#6366f1' },
  { id: 12, title: 'Hiring', start: at(10, '14:00'), end: at(10, '15:00'), color: '#14b8a6' },
];
