export default function TournamentDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-pulse">
      <div className="h-56 rounded-3xl border border-white/10 bg-white/5" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}