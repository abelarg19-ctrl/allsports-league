"use client";

import { useRouter } from "next/navigation";
import {
  BarChart3,
  Settings,
  Shield,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

interface Props {
  tournamentId: number;
  canManage?: boolean;
}

export default function TournamentDetail({
  tournamentId,
  canManage = false,
}: Props) {
  const router = useRouter();

  const actions = [
    {
      title: "Matches",
      description: "View fixtures and results",
      icon: Swords,
      href: `/dashboard/tournaments/${tournamentId}/matches`,
      color:
        "from-red-500/20 to-red-500/5 border-red-500/20 hover:border-red-400/40",
    },
    {
      title: "Standings",
      description: "League table",
      icon: Trophy,
      href: `/dashboard/tournaments/${tournamentId}/standings`,
      color:
        "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20 hover:border-yellow-400/40",
    },
    {
      title: "Teams",
      description: "Registered teams",
      icon: Users,
      href: `/dashboard/tournaments/${tournamentId}/teams`,
      color:
        "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/40",
    },
    {
      title: "Analytics",
      description: "Tournament insights",
      icon: BarChart3,
      href: `/dashboard/tournaments/${tournamentId}/analytics`,
      color:
        "from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-400/40",
    },
  ];

  if (canManage) {
    actions.push(
      {
        title: "Admins",
        description: "Tournament admins",
        icon: Shield,
        href: `/dashboard/tournaments/${tournamentId}/admins`,
        color:
          "from-green-500/20 to-green-500/5 border-green-500/20 hover:border-green-400/40",
      },
      {
        title: "Settings",
        description: "Manage tournament",
        icon: Settings,
        href: `/dashboard/tournaments/${tournamentId}/settings`,
        color:
          "from-slate-500/20 to-slate-500/5 border-slate-500/20 hover:border-white/30",
      }
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Tournament Detail
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Access every tournament module from one place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => router.push(action.href)}
              className={`group flex items-center gap-4 rounded-3xl border bg-gradient-to-br ${action.color} p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}