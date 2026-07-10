"use client";

import {
  Trophy,
  Target,
  Star,
  Swords,
  TrendingUp,
  Shield,
} from "lucide-react";

import { Player } from "@/lib/types";

interface Props {
  player: Player;
}

export default function PlayerStats({
  player,
}: Props) {
  const stats = [
    {
      title: "ELO",
      value: player.elo,
      icon: TrendingUp,
      color: "text-cyan-400",
    },
    {
      title: "Matches",
      value: 0,
      icon: Swords,
      color: "text-blue-400",
    },
    {
      title: "Goals",
      value: 0,
      icon: Target,
      color: "text-green-400",
    },
    {
      title: "Assists",
      value: 0,
      icon: Shield,
      color: "text-purple-400",
    },
    {
      title: "MVP",
      value: 0,
      icon: Star,
      color: "text-yellow-400",
    },
    {
      title: "Trophies",
      value: 0,
      icon: Trophy,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {stat.value}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
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