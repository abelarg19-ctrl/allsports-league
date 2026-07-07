"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Lock } from "lucide-react";

import { MatchService } from "@/services/match.service";
import { TeamService } from "@/services/team.service";

type EditableMatch = {
  id: number;
  round: number;
  home_team_id: number;
  away_team_id: number;
  home_score: number;
  away_score: number;
  status: string;
};

type TeamInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

export default function TournamentResultsPage() {
  const { id } = useParams();

  const tournamentId = Number(id);

  const [matches, setMatches] = useState<EditableMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  const [teams, setTeams] = useState<
    Record<number, TeamInfo>
  >({});

  useEffect(() => {
    if (!Number.isNaN(tournamentId)) {
      void loadMatches();
    }
  }, [tournamentId]);

  async function loadMatches() {
    setLoading(true);

    try {
      const data = await MatchService.getByTournament(
        tournamentId
      );

      const parsed = data as EditableMatch[];

      setMatches(parsed);

      const ids = Array.from(
        new Set(
          parsed.flatMap((match) => [
            match.home_team_id,
            match.away_team_id,
          ])
        )
      );

      const infos =
        await TeamService.getBasicInfos(ids);

      setTeams(infos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function save(match: EditableMatch) {
    if (match.status === "Finished") {
      return;
    }

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
      console.error(error);
      alert("Failed to save result.");
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
      <div className="p-6 text-muted-foreground">
        Loading results...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Enter Results
        </h1>

        <p className="mt-2 text-muted-foreground">
          Finished matches become read-only.
        </p>
      </div>

      {matches.map((match) => {
        const home = teams[match.home_team_id];
        const away = teams[match.away_team_id];

        const locked =
          match.status === "Finished";

        return (
          <div
            key={match.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                Round {match.round}
              </span>

              {locked ? (
                <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-400">
                  <Lock className="h-3.5 w-3.5" />
                  Locked
                </span>
              ) : (
                <span className="rounded-full bg-yellow-500/10 px-4 py-1 text-xs font-semibold text-yellow-400">
                  Pending
                </span>
              )}
            </div>

            <div className="grid grid-cols-5 items-center gap-4">

              <div className="flex items-center gap-3">
                {home?.logo_url && (
                  <Image
                    src={home.logo_url}
                    alt={home.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}

                <span className="font-semibold">
                  {home?.name ?? "Loading..."}
                </span>
              </div>

              <input
                type="number"
                min={0}
                disabled={locked}
                className="rounded-xl border border-white/10 bg-black/20 p-3 text-center disabled:cursor-not-allowed disabled:opacity-50"
                value={match.home_score}
                onChange={(e) =>
                  updateScore(
                    match.id,
                    "home_score",
                    Number(e.target.value)
                  )
                }
              />

              <div className="text-center text-xl font-bold">
                VS
              </div>

              <input
                type="number"
                min={0}
                disabled={locked}
                className="rounded-xl border border-white/10 bg-black/20 p-3 text-center disabled:cursor-not-allowed disabled:opacity-50"
                value={match.away_score}
                onChange={(e) =>
                  updateScore(
                    match.id,
                    "away_score",
                    Number(e.target.value)
                  )
                }
              />

              <div className="flex items-center justify-end gap-3">
                <span className="font-semibold">
                  {away?.name ?? "Loading..."}
                </span>

                {away?.logo_url && (
                  <Image
                    src={away.logo_url}
                    alt={away.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
            </div>

            {locked ? (
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                This match has been finalized. Only tournament administrators can modify it.
              </div>
            ) : (
              <button
                onClick={() => save(match)}
                disabled={savingId === match.id}
                className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
              >
                {savingId === match.id
                  ? "Saving..."
                  : "Save Result"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}