import { useState } from 'react';
import { ViewType } from 'react-big-schedule';
import { columnEvents } from '../demos/registry';
import { useSite } from '../site';
import TimelineDemo from './TimelineDemo';

const modes = [
  { id: 'timeline', label: 'Timeline', note: 'Rooms, people or machines down the side, time across.' },
  { id: 'vertical', label: 'Vertical', note: 'A column per resource with the day running top to bottom.' },
] as const;

/** Home page: the free resource timeline and vertical resource view, live. */
export default function ResourceShowcase() {
  const { theme, look, palette, radius } = useSite();
  const [mode, setMode] = useState<(typeof modes)[number]['id']>('timeline');
  const current = modes.find(m => m.id === mode);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Resource view" className="inline-flex rounded-full border border-white/20 p-1">
          {modes.map(m => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                mode === m.id ? 'keep-white site-btn' : 'text-white/75 hover:bg-white/10'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-white/65">{current?.note}</p>
        <a href="/demos/resource-timeline" className="text-sm font-semibold text-site-ink hover:underline">
          More resource demos →
        </a>
      </div>
      <div className="card overflow-hidden">
        <TimelineDemo
          key={mode}
          theme={theme}
          look={look}
          palette={palette}
          radius={radius}
          viewType={mode === 'timeline' ? ViewType.Week : ViewType.VerticalResource}
          events={mode === 'vertical' ? columnEvents : undefined}
          config={mode === 'vertical' ? { dayStartFrom: 8, dayStopTo: 17 } : undefined}
        />
      </div>
      <ul className="mx-auto mt-6 grid max-w-3xl gap-x-8 gap-y-2 text-sm text-white/70 sm:grid-cols-2">
        <li>Drag events between resources and across time, resize from either end.</li>
        <li>Nested resources with collapse and expand.</li>
        <li>Day, week, month, quarter, year and vertical views.</li>
        <li>Free and MIT licensed; paid elsewhere.</li>
      </ul>
    </div>
  );
}
