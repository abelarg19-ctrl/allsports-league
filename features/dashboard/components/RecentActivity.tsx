"use client";

import {
  Activity,
  Trophy,
  Users,
  Swords,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type ActivityItem = {
  id: number;
  icon: "tournament" | "team" | "match";
  title: string;
  description: string;
};

type Props = {
  items?: ActivityItem[];
};

const icons = {
  tournament: Trophy,
  team: Users,
  match: Swords,
};

const colors = {
  tournament:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  team:
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  match:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function RecentActivity({
  items = [],
}: Props) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
            <Activity className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Recent Activity
            </h2>

            <p className="text-sm text-muted-foreground">
              Latest actions across your league
            </p>
          </div>
        </div>

        {!items.length ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <Activity className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

            <p className="text-muted-foreground">
              No recent activity.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const Icon = icons[item.icon];

              return (
                <div
                  key={item.id}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-violet-500/10"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${colors[item.icon]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}