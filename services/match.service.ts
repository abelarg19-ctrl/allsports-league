import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

export class MatchService {
  static async getByTournament(
    tournamentId: number
  ): Promise<Match[]> {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("tournament_id", tournamentId)
      .order("round", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Match[];
  }

  static async getById(id: number): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

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

    if (error) throw error;

    return data as Match;
  }

  static async update(
    id: number,
    updates: Partial<Match>
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Match;
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("matches")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  static async generateRoundRobin(
    tournamentId: number
  ): Promise<void> {
    const teams =
      await TournamentService.getRegisteredTeams(
        tournamentId
      );

    if (teams.length < 2) {
      throw new Error("At least 2 teams are required.");
    }

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        await this.create({
          tournament_id: tournamentId,
          home_team_id: teams[i].id,
          away_team_id: teams[j].id,
          home_score: 0,
          away_score: 0,
          round: 1,
          status: "Pending",
          starts_at: null,
        });
      }
    }
  }
}