"use client";

import { Player } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Calendar, Info } from "lucide-react";

interface Props {
  player: Player;
}

export default function PlayerBio({
  player,
}: Props) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
            <User className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Player Bio
            </h2>

            <p className="text-sm text-muted-foreground">
              Personal information
            </p>
          </div>
        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-cyan-400" />

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Nickname
              </p>

              <p className="font-medium">
                {player.nickname || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-cyan-400" />

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Position
              </p>

              <p className="font-medium">
                {player.position || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-cyan-400" />

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Jersey Number
              </p>

              <p className="font-medium">
                #{player.number ?? "--"}
              </p>
            </div>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}