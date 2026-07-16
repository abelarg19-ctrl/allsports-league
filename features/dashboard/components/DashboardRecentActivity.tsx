"use client";

import {
  Activity,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 text-base font-bold sm:mb-6 sm:text-lg">
          Recent Activity
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10 sm:gap-4 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold sm:text-base">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
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
