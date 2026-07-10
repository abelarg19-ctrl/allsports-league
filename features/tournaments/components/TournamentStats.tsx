"use client";

import {
  Trophy,
  Users,
  Swords,
  Activity,
} from "lucide-react";

interface Props {
  teams: number;
  matches: number;
  activeMatches: number;
  completedMatches: number;
}

export default function TournamentStats({
  teams,
  matches,
  activeMatches,
  completedMatches,
}: Props) {
  const stats = [
    {
      title: "Registered Teams",
      value: teams,
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Matches",
      value: matches,
      icon: Swords,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Active",
      value: activeMatches,
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Completed",
      value: completedMatches,
      icon: Trophy,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg}`}
              >
                <Icon
                  className={`h-7 w-7 ${stat.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}