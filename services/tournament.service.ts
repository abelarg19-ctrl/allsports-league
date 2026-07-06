import { supabase } from "@/lib/supabase";
import { Team, Tournament } from "@/lib/types";

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

    if (error) {
      return null;
    }

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
      .select(
        `
        team_id,
        teams (*)
      `
      )
      .eq("tournament_id", tournamentId)
      .order("team_id", { ascending: true });

    if (error) throw error;

    return (data ?? [])
      .map((row: { teams: Team | Team[] | null }) => {
        if (Array.isArray(row.teams)) {
          return row.teams[0] ?? null;
        }

        return row.teams;
      })
      .filter((team): team is Team => team !== null);
  }
}