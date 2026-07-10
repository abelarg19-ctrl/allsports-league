"use client";

import Image from "next/image";
import { Crown, Star } from "lucide-react";

interface Props {
  player?: {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
    team?: string;
    rating?: number;
  };
}

export default function MatchMVP({
  player,
}: Props) {
  if (!player) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-6 text-2xl font-bold">
          MVP of the Match
        </h2>

        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <Crown className="mx-auto mb-4 h-12 w-12 text-yellow-400" />

          <p className="text-gray-400">
            MVP will be available after the match.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <Crown className="h-8 w-8 text-yellow-400" />

        <h2 className="text-3xl font-black">
          MVP of the Match
        </h2>

      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row">

        {player.avatar_url ? (
          <Image
            src={player.avatar_url}
            alt={player.first_name}
            width={140}
            height={140}
            className="h-36 w-36 rounded-full border-4 border-yellow-400 object-cover shadow-2xl"
          />
        ) : (
          <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-yellow-400 bg-slate-800 text-5xl font-black">
            {player.first_name.charAt(0)}
            {player.last_name.charAt(0)}
          </div>
        )}

        <div className="flex-1">

          <h3 className="text-4xl font-black">
            {player.first_name} {player.last_name}
          </h3>

          <p className="mt-2 text-lg text-gray-300">
            {player.team ?? "Unknown Team"}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-5 py-2">

            <Star className="h-5 w-5 text-yellow-400" />

            <span className="font-bold text-yellow-300">
              Rating {player.rating ?? 0}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}