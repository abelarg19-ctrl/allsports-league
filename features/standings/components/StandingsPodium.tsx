"use client";

import { Crown, Medal, Trophy } from "lucide-react";

import { Standing } from "@/lib/types";

interface Props {
  standings: Standing[];
}

export default function StandingsPodium({
  standings,
}: Props) {
  const top3 = standings.slice(0, 3);

  if (top3.length === 0) return null;

  const colors = [
    {
      border: "border-yellow-400/40",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      icon: Crown,
      height: "h-72",
      label: "1st",
    },
    {
      border: "border-gray-300/30",
      bg: "bg-gray-500/10",
      text: "text-gray-300",
      icon: Medal,
      height: "h-60",
      label: "2nd",
    },
    {
      border: "border-amber-700/40",
      bg: "bg-amber-700/10",
      text: "text-amber-500",
      icon: Trophy,
      height: "h-52",
      label: "3rd",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {top3.map((team, index) => {
        const style = colors[index];
        const Icon = style.icon;

        return (
          <div
            key={team.team_id}
            className={`flex flex-col justify-end rounded-3xl border ${style.border} ${style.bg} p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2`}
          >
            <div
              className={`flex flex-col items-center justify-end rounded-2xl bg-white/5 p-6 ${style.height}`}
            >
              <Icon
                className={`mb-4 h-10 w-10 ${style.text}`}
              />

              <img
                src={
                  team.logo_url ??
                  "/team-placeholder.png"
                }
                alt={team.team_name}
                className="mb-4 h-24 w-24 rounded-full border-4 border-white object-cover"
              />

              <h2 className="text-center text-2xl font-black">
                {team.team_name}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {style.label}
              </p>

              <div className="mt-5 flex gap-6">

                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    PTS
                  </p>

                  <p className="text-3xl font-black">
                    {team.points}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    GD
                  </p>

                  <p className="text-3xl font-black">
                    {team.goal_difference}
                  </p>
                </div>

              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}