export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-56 rounded-3xl bg-white/5" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-72 rounded-3xl border border-white/10 bg-white/5" />
        <div className="h-72 rounded-3xl border border-white/10 bg-white/5" />
      </div>
    </div>
  );
}