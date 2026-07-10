"use client";

import Image from "next/image";
import { Shield, Star, Hash } from "lucide-react";

import { Player } from "@/lib/types";

interface Props {
  player: Player;
}

export default function PlayerProfileHeader({
  player,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="relative h-56 w-full bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900">

        <div className="absolute inset-0 bg-black/30" />

      </div>

      <div className="relative -mt-20 flex flex-col gap-6 px-8 pb-8 lg:flex-row lg:items-end lg:justify-between">

        <div className="flex items-end gap-6">

          {player.avatar_url ? (
            <Image
              src={player.avatar_url}
              alt={`${player.first_name} ${player.last_name}`}
              width={160}
              height={160}
              className="h-40 w-40 rounded-full border-4 border-background object-cover shadow-2xl"
            />
          ) : (
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-background bg-slate-800 text-6xl font-black shadow-2xl">
              {player.first_name.charAt(0)}
              {player.last_name.charAt(0)}
            </div>
          )}

          <div className="pb-2">

            <h1 className="text-5xl font-black tracking-tight">
              {player.first_name} {player.last_name}
            </h1>

            <p className="mt-2 text-lg text-gray-400">
              {player.nickname || "No nickname"}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span>{player.position || "Unknown Position"}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2">
                <Hash className="h-4 w-4 text-blue-400" />
                <span>#{player.number ?? "--"}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-yellow-500/10 px-4 py-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>ELO {player.elo}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}