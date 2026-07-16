"use client";

type Props = {
  userName: string;
};

export default function DashboardHero({
  userName,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-5 shadow-2xl sm:rounded-3xl sm:p-8">
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl sm:h-64 sm:w-64" />

      <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl sm:h-64 sm:w-64" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-300 sm:px-4 sm:text-xs">
          AllSports League
        </span>

        <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
          Welcome back,{" "}
          <span className="break-words bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {userName}
          </span>{" "}
          👋
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
          Manage tournaments, teams, players and competitions
          from one modern dashboard.
        </p>
      </div>
    </section>
  );
}