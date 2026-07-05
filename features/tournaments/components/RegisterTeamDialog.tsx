"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Team } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { TeamService } from "@/services/team.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  tournamentId: number;
  onRegistered?: () => void;
}

export default function RegisterTeamDialog({
  tournamentId,
  onRegistered,
}: Props) {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadTeams();
    }
  }, [open]);

  async function loadTeams() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const data = await TeamService.getAll(user.id);
    setTeams(data);
  }

  async function handleRegister() {
    if (!teamId) return;

    try {
      setLoading(true);

      await TournamentService.registerTeam(
        tournamentId,
        Number(teamId)
      );

      onRegistered?.();
      setOpen(false);
      setTeamId("");
    } catch (error) {
      console.error(error);
      alert("Unable to register team.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button>Register Team</Button>}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Team</DialogTitle>
          <DialogDescription>
            Select a team to register.
          </DialogDescription>
        </DialogHeader>

        <Select
  value={teamId}
  onValueChange={(value) => setTeamId(value ?? "")}
>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>

          <SelectContent>
            {teams.map((team) => (
              <SelectItem
                key={team.id}
                value={String(team.id)}
              >
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleRegister}
          disabled={!teamId || loading}
        >
          {loading ? "Registering..." : "Register Team"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}