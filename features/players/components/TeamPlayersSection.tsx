"use client";

import { useEffect, useState } from "react";

import { Team, Player } from "@/lib/types";
import { PlayerService } from "@/features/players/services/player.service";

import PlayerCard from "./PlayerCard";
import CreatePlayerDialog from "./CreatePlayerDialog";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  team: Team;
}

export default function TeamPlayersSection({ team }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, [team.id]);

  async function loadPlayers() {
    try {
      setLoading(true);

      const data = await PlayerService.getByTeam(team.id);

      setPlayers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handlePlayerUpdated(updated: Player) {
    setPlayers((current) =>
      current.map((player) =>
        player.id === updated.id ? updated : player
      )
    );
  }

  function handlePlayerDeleted(id: number) {
    setPlayers((current) =>
      current.filter((player) => player.id !== id)
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Players</h2>

          <CreatePlayerDialog
            teamId={team.id}
            onCreated={loadPlayers}
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">
            Loading players...
          </p>
        ) : players.length === 0 ? (
          <p className="text-muted-foreground">
            No players registered yet.
          </p>
        ) : (
          <div className="space-y-4">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onUpdated={handlePlayerUpdated}
                onDeleted={handlePlayerDeleted}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}