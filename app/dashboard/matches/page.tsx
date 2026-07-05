"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Tournament } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { MatchService } from "@/services/match.service";

export default function MatchesPage() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const tournaments =
        await TournamentService.getAll(user.id);

      const allMatches: any[] = [];

      for (const tournament of tournaments as Tournament[]) {
        const list = await MatchService.getByTournament(
          tournament.id
        );

        list.forEach((match) =>
          allMatches.push({
            ...match,
            tournamentName: tournament.name,
          })
        );
      }

      setMatches(allMatches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Matches
        </h1>

        <p className="text-muted-foreground">
          All generated tournament matches.
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">
          Loading matches...
        </p>
      ) : matches.length === 0 ? (
        <div className="rounded-xl border p-8">
          <p className="text-muted-foreground">
            No matches generated yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    {match.tournamentName}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Round {match.round}
                  </p>
                </div>

                <span className="rounded bg-gray-800 px-3 py-1 text-sm">
                  {match.status}
                </span>
              </div>

              <div className="mt-4 text-lg font-semibold">
                Team #{match.home_team_id} vs Team #{match.away_team_id}
              </div>

              <div className="mt-2 text-muted-foreground">
                {match.home_score} - {match.away_score}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}