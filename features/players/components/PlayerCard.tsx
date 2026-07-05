"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Player } from "@/lib/types";

import { PlayerService } from "@/features/players/services/player.service";
import EditPlayerDialog from "./EditPlayerDialog";
import UploadPlayerAvatar from "./UploadPlayerAvatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlayerCardProps {
  player: Player;
  onUpdated: (player: Player) => void;
  onDeleted: (id: number) => void;
}

export default function PlayerCard({
  player,
  onUpdated,
  onDeleted,
}: PlayerCardProps) {
  const [currentPlayer, setCurrentPlayer] = useState(player);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${currentPlayer.first_name} ${currentPlayer.last_name}?`
    );

    if (!confirmed) return;

    try {
      await PlayerService.delete(currentPlayer.id);
      onDeleted(currentPlayer.id);
    } catch (error) {
      console.error(error);
      alert("Unable to delete player.");
    }
  }

  function handleAvatarUploaded(url: string) {
    const updated = {
      ...currentPlayer,
      avatar_url: url,
    };

    setCurrentPlayer(updated);
    onUpdated(updated);
  }

  function handlePlayerUpdated(updated: Player) {
    setCurrentPlayer(updated);
    onUpdated(updated);
  }

  return (
    <Card className="transition-all hover:border-primary">
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {currentPlayer.avatar_url ? (
              <Image
                src={currentPlayer.avatar_url}
                alt={`${currentPlayer.first_name} ${currentPlayer.last_name}`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover border"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                {currentPlayer.first_name.charAt(0)}
                {currentPlayer.last_name.charAt(0)}
              </div>
            )}

            <UploadPlayerAvatar
              playerId={currentPlayer.id}
              onUploaded={handleAvatarUploaded}
            />
          </div>

          <div>
            <h3 className="font-semibold">
              {currentPlayer.first_name} {currentPlayer.last_name}
            </h3>

            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{currentPlayer.position || "No position"}</span>
              <span>•</span>
              <span>#{currentPlayer.number ?? "--"}</span>
              <span>•</span>
              <span>ELO {currentPlayer.elo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EditPlayerDialog
            player={currentPlayer}
            onUpdated={handlePlayerUpdated}
          />

          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}