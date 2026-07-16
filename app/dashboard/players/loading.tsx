export default function PlayersLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-12 w-48 rounded-xl bg-white/5" />
        <div className="mt-3 h-5 w-64 rounded-lg bg-white/5" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-56 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}