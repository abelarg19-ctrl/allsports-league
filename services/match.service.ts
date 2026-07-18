import { supabase } from "@/lib/supabase";
import { getSupabaseErrorMessage } from "@/lib/supabase-error";
import { Match } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

export class MatchService {
  static async getCountByTournaments(
    tournamentIds: number[]
  ): Promise<number> {
    if (tournamentIds.length === 0) {
      return 0;
    }

    const { count, error } = await supabase
      .from("matches")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("tournament_id", tournamentIds);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return count ?? 0;
  }

  static async getByTournaments(
    tournamentIds: number[]
  ): Promise<Match[]> {
    if (tournamentIds.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .in("tournament_id", tournamentIds)
      .order("tournament_id", {
        ascending: true,
      })
      .order("round", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      });

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getByTournament(
    tournamentId: number
  ): Promise<Match[]> {
    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .eq("tournament_id", tournamentId)
      .order("round", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      });

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getUpcomingByTournament(
    tournamentId: number,
    limit = 5
  ): Promise<Match[]> {
    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .eq("tournament_id", tournamentId)
      .eq("status", "Pending")
      .order("round", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      })
      .limit(limit);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getUpcoming(
    tournamentIds: number[],
    limit = 5
  ): Promise<Match[]> {
    if (tournamentIds.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .in("tournament_id", tournamentIds)
      .eq("status", "Pending")
      .order("starts_at", {
        ascending: true,
        nullsFirst: false,
      })
      .order("id", {
        ascending: true,
      })
      .limit(limit);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getRecentResultsByTournament(
    tournamentId: number,
    limit = 5
  ): Promise<Match[]> {
    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .eq("tournament_id", tournamentId)
      .eq("status", "Finished")
      .order("id", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getRecentResults(
    tournamentIds: number[],
    limit = 5
  ): Promise<Match[]> {
    if (tournamentIds.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .in("tournament_id", tournamentIds)
      .eq("status", "Finished")
      .order("id", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return (data ?? []) as Match[];
  }

  static async getById(
    id: number
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        tournament_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        round,
        status,
        starts_at
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async create(
    match: Omit<Match, "id">
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .insert(match)
      .select()
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async update(
    id: number,
    updates: Partial<Match>
  ): Promise<Match> {
    if (Object.keys(updates).length === 0) {
      return this.getById(id);
    }

    const { data, error } = await supabase
      .from("matches")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async updateResult(
    id: number,
    homeScore: number,
    awayScore: number
  ): Promise<Match> {
    const status =
      homeScore === null || awayScore === null
        ? "Pending"
        : "Finished";

    const { data, error } = await supabase
      .from("matches")
      .update({
        home_score: homeScore,
        away_score: awayScore,
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async finishMatch(
    id: number
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .update({
        status: "Finished",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async reopenMatch(
    id: number
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .update({
        status: "Pending",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }

    return data as Match;
  }

  static async delete(
    id: number
  ): Promise<void> {
    const { error } = await supabase
      .from("matches")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }
  }

  static async generateRoundRobin(
    tournamentId: number
  ): Promise<void> {
    const teams =
      await TournamentService.getRegisteredTeams(
        tournamentId
      );

    if (teams.length < 2) {
      throw new Error(
        "At least 2 teams are required."
      );
    }

    const matches: Omit<Match, "id">[] = [];

    let round = 1;

    for (let i = 0; i < teams.length; i++) {
      for (
        let j = i + 1;
        j < teams.length;
        j++
      ) {
        matches.push({
          tournament_id: tournamentId,
          home_team_id: teams[i].id,
          away_team_id: teams[j].id,
          home_score: 0,
          away_score: 0,
          round,
          status: "Pending",
          starts_at: null,
        });

        round++;
      }
    }

    const { error } = await supabase
      .from("matches")
      .insert(matches);

    if (error) {
      throw new Error(
        getSupabaseErrorMessage(error)
      );
    }
  }
}