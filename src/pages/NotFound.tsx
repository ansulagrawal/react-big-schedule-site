export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-site-ink">404</p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-4 text-white/65">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="/" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10">Home</a>
        <a href="/demos" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10">Demos</a>
        <a href="/docs" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10">Docs</a>
      </div>
    </div>
  );
}
