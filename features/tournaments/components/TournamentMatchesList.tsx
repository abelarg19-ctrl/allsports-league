"use client";

import { useEffect, useState } from "react";

import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";

interface Props {
  tournamentId: number;
}

export default function TournamentMatchesList({
  tournamentId,
}: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [tournamentId]);

  async function loadMatches() {
    try {
      setLoading(true);

      const data = await MatchService.getByTournament(
        tournamentId
      );

      setMatches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-gray-400">Loading matches...</p>;
  }

  if (matches.length === 0) {
    return <p className="text-gray-400">No matches generated yet.</p>;
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border border-gray-800 bg-gray-900 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              Round {match.round}
            </span>

            <span className="text-sm text-gray-400">
              {match.status}
            </span>
          </div>

          <div className="mt-3 text-lg font-bold">
            Team #{match.home_team_id} vs Team #{match.away_team_id}
          </div>

          <div className="mt-2 text-sm text-gray-400">
            Score: {match.home_score} - {match.away_score}
          </div>
        </div>
      ))}
    </div>
  );
}