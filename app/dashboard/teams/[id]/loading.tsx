export default function TeamDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-pulse">
      <div className="h-64 rounded-3xl border border-white/10 bg-white/5" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}