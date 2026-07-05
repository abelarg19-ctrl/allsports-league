"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Team } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

interface Props {
  tournamentId: number;
}

export default function RegisteredTeamsList({
  tournamentId,
}: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, [tournamentId]);

  async function loadTeams() {
    try {
      setLoading(true);

      const data =
        await TournamentService.getRegisteredTeams(
          tournamentId
        );

      setTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="text-gray-400">
        Loading teams...
      </p>
    );
  }

  if (teams.length === 0) {
    return (
      <p className="text-gray-400">
        No teams registered yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:border-primary"
        >
          <div className="flex items-center gap-4">
            {team.logo_url ? (
              <Image
                src={team.logo_url}
                alt={team.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {team.name.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="font-semibold">
                {team.name}
              </h3>

              <p className="text-sm text-gray-400">
                {team.tag}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              ELO {team.elo}
            </p>

            <p className="text-sm text-gray-400">
              {team.wins}W · {team.losses}L
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}