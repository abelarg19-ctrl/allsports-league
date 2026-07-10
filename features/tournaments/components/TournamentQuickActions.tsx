"use client";

import Link from "next/link";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Settings,
  ShieldCheck,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

interface Props {
  tournamentId: number;
  teams: number;
  matches: number;
  activeMatches: number;
  completedMatches: number;
  canManage?: boolean;
}

export default function TournamentQuickActions({
  tournamentId,
  teams,
  matches,
  activeMatches,
  completedMatches,
  canManage = false,
}: Props) {
  const stats = [
    {
      title: "Registered Teams",
      value: teams,
      icon: Users,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-500/5",
    },
    {
      title: "Matches",
      value: matches,
      icon: Swords,
      color: "text-rose-400",
      bg: "from-rose-500/20 to-rose-500/5",
    },
    {
      title: "Live",
      value: activeMatches,
      icon: Activity,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      title: "Completed",
      value: completedMatches,
      icon: Trophy,
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-yellow-500/5",
    },
  ];

  const actions = [
    {
      title: "Matches",
      href: `/dashboard/tournaments/${tournamentId}/results`,
      icon: CalendarDays,
    },
    {
      title: "Standings",
      href: "/dashboard/standings",
      icon: BarChart3,
    },
    ...(canManage
      ? [
          {
            title: "Manage",
            href: `/dashboard/tournaments/${tournamentId}`,
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <div className={`bg-gradient-to-br ${stat.bg} p-5`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-black">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <Icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold">Quick Actions</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10"
              >
                <div className="rounded-xl bg-cyan-500/10 p-3 transition-colors group-hover:bg-cyan-500/20">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                  <p className="font-semibold">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Open {action.title.toLowerCase()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}