"use client";

type Props = {
  userName: string;
};

export default function DashboardHero({ userName }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 shadow-2xl">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          AllSports League
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {userName}
          </span>{" "}
          👋
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Manage tournaments, teams, players and competitions from one modern dashboard.
        </p>
      </div>
    </section>
  );
}