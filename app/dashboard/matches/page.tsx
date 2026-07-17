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

type MatchWithTournament = Match & {
  tournamentName: string;
  canEdit: boolean;
};

export default function MatchesPage() {
  const [loading, setLoading] = useState(true);

  const [matches, setMatches] = useState<
    MatchWithTournament[]
  >([]);

  const [teams, setTeams] = useState<TeamMap>({});

  const [selectedMatch, setSelectedMatch] =
    useState<MatchWithTournament | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  useEffect(() => {
    void loadMatches();
  }, []);

  async function loadMatches() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

     const tournaments =
  await TournamentService.getAccessibleTournaments(user.id);

      const tournamentMatches = await Promise.all(
        (tournaments as Tournament[]).map(
          async (tournament) => {
            const [list, canEdit] =
              await Promise.all([
                MatchService.getByTournament(
                  tournament.id
                ),
                TournamentService.isTournamentAdmin(
                  tournament.id,
                  user.id
                ),
              ]);

            return list.map((match) => ({
              ...match,
              tournamentName: tournament.name,
              canEdit,
            }));
          }
        )
      );

      const allMatches: MatchWithTournament[] =
        tournamentMatches.flat();

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

  function openResultDialog(
    match: MatchWithTournament
  ) {
    if (!match.canEdit) return;

    setSelectedMatch(match);
    setDialogOpen(true);
  }

  async function handleSaved() {
    await loadMatches();
  }

  return (
    <div className="space-y-5 sm:space-y-6">

      <div>

        <h1 className="text-3xl font-black sm:text-4xl">
          Matches
        </h1>

        <p className="text-muted-foreground">
          All generated tournament matches.
        </p>

      </div>      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl sm:p-8">
          No matches generated.
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5"
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

                <div className="flex items-center gap-3">

                  <span className="rounded bg-gray-800 px-3 py-1 text-sm">
                    {match.status}
                  </span>

                  {match.canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        openResultDialog(match)
                      }
                    >
                      Edit Result
                    </Button>
                  )}

                </div>

              </div>

              <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-white/10 pt-5 sm:mt-6 sm:gap-4">

                <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">

                  <img
                    src={
                      teams[match.home_team_id]?.logo_url ??
                      "/team-placeholder.png"
                    }
                    className="h-10 w-10 shrink-0 rounded-full border object-cover sm:h-12 sm:w-12"
                    alt=""
                  />

                  <span className="font-semibold">
                    {teams[match.home_team_id]?.name ??
                      "Unknown"}
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

                <div className="flex min-w-0 flex-col-reverse items-center gap-2 sm:flex-row sm:justify-end sm:gap-3">

                  <span className="font-semibold">
                    {teams[match.away_team_id]?.name ??
                      "Unknown"}
                  </span>

                  <img
                    src={
                      teams[match.away_team_id]?.logo_url ??
                      "/team-placeholder.png"
                    }
                    className="h-10 w-10 shrink-0 rounded-full border object-cover sm:h-12 sm:w-12"
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