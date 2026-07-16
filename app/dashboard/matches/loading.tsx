export default function MatchesLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-12 w-48 rounded-xl bg-white/5" />
        <div className="mt-3 h-5 w-64 rounded-lg bg-white/5" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}