import { demos } from './demos/registry';

export const SITE = 'https://react-big-schedule.ansulagrawal.com';

export const HOME = {
  title: 'React Big Schedule · The React calendar and scheduler',
  description:
    'Free, MIT-licensed React calendar and resource timeline: month, week, day, list and year views, drag and drop, themes, TypeScript.',
};

export interface Meta {
  title: string;
  description: string;
  url: string;
}

/** Title, description and canonical URL for a route; used by the live app and by the pre-render step. */
export function metaFor(path: string): Meta {
  const [, page, id] = path.split('/');
  const url = `${SITE}${path === '/' ? '/' : path}`;
  if (page === 'docs') {
    return { title: 'Documentation · React Big Schedule', description: 'Install React Big Schedule, use the Calendar and Scheduler, theme them, and upgrade to v9.', url };
  }
  if (page === 'pricing') {
    return { title: 'Pricing · React Big Schedule', description: 'The core is free and MIT licensed. Pro add-ons (export, undo/redo, conflicts) are planned.', url };
  }
  if (page === 'demos') {
    const demo = demos.find(d => d.id === (id ?? demos[0]?.id));
    return {
      title: `${demo?.title ?? 'Demos'} demo · React Big Schedule`,
      description: demo?.blurb ?? 'Live demos of every view, the resource timeline, event sources, recurrence, time zones and themes.',
      url,
    };
  }
  return { ...HOME, url };
}
