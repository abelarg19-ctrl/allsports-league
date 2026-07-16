export default function MatchDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-pulse">
      <div className="h-56 rounded-3xl border border-white/10 bg-white/5" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 rounded-3xl border border-white/10 bg-white/5" />

        <div className="h-48 rounded-3xl border border-white/10 bg-white/5" />
      </div>

      <div className="h-32 rounded-3xl border border-white/10 bg-white/5" />
    </div>
  );
}