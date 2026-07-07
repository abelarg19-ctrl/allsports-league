"use client";

import { useEffect, useState } from "react";

import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";
import { TeamService } from "@/services/team.service";

type Props = {
  tournamentId: number;
};

type TeamMap = Record<
  number,
  {
    id: number;
    name: string;
    logo_url: string | null;
  }
>;

export default function EnterResultsPage({
  tournamentId,
}: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamMap>({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(
    null
  );

  useEffect(() => {
    load();
  }, [tournamentId]);

  async function load() {
    try {
      setLoading(true);

      const data =
        await MatchService.getByTournament(
          tournamentId
        );

      setMatches(data);

      const ids = [
        ...new Set(
          data.flatMap((m) => [
            m.home_team_id,
            m.away_team_id,
          ])
        ),
      ];

      const names =
        await TeamService.getNames(ids);

      const map: TeamMap = {};

      ids.forEach((id) => {
        map[id] = {
          id,
          name: names[id] ?? `Team ${id}`,
          logo_url: null,
        };
      });

      setTeams(map);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function updateScore(
    matchId: number,
    field: "home_score" | "away_score",
    value: number
  ) {
    setMatches((current) =>
      current.map((m) =>
        m.id === matchId
          ? {
              ...m,
              [field]: value,
            }
          : m
      )
    );
  }  async function save(match: Match) {
    try {
      setSaving(match.id);

      await MatchService.updateResult(
        match.id,
        Number(match.home_score),
        Number(match.away_score)
      );

      await MatchService.finishMatch(match.id);

      await load();
    } catch (error) {
      console.error(error);
      alert("Unable to save result.");
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        Loading matches...
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="rounded-xl bg-gray-900 p-6 text-center text-gray-400">
        No matches generated yet.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">
        Enter Results
      </h1>

      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border border-gray-800 bg-gray-900 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="font-semibold">
              Round {match.round}
            </span>

            <span className="rounded bg-gray-800 px-3 py-1 text-sm">
              {match.status}
            </span>
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <div className="font-medium">
              {teams[match.home_team_id]?.name ??
                `Team ${match.home_team_id}`}
            </div>

            <input
              type="number"
              min={0}
              className="rounded border bg-gray-800 p-2 text-center"
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
              className="rounded border bg-gray-800 p-2 text-center"
              value={match.away_score}
              onChange={(e) =>
                updateScore(
                  match.id,
                  "away_score",
                  Number(e.target.value)
                )
              }
            />

            <div className="text-right font-medium">
              {teams[match.away_team_id]?.name ??
                `Team ${match.away_team_id}`}
            </div>
          </div>          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save(match)}
              disabled={saving === match.id}
              className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving === match.id
                ? "Saving..."
                : "Save Result"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}