"use client";

import {
  Trophy,
  Medal,
  Star,
  Award,
  Crown,
} from "lucide-react";

import { Player } from "@/lib/types";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  player: Player;
}

export default function PlayerAchievements({
  player,
}: Props) {
  const achievements = [
    {
      title: "Championships",
      value: 0,
      icon: Trophy,
      color: "text-yellow-400",
    },
    {
      title: "MVP Awards",
      value: 0,
      icon: Crown,
      color: "text-orange-400",
    },
    {
      title: "Golden Boots",
      value: 0,
      icon: Award,
      color: "text-cyan-400",
    },
    {
      title: "Top Scorer",
      value: 0,
      icon: Star,
      color: "text-purple-400",
    },
    {
      title: "Fair Play",
      value: 0,
      icon: Medal,
      color: "text-green-400",
    },
  ];

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10">
            <Trophy className="h-6 w-6 text-yellow-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Achievements
            </h2>

            <p className="text-sm text-muted-foreground">
              Career accomplishments
            </p>
          </div>

        </div>

        <div className="space-y-3">

          {achievements.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-yellow-400/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Icon
                      className={`h-5 w-5 ${item.color}`}
                    />
                  </div>

                  <span className="font-medium">
                    {item.title}
                  </span>

                </div>

                <span className="text-xl font-black">
                  {item.value}
                </span>
              </div>
            );
          })}

        </div>

      </CardContent>
    </Card>
  );
}