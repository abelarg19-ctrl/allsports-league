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
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Tournaments"
        value={stats.tournaments}
        icon={Trophy}
        iconClassName="text-yellow-500"
      />

      <StatCard
        title="Active"
        value={stats.active}
        icon={Activity}
        iconClassName="text-green-500"
      />

      <StatCard
        title="Finished"
        value={stats.finished}
        icon={CalendarDays}
        iconClassName="text-blue-500"
      />

      <StatCard
        title="Teams"
        value={stats.teams}
        icon={Users}
        iconClassName="text-purple-500"
      />

      <StatCard
        title="Players"
        value={stats.players}
        icon={User}
        iconClassName="text-cyan-500"
      />

      <StatCard
        title="Matches"
        value={stats.matches}
        icon={Swords}
        iconClassName="text-red-500"
      />
    </div>
  );
}