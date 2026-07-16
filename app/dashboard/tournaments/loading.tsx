export default function TournamentsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-12 w-64 rounded-xl bg-white/5" />
        <div className="mt-3 h-5 w-48 rounded-lg bg-white/5" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-48 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}