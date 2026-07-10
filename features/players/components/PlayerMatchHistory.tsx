"use client";

import { CalendarDays, Clock3, Trophy } from "lucide-react";

import { Player } from "@/lib/types";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  player: Player;
}

export default function PlayerMatchHistory({
  player,
}: Props) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
            <CalendarDays className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Match History
            </h2>

            <p className="text-sm text-muted-foreground">
              Recent matches
            </p>
          </div>
        </div>

        <div className="space-y-4">

          {[1, 2, 3, 4, 5].map((match) => (
            <div
              key={match}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              <div>

                <h3 className="font-semibold">
                  Match #{match}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  Pending Statistics
                </div>

              </div>

              <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                <Trophy className="h-4 w-4" />
                Soon
              </div>

            </div>
          ))}

        </div>

      </CardContent>
    </Card>
  );
}