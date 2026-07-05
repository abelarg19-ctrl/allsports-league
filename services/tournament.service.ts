import { supabase } from "@/lib/supabase";
import { Tournament, Team } from "@/lib/types";

export class TournamentService {
  static async getAll(userId: string): Promise<Tournament[]> {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Tournament[];
  }

  static async getById(
    id: number,
    userId: string
  ): Promise<Tournament | null> {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .eq("owner_id", userId)
      .single();

    if (error) return null;

    return data as Tournament;
  }

  static async registerTeam(
    tournamentId: number,
    teamId: number
  ): Promise<void> {
    const { error } = await supabase
      .from("tournament_teams")
      .insert({
        tournament_id: tournamentId,
        team_id: teamId,
      });

    if (error) throw error;
  }

  static async removeTeam(
    tournamentId: number,
    teamId: number
  ): Promise<void> {
    const { error } = await supabase
      .from("tournament_teams")
      .delete()
      .eq("tournament_id", tournamentId)
      .eq("team_id", teamId);

    if (error) throw error;
  }

  static async getRegisteredTeams(
    tournamentId: number
  ): Promise<Team[]> {
    const { data, error } = await supabase
      .from("tournament_teams")
      .select(`
        teams (*)
      `)
      .eq("tournament_id", tournamentId);

    if (error) throw error;

    return (data ?? []).map(
      (row: any) => row.teams as Team
    );
  }
}