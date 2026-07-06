"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Match, Tournament } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { MatchService } from "@/services/match.service";

import { Button } from "@/components/ui/button";
import MatchResultDialog from "@/features/matches/components/MatchResultDialog";

type TeamMap = {
  [key: string]: {
    name: string;
    logo_url: string | null;
  };
};

export default function MatchesPage() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamMap>({});

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

      const tournaments = await TournamentService.getAll(user.id);

      const allMatches: Match[] = [];

      for (const tournament of tournaments as Tournament[]) {
        const list = await MatchService.getByTournament(tournament.id);

        list.forEach((match) =>
          allMatches.push({
            ...match,
            tournamentName: tournament.name,
          } as Match)
        );
      }

      const ids = [
        ...new Set(
          allMatches.flatMap((m) => [
            m.home_team_id,
            m.away_team_id,
          ])
        ),
      ];

      const { data: teamsData } = await supabase
        .from("teams")
        .select("id,name,logo_url")
        .in("id", ids);

      const map: TeamMap = {};

      teamsData?.forEach((team) => {
        map[team.id] = {
          name: team.name,
          logo_url: team.logo_url,
        };
      });

      setTeams(map);
      setMatches(allMatches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function openResultDialog(match: Match) {
    setSelectedMatch(match);
    setDialogOpen(true);
  }

  async function handleSaved() {
    await loadMatches();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Matches</h1>

        <p className="text-muted-foreground">
          All generated tournament matches.
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <div className="rounded-xl border p-8">
          No matches generated.
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
                    {(match as any).tournamentName}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Round {match.round}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded bg-gray-800 px-3 py-1 text-sm">
                    {match.status}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openResultDialog(match)}
                  >
                    Edit Result
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex w-2/5 items-center gap-3">
                  <img
                    src={
                      teams[match.home_team_id]?.logo_url ??
                      "/team-placeholder.png"
                    }
                    className="h-12 w-12 rounded-full border object-cover"
                    alt=""
                  />

                  <span className="font-semibold">
                    {teams[match.home_team_id]?.name ?? "Unknown"}
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {match.home_score} - {match.away_score}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    VS
                  </div>
                </div>

                <div className="flex w-2/5 items-center justify-end gap-3">
                  <span className="font-semibold">
                    {teams[match.away_team_id]?.name ?? "Unknown"}
                  </span>

                  <img
                    src={
                      teams[match.away_team_id]?.logo_url ??
                      "/team-placeholder.png"
                    }
                    className="h-12 w-12 rounded-full border object-cover"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMatch && (
        <MatchResultDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          match={selectedMatch}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}