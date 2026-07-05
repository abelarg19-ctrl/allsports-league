"use client";

import { useState } from "react";

import { Player } from "@/lib/types";
import { PlayerService } from "@/features/players/services/player.service";

import PlayerForm, {
  PlayerFormValues,
} from "./PlayerForm";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";

interface Props {
  player: Player;
  onUpdated: (player: Player) => void;
}

export default function EditPlayerDialog({
  player,
  onUpdated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: PlayerFormValues) {
    try {
      setLoading(true);

      const updated = await PlayerService.update(player.id, {
        first_name: values.first_name,
        last_name: values.last_name,
        nickname: values.nickname ?? null,
        number: values.number ?? null,
        position: values.position ?? null,
      });

      onUpdated(updated);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to update player.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>

          <DialogDescription>
            Update player information.
          </DialogDescription>
        </DialogHeader>

        <PlayerForm
          mode="edit"
          loading={loading}
          defaultValues={{
            first_name: player.first_name,
            last_name: player.last_name,
            nickname: player.nickname ?? "",
            number: player.number ?? undefined,
            position: player.position ?? "",
          }}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}