const tiers = [
  {
    name: 'Standard',
    price: 'Free',
    note: 'MIT licence, commercial use included',
    items: ['All calendar views', 'Resource timeline and vertical resource view', 'Drag and drop, resize, select', 'Themes, dark mode, print styles', 'Community support'],
    cta: ['Get started', '/docs'],
  },
  {
    name: 'Pro',
    price: 'Coming soon',
    note: 'Pricing to be announced',
    items: ['iCal and CSV export', 'Undo and redo history', 'Conflict and availability engine', 'Priority email support', 'Everything in Standard'],
    cta: ['Join the waitlist', 'https://github.com/ansulagrawal/react-big-schedule/discussions'],
  },
] as const;

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-center text-5xl font-extrabold tracking-tight">Pricing</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/65">
        The core stays free and MIT licensed. Pro will fund its maintenance.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tiers.map(t => (
          <div key={t.name} className="flex flex-col card p-8">
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <p className="mt-2 text-3xl font-bold">{t.price}</p>
            <p className="text-sm text-white/50">{t.note}</p>
            <ul className="my-6 flex-1 space-y-2 text-sm text-white/80">
              {t.items.map(i => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
            <a href={t.cta[1]} className="rounded-lg keep-white site-btn px-4 py-2 text-center font-medium text-white">
              {t.cta[0]}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
