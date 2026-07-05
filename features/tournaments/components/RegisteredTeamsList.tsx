"use client";

import { useEffect, useState } from "react";

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
          className="rounded-lg border border-gray-800 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {team.name}
              </h3>

              <p className="text-sm text-gray-400">
                {team.tag}
              </p>
            </div>

            <span className="text-sm text-gray-400">
              ELO {team.elo}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}