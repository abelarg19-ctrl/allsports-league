"use client";

import {
  Activity,
  CalendarDays,
  Swords,
  Trophy,
  Users,
  User,
} from "lucide-react";

import StatCard from "./StatCard";

type Props = {
  stats: {
    tournaments: number;
    active: number;
    finished: number;
    teams: number;
    players: number;
    matches: number;
  };
};

export default function DashboardStatsGrid({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
      <StatCard
        title="Tournaments"
        value={stats.tournaments}
        href="/dashboard/tournaments"
        icon={Trophy}
        iconClassName="text-yellow-500"
      />

      <StatCard
        title="Active"
        value={stats.active}
        href="/dashboard/tournaments"
        icon={Activity}
        iconClassName="text-green-500"
      />

      <StatCard
        title="Finished"
        value={stats.finished}
        href="/dashboard/tournaments"
        icon={CalendarDays}
        iconClassName="text-blue-500"
      />

      <StatCard
        title="Teams"
        value={stats.teams}
        href="/dashboard/teams"
        icon={Users}
        iconClassName="text-purple-500"
      />

      <StatCard
        title="Players"
        value={stats.players}
        href="/dashboard/players"
        icon={User}
        iconClassName="text-cyan-500"
      />

      <StatCard
        title="Matches"
        value={stats.matches}
        href="/dashboard/matches"
        icon={Swords}
        iconClassName="text-red-500"
      />
    </div>
  );
}
