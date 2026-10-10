export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <img src="/logo.svg" alt="" width={size} height={size} />
      <span>React Big Schedule</span>
    </span>
  );
}
