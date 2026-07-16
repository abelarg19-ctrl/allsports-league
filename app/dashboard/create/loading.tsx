export default function CreateLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-pulse">
      <div>
        <div className="h-12 w-64 rounded-xl bg-white/5" />
        <div className="mt-3 h-5 w-80 rounded-lg bg-white/5" />
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3"
          >
            <div className="h-4 w-32 rounded-lg bg-white/5" />
            <div className="h-12 w-full rounded-xl bg-white/5" />
          </div>
        ))}

        <div className="h-12 w-40 rounded-xl bg-white/5" />
      </div>
    </div>
  );
}