"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MatchService } from "@/services/match.service";

export default function TournamentResultsPage() {
  const { id } = useParams();

  const tournamentId = Number(id);

  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    setLoading(true);

    try {
      const data =
        await MatchService.getByTournament(tournamentId);

      setMatches(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(match: any) {
    await MatchService.updateResult(
      match.id,
      Number(match.home_score),
      Number(match.away_score)
    );

    loadMatches();
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Enter Results
      </h1>

      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border bg-gray-900 p-5"
        >
          <div className="mb-4 font-semibold">
            Round {match.round}
          </div>

          <div className="grid grid-cols-5 items-center gap-4">

            <div>
              Team #{match.home_team_id}
            </div>

            <input
              type="number"
              className="rounded border bg-gray-800 p-2"
              value={match.home_score}
              onChange={(e) => {
                const value = [...matches];
                value.find(
                  (m) => m.id === match.id
                ).home_score = Number(e.target.value);
                setMatches(value);
              }}
            />

            <div className="text-center">
              VS
            </div>

            <input
              type="number"
              className="rounded border bg-gray-800 p-2"
              value={match.away_score}
              onChange={(e) => {
                const value = [...matches];
                value.find(
                  (m) => m.id === match.id
                ).away_score = Number(e.target.value);
                setMatches(value);
              }}
            />

            <div>
              Team #{match.away_team_id}
            </div>

          </div>

          <button
            onClick={() => save(match)}
            className="mt-4 rounded bg-green-600 px-4 py-2 hover:bg-green-700"
          >
            Save Result
          </button>

        </div>
      ))}
    </div>
  );
}