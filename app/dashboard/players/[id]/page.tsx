"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Player } from "@/lib/types";
import { PlayerService } from "@/features/players/services/player.service";

import PlayerProfileHeader from "@/features/players/components/PlayerProfileHeader";
import PlayerStats from "@/features/players/components/PlayerStats";
import PlayerBio from "@/features/players/components/PlayerBio";
import PlayerTeams from "@/features/players/components/PlayerTeams";
import PlayerMatchHistory from "@/features/players/components/PlayerMatchHistory";
import PlayerAchievements from "@/features/players/components/PlayerAchievements";

export default function PlayerProfilePage() {
  const { id } = useParams();

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadPlayer();
  }, [id]);

  async function loadPlayer() {
    try {
      const data = await PlayerService.getById(Number(id));
      setPlayer(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Loading player...
        </p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Player not found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      <PlayerProfileHeader player={player} />

      <PlayerStats player={player} />

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="space-y-6 xl:col-span-2">
          <PlayerMatchHistory player={player} />
        </div>

        <div className="space-y-6">
          <PlayerBio player={player} />
          <PlayerTeams player={player} />
          <PlayerAchievements player={player} />
        </div>

      </div>

    </div>
  );
}