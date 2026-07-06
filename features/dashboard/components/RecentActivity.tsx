"use client";

import {
  Activity,
  Trophy,
  Users,
  Swords,
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

export default function RecentActivity({
  items = [],
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <h2 className="text-lg font-bold">
            Recent Activity
          </h2>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const Icon = icons[item.icon];

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <Icon className="mt-1 h-5 w-5 text-primary" />

                  <div>
                    <p className="font-medium">
                      {item.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}