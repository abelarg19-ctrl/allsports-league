"use client";

import {
  Activity,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  tournaments: number;
  teams: number;
  matches: number;
  finishedMatches: number;
};

export default function DashboardRecentActivity({
  tournaments,
  teams,
  matches,
  finishedMatches,
}: Props) {
  const activities = [
    {
      id: "tournaments",
      icon: Trophy,
      title: `${tournaments} Tournament(s)`,
      description: "Total accessible tournaments.",
    },
    {
      id: "teams",
      icon: Users,
      title: `${teams} Team(s)`,
      description: "Teams currently managed.",
    },
    {
      id: "matches",
      icon: Swords,
      title: `${matches} Match(es)`,
      description: "Fixtures generated so far.",
    },
    {
      id: "finished",
      icon: Activity,
      title: `${finishedMatches} Finished Tournament(s)`,
      description: "Competitions completed.",
    },
  ];

  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-6">
        <h2 className="mb-6 text-lg font-bold">
          Recent Activity
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="rounded-xl bg-cyan-500/10 p-3">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                  <p className="font-semibold">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}