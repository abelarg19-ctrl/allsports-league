"use client";

import {
  Target,
  Shield,
  Trophy,
  Timer,
} from "lucide-react";

interface Props {
  home?: {
    possession?: number;
    shots?: number;
    shotsOnTarget?: number;
    corners?: number;
  };
  away?: {
    possession?: number;
    shots?: number;
    shotsOnTarget?: number;
    corners?: number;
  };
}

export default function MatchStats({
  home = {},
  away = {},
}: Props) {
  const stats = [
    {
      title: "Possession",
      icon: Timer,
      home: `${home.possession ?? 50}%`,
      away: `${away.possession ?? 50}%`,
    },
    {
      title: "Shots",
      icon: Target,
      home: home.shots ?? 0,
      away: away.shots ?? 0,
    },
    {
      title: "Shots on Target",
      icon: Trophy,
      home: home.shotsOnTarget ?? 0,
      away: away.shotsOnTarget ?? 0,
    },
    {
      title: "Corners",
      icon: Shield,
      home: home.corners ?? 0,
      away: away.corners ?? 0,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-bold">
        Match Statistics
      </h2>

      <div className="space-y-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-3 flex items-center justify-center gap-2">

                <Icon className="h-5 w-5 text-cyan-400" />

                <span className="font-semibold">
                  {stat.title}
                </span>

              </div>

              <div className="grid grid-cols-3 items-center">

                <div className="text-left text-2xl font-bold">
                  {stat.home}
                </div>

                <div className="text-center text-sm text-gray-400">
                  VS
                </div>

                <div className="text-right text-2xl font-bold">
                  {stat.away}
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}