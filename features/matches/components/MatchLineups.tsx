"use client";

import Image from "next/image";
import { Shield } from "lucide-react";

type Player = {
  id: number;
  first_name: string;
  last_name: string;
  number?: number | null;
  avatar_url?: string | null;
  position?: string | null;
};

interface Props {
  homeTeam: string;
  awayTeam: string;
  homePlayers?: Player[];
  awayPlayers?: Player[];
}

export default function MatchLineups({
  homeTeam,
  awayTeam,
  homePlayers = [],
  awayPlayers = [],
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-6 w-6 text-cyan-400" />

          <h2 className="text-2xl font-bold">
            {homeTeam}
          </h2>
        </div>

        <div className="space-y-3">

          {homePlayers.length === 0 ? (
            <p className="text-muted-foreground">
              No lineup available.
            </p>
          ) : (
            homePlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                {player.avatar_url ? (
                  <Image
                    src={player.avatar_url}
                    alt={player.first_name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                    {player.first_name[0]}
                    {player.last_name[0]}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {player.first_name} {player.last_name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    #{player.number ?? "--"} •{" "}
                    {player.position ?? "Unknown"}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-6 w-6 text-red-400" />

          <h2 className="text-2xl font-bold">
            {awayTeam}
          </h2>
        </div>

        <div className="space-y-3">

          {awayPlayers.length === 0 ? (
            <p className="text-muted-foreground">
              No lineup available.
            </p>
          ) : (
            awayPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                {player.avatar_url ? (
                  <Image
                    src={player.avatar_url}
                    alt={player.first_name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 font-bold">
                    {player.first_name[0]}
                    {player.last_name[0]}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {player.first_name} {player.last_name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    #{player.number ?? "--"} •{" "}
                    {player.position ?? "Unknown"}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}