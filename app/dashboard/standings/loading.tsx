export default function Loading() {
  return (
    <div className="animate-pulse space-y-8">
      <div>
        <div className="h-12 w-48 rounded-xl bg-white/5" />
        <div className="mt-3 h-5 w-72 rounded-lg bg-white/5" />
      </div>

      <div className="h-12 w-80 rounded-xl bg-white/5" />

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="h-14 border-b border-white/10 bg-white/5" />

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-16 border-b border-white/5 last:border-0"
          />
        ))}
      </div>
    </div>
  );
}