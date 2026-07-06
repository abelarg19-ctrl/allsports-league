"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Match, Standing, Team, Tournament } from "@/lib/types";

import { MatchService } from "@/services/match.service";
import { StandingService } from "@/services/standing.service";
import { TournamentService } from "@/services/tournament.service";

import StandingsTable from "@/features/standings/components/StandingsTable";

export default function StandingsPage() {
  const [loading, setLoading] = useState(true);

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] =
    useState<number | null>(null);

  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    void loadTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournament !== null) {
      void loadStandings(selectedTournament);
    }
  }, [selectedTournament]);

  async function loadTournaments() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setTournaments([]);
        setSelectedTournament(null);
        setStandings([]);
        return;
      }

      const list = await TournamentService.getAll(user.id);

      setTournaments(list);

      if (list.length > 0) {
        setSelectedTournament((current) => current ?? list[0].id);
      } else {
        setSelectedTournament(null);
        setStandings([]);
      }
    } catch (error) {
      console.error(error);
      setTournaments([]);
      setSelectedTournament(null);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadStandings(tournamentId: number) {
    try {
      setLoading(true);

      const [matches, teams] = await Promise.all([
        MatchService.getByTournament(tournamentId),
        TournamentService.getRegisteredTeams(tournamentId),
      ]);

      setStandings(
        StandingService.calculate(
          matches as Match[],
          teams as Team[]
        )
      );
    } catch (error) {
      console.error(error);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Standings</h1>

        <p className="text-muted-foreground">
          Current tournament standings.
        </p>
      </div>

      <div>
        <select
          className="rounded-md border bg-background px-3 py-2"
          value={selectedTournament ?? ""}
          onChange={(e) =>
            setSelectedTournament(Number(e.target.value))
          }
          disabled={tournaments.length === 0}
        >
          {tournaments.length === 0 ? (
            <option value="">No tournaments</option>
          ) : (
            tournaments.map((tournament) => (
              <option
                key={tournament.id}
                value={tournament.id}
              >
                {tournament.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="rounded-xl border p-6">
        <StandingsTable
          standings={standings}
          loading={loading}
        />
      </div>
    </div>
  );
}