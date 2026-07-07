"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { MatchService } from "@/services/match.service";

type EditableMatch = {
  id: number;
  round: number;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  status: string;
};

export default function TournamentResultsPage() {
  const { id } = useParams();

  const tournamentId = Number(id);

  const [matches, setMatches] = useState<EditableMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    if (!Number.isNaN(tournamentId)) {
      loadMatches();
    }
  }, [tournamentId]);

  async function loadMatches() {
    setLoading(true);

    try {
      const data = await MatchService.getByTournament(tournamentId);
      setMatches(data as EditableMatch[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function save(match: EditableMatch) {
    try {
      setSavingId(match.id);

      await MatchService.updateResult(
        match.id,
        Number(match.home_score),
        Number(match.away_score)
      );

      await MatchService.finishMatch(match.id);

      await loadMatches();
    } catch (error) {
      console.error("Error saving result:", error);
      alert("Failed to save match result.");
    } finally {
      setSavingId(null);
    }
  }

  function updateScore(
    matchId: number,
    field: "home_score" | "away_score",
    value: number
  ) {
    setMatches((current) =>
      current.map((match) =>
        match.id === matchId
          ? {
              ...match,
              [field]: value,
            }
          : match
      )
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading results...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Enter Results
      </h1>

      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border border-gray-700 bg-gray-900 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold">
              Round {match.round}
            </span>

            <span
              className={`rounded px-3 py-1 text-xs ${
                match.status === "Finished"
                  ? "bg-green-600"
                  : "bg-yellow-600"
              }`}
            >
              {match.status}
            </span>
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <div>Team #{match.home_team_id}</div>

            <input
              type="number"
              min={0}
              className="rounded border border-gray-700 bg-gray-800 p-2 text-center"
              value={match.home_score}
              onChange={(e) =>
                updateScore(
                  match.id,
                  "home_score",
                  Number(e.target.value)
                )
              }
            />

            <div className="text-center font-bold">
              VS
            </div>

            <input
              type="number"
              min={0}
              className="rounded border border-gray-700 bg-gray-800 p-2 text-center"
              value={match.away_score}
              onChange={(e) =>
                updateScore(
                  match.id,
                  "away_score",
                  Number(e.target.value)
                )
              }
            />

            <div>Team #{match.away_team_id}</div>
          </div>

          <button
            onClick={() => save(match)}
            disabled={savingId === match.id}
            className="mt-5 rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingId === match.id
              ? "Saving..."
              : "Save Result"}
          </button>
        </div>
      ))}
    </div>
  );
}