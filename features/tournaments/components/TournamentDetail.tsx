"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Settings,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

import {
  TournamentOverview,
} from "@/services/tournament-stats.service";

import { Tournament } from "@/lib/types";

interface Props {
  tournament: Tournament;
  overview: TournamentOverview;
  canManage?: boolean;
}

type Action = {
  title: string;
  description: string;
  href: string;
  color: string;
  icon: React.ElementType;
};

export default function TournamentDetail({
  tournament,
  overview,
  canManage = false,
}: Props) {
  const router = useRouter();

  const stats = useMemo(
    () => [
      {
        title: "Teams",
        value: overview.teams,
        icon: Users,
        color: "text-cyan-400",
      },
      {
        title: "Matches",
        value: overview.matches,
        icon: Swords,
        color: "text-red-400",
      },
      {
        title: "Progress",
        value: `${overview.progress}%`,
        icon: Trophy,
        color: "text-yellow-400",
      },
      {
        title: "Admins",
        value: overview.admins,
        icon: Shield,
        color: "text-green-400",
      },
    ],
    [overview]
  );

  const actions: Action[] = [
    {
      title: "Matches",
      description:
        "Fixtures, results and Match Center",
      icon: Swords,
      href: `/dashboard/tournaments/${tournament.id}/matches`,
      color:
        "from-red-500/20 to-red-500/5 border-red-500/20 hover:border-red-400/40",
    },
    {
      title: "Standings",
      description:
        "League table and rankings",
      icon: Trophy,
      href: `/dashboard/tournaments/${tournament.id}/standings`,
      color:
        "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20 hover:border-yellow-400/40",
    },
    {
      title: "Teams",
      description:
        "Registered clubs and rosters",
      icon: Users,
      href: `/dashboard/tournaments/${tournament.id}/teams`,
      color:
        "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/40",
    },
    {
      title: "Analytics",
      description:
        "Tournament insights",
      icon: BarChart3,
      href: `/dashboard/tournaments/${tournament.id}/analytics`,
      color:
        "from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-400/40",
    },
  ];

  if (canManage) {
    actions.push(
      {
        title: "Admins",
        description:
          "Tournament administrators",
        icon: Shield,
        href: `/dashboard/tournaments/${tournament.id}/admins`,
        color:
          "from-green-500/20 to-green-500/5 border-green-500/20 hover:border-green-400/40",
      },
      {
        title: "Settings",
        description:
          "Tournament configuration",
        icon: Settings,
        href: `/dashboard/tournaments/${tournament.id}/settings`,
        color:
          "from-slate-500/20 to-slate-500/5 border-slate-500/20 hover:border-white/30",
      }
    );
  }

  return (
    <section className="space-y-8">

      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-slate-950 p-8">

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Tournament Hub
            </div>

            <h1 className="text-4xl font-black text-white">
              {tournament.name}
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              {tournament.sport} • {tournament.format}
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/tournaments/${tournament.id}/matches`
              )
            }
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white transition hover:scale-[1.02]"
          >
            Open Match Center
          </button>

        </div>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    {stat.value}
                  </h3>

                </div>

                <Icon
                  className={`h-10 w-10 ${stat.color}`}
                />

              </div>

            </div>
          );
        })}

      </div>

      <div>

        <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-white">

          <CalendarDays className="h-6 w-6 text-cyan-400" />

          Tournament Modules

        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                onClick={() => router.push(action.href)}
                className={`group flex items-center gap-5 rounded-3xl border bg-gradient-to-br ${action.color} p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {action.description}
                  </p>
                </div>

                <ChevronRight className="h-6 w-6 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </button>
            );
          })}

        </div>

      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-8 backdrop-blur-xl">

        <div className="flex flex-col gap-2">

          <h2 className="text-2xl font-bold text-white">
            Quick Actions
          </h2>

          <p className="max-w-3xl text-gray-400">
            Frequently used tournament actions.
          </p>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/tournaments/${tournament.id}/matches`
              )
            }
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            Match Center
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/tournaments/${tournament.id}/standings`
              )
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Standings
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/tournaments/${tournament.id}/teams`
              )
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Teams
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/tournaments/${tournament.id}/analytics`
              )
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Analytics
          </button>

          {canManage && (
            <>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/dashboard/tournaments/${tournament.id}/admins`
                  )
                }
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                Admins
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/dashboard/tournaments/${tournament.id}/settings`
                  )
                }
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Settings
              </button>
            </>
          )}

        </div>

      </div>

    </section>
  );
}