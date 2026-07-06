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
  const [teamId, setTeamId] = useState("");
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

    const myTeams = await TeamService.getAll(user.id);

    const registered =
      await TournamentService.getRegisteredTeams(
        tournamentId
      );

    const registeredIds = new Set(
      registered.map((team) => team.id)
    );

    setTeams(
      myTeams.filter(
        (team) => !registeredIds.has(team.id)
      )
    );
  }

  async function handleRegister() {
    if (!teamId) return;

    try {
      setLoading(true);

      await TournamentService.registerTeam(
        tournamentId,
        Number(teamId)
      );

      alert("Team registered successfully.");

      setTeamId("");
      setOpen(false);

      onRegistered?.();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "Unable to register team."
      );
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
        render={<Button>Register Team</Button>}
      />

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Register Team
          </DialogTitle>

          <DialogDescription>
            Select one of your teams.
          </DialogDescription>

        </DialogHeader>

        {teams.length === 0 ? (
          <div className="rounded-lg border p-4 text-center text-sm text-gray-400">
            All your teams are already registered.
          </div>
        ) : (
          <>
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
              {loading
                ? "Registering..."
                : "Register Team"}
            </Button>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}