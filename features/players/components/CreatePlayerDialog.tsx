"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
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

interface Props {
  teamId: number;
  onCreated?: () => void;
}

export default function CreatePlayerDialog({
  teamId,
  onCreated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: PlayerFormValues) {
    try {
      setLoading(true);

     const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  throw new Error("User not authenticated");
}

await PlayerService.create({
  owner_id: user.id,
        team_id: teamId,

        first_name: values.first_name,
        last_name: values.last_name,
        nickname: values.nickname ?? null,
        number: values.number ?? null,
        position: values.position ?? null,

        avatar_url: null,
        country: null,
        city: null,
        birth_date: null,
        bio: null,

        wins: 0,
        losses: 0,
        draws: 0,
        goals: 0,
        assists: 0,
        mvp: 0,
        elo: 1000,

        is_active: true,
      });

      onCreated?.();

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to create player.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button>
            + Add Player
          </Button>
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Player</DialogTitle>

          <DialogDescription>
            Add a new player.
          </DialogDescription>
        </DialogHeader>

        <PlayerForm
          mode="create"
          loading={loading}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}