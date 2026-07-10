"use client";

import { Shield, Users } from "lucide-react";

import { Player } from "@/lib/types";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  player: Player;
}

export default function PlayerTeams({
  player,
}: Props) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
            <Shield className="h-6 w-6 text-blue-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Current Team
            </h2>

            <p className="text-sm text-muted-foreground">
              Active organization
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl">
              🛡️
            </div>

            <div className="flex-1">

              <h3 className="text-lg font-bold">
                Team #{player.team_id}
              </h3>

              <p className="text-sm text-muted-foreground">
                Team integration coming soon
              </p>

            </div>

            <Users className="h-6 w-6 text-cyan-400" />

          </div>

        </div>

      </CardContent>
    </Card>
  );
}
