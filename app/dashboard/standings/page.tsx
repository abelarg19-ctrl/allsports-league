"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import {
  Standing,
  Tournament,
} from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { MatchService } from "@/services/match.service";
import { StandingService } from "@/services/standing.service";

export default function StandingsPage() {
  const [tournaments, setTournaments] =
    useState<Tournament[]>([]);

  const [selectedTournamentId, setSelectedTournamentId] =
    useState<number | null>(null);

  const [standings, setStandings] =
    useState<Standing[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    void loadTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournamentId === null) {
      setStandings([]);
      return;
    }

    void loadStandings(selectedTournamentId);
  }, [selectedTournamentId]);

  async function loadTournaments() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const accessibleTournaments =
        await TournamentService.getAccessibleTournaments(
          user.id
        );

      setTournaments(accessibleTournaments);

      if (accessibleTournaments.length > 0) {
        setSelectedTournamentId(
          accessibleTournaments[0].id
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadStandings(
    tournamentId: number
  ) {
    try {
      setLoading(true);

      const [matches, teams] =
        await Promise.all([
          MatchService.getByTournament(
            tournamentId
          ),
          TournamentService.getRegisteredTeams(
            tournamentId
          ),
        ]);

      const table =
        StandingService.calculate(
          matches,
          teams
        );

      setStandings(table);
    } catch (error) {
      console.error(error);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Standings
        </h1>

        <p className="mt-2 text-muted-foreground">
          View tournament rankings and team performance.
        </p>
      </div>

      {tournaments.length > 0 && (
        <div className="max-w-sm">
          <label className="mb-2 block text-sm font-medium">
            Tournament
          </label>

          <select
            value={
              selectedTournamentId ?? ""
            }
            onChange={(event) =>
              setSelectedTournamentId(
                Number(event.target.value)
              )
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            {tournaments.map(
              (tournament) => (
                <option
                  key={tournament.id}
                  value={tournament.id}
                >
                  {tournament.name}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          Loading standings...
        </div>
      ) : tournaments.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-muted-foreground">
          No tournaments available.
        </div>
      ) : standings.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-muted-foreground">
          No standings available yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-white/10 text-left text-sm text-muted-foreground">
              <tr>
                <th className="p-4">
                  #
                </th>

                <th className="p-4">
                  Team
                </th>

                <th className="p-4 text-center">
                  P
                </th>

                <th className="p-4 text-center">
                  W
                </th>

                <th className="p-4 text-center">
                  D
                </th>

                <th className="p-4 text-center">
                  L
                </th>

                <th className="p-4 text-center">
                  GF
                </th>

                <th className="p-4 text-center">
                  GA
                </th>

                <th className="p-4 text-center">
                  GD
                </th>

                <th className="p-4 text-center">
                  PTS
                </th>
              </tr>
            </thead>

            <tbody>
              {standings.map(
                (standing, index) => (
                  <tr
                    key={standing.team_id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="p-4 font-bold">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {standing.logo_url ? (
                          <img
                            src={
                              standing.logo_url
                            }
                            alt={
                              standing.team_name
                            }
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-white/10" />
                        )}

                        <span className="font-semibold">
                          {
                            standing.team_name
                          }
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      {standing.played}
                    </td>

                    <td className="p-4 text-center">
                      {standing.wins}
                    </td>

                    <td className="p-4 text-center">
                      {standing.draws}
                    </td>

                    <td className="p-4 text-center">
                      {standing.losses}
                    </td>

                    <td className="p-4 text-center">
                      {standing.goals_for}
                    </td>

                    <td className="p-4 text-center">
                      {
                        standing.goals_against
                      }
                    </td>

                    <td className="p-4 text-center">
                      {
                        standing.goal_difference
                      }
                    </td>

                    <td className="p-4 text-center font-bold">
                      {standing.points}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}