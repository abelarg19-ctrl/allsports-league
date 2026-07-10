"use client";

import {
  Trophy,
  Target,
  Shield,
  TrendingUp,
} from "lucide-react";

import { Standing } from "@/lib/types";

interface Props {
  standings: Standing[];
}

export default function StandingsStats({
  standings,
}: Props) {
  const leader = standings[0];

  const totalGoals = standings.reduce(
    (sum, team) => sum + team.goals_for,
    0
  );

  const bestAttack = standings.reduce(
    (best, current) =>
      current.goals_for > best.goals_for
        ? current
        : best,
    standings[0] ?? {
      team_name: "-",
      goals_for: 0,
    }
  );

  const bestDefense = standings.reduce(
    (best, current) =>
      current.goals_against <
      best.goals_against
        ? current
        : best,
    standings[0] ?? {
      team_name: "-",
      goals_against: 0,
    }
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              League Leader
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {leader?.team_name ?? "-"}
            </h2>
          </div>

          <Trophy className="h-10 w-10 text-yellow-400" />
        </div>

        <p className="mt-4 text-sm text-gray-300">
          {leader?.points ?? 0} pts
        </p>
      </div>

      <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Best Attack
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {bestAttack.team_name}
            </h2>
          </div>

          <Target className="h-10 w-10 text-green-400" />
        </div>

        <p className="mt-4 text-sm text-gray-300">
          {bestAttack.goals_for} Goals
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Best Defense
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {bestDefense.team_name}
            </h2>
          </div>

          <Shield className="h-10 w-10 text-cyan-400" />
        </div>

        <p className="mt-4 text-sm text-gray-300">
          {bestDefense.goals_against} Against
        </p>
      </div>

      <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Total Goals
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {totalGoals}
            </h2>
          </div>

          <TrendingUp className="h-10 w-10 text-purple-400" />
        </div>

        <p className="mt-4 text-sm text-gray-300">
          League Total
        </p>
      </div>

    </div>
  );
}