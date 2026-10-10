type Cell = 'yes' | 'no' | 'partial' | 'paid' | 'planned' | 'pro';

const LIBS = ['React Big Schedule', 'FullCalendar', 'react-big-calendar', 'Bryntum Scheduler'] as const;

const rows: { feature: string; v: [Cell, Cell, Cell, Cell]; note?: string }[] = [
  { feature: 'Month, week and day views', v: ['yes', 'yes', 'yes', 'paid'] },
  { feature: 'List / agenda view', v: ['yes', 'yes', 'yes', 'no'] },
  { feature: 'Year views (grid, stack, continuous)', v: ['yes', 'yes', 'no', 'no'] },
  { feature: 'Resource timeline', v: ['yes', 'paid', 'no', 'paid'] },
  { feature: 'Vertical resource view', v: ['yes', 'paid', 'partial', 'paid'] },
  { feature: 'Drag, resize and select', v: ['yes', 'yes', 'yes', 'paid'] },
  { feature: 'Recurring events (RRULE)', v: ['yes', 'yes', 'no', 'paid'] },
  { feature: 'Time zones', v: ['yes', 'yes', 'no', 'paid'] },
  { feature: 'Event feeds (JSON / function)', v: ['yes', 'yes', 'no', 'paid'] },
  { feature: 'Themes, dark mode, CSS variables', v: ['yes', 'yes', 'partial', 'paid'] },
  { feature: 'Print styles', v: ['yes', 'paid', 'no', 'paid'] },
  { feature: 'Strict TypeScript source', v: ['yes', 'yes', 'no', 'paid'] },
  { feature: 'iCal / CSV export', v: ['pro', 'partial', 'no', 'paid'] },
  { feature: 'Undo / redo history', v: ['pro', 'no', 'no', 'paid'] },
  { feature: 'Conflict / availability engine', v: ['pro', 'no', 'no', 'paid'] },
  { feature: 'Virtual rendering (10k+ events)', v: ['planned', 'yes', 'no', 'paid'] },
  { feature: 'Touch long-press tuning', v: ['planned', 'yes', 'partial', 'paid'] },
  { feature: 'Screen-reader audit (NVDA / JAWS / VoiceOver)', v: ['planned', 'yes', 'partial', 'paid'] },
  { feature: 'Gantt dependencies', v: ['planned', 'no', 'no', 'paid'] },
];

const label: Record<Cell, [string, string]> = {
  yes: ['✓ Free', 'text-emerald-300'],
  no: ['—', 'text-white/30'],
  partial: ['Partial', 'text-amber-300'],
  paid: ['Paid', 'text-sky-300'],
  planned: ['Planned', 'text-fuchsia-300'],
  pro: ['Pro add-on', 'text-orange-300'],
};

export default function Compare() {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-180 border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
            <th className="px-5 py-4 font-semibold">Feature</th>
            {LIBS.map((l, i) => (
              <th key={l} className={`px-4 py-4 font-semibold ${i === 0 ? 'text-white' : ''}`}>
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.feature} className="border-b border-white/5 last:border-0 hover:bg-white/3">
              <td className="px-5 py-3 text-white/85">{r.feature}</td>
              {r.v.map((c, i) => (
                <td key={LIBS[i]} className={`px-4 py-3 font-medium ${label[c][1]} ${i === 0 ? 'bg-white/4' : ''}`}>
                  {label[c][0]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-white/10 px-5 py-4 text-xs leading-relaxed text-white/45">
        “Paid” means the feature needs a commercial licence or tier; “Planned” is on our roadmap and not shipped yet. Competitor columns are
        summarised from each vendor’s public documentation and pricing pages and can change; please check them before you decide.
      </p>
    </div>
  );
}
