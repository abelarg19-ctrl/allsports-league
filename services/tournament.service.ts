import { supabase } from "@/lib/supabase";
import { Team, Tournament } from "@/lib/types";

export class TournamentService {
  static async isSuperAdmin(): Promise<boolean> {
    const { data, error } = await supabase.rpc(
      "is_super_admin"
    );

    if (error) throw error;

    return data === true;
  }

  static async getAll(
    userId: string
  ): Promise<Tournament[]> {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as Tournament[];
  }

  static async getAccessibleTournaments(
    userId: string
  ): Promise<Tournament[]> {
    const [
      owned,
      { data: adminRows, error },
    ] = await Promise.all([
      this.getAll(userId),
      supabase
        .from("tournament_admins")
        .select("tournament_id")
        .eq("user_id", userId),
    ]);

    if (error) throw error;

    if (!adminRows || adminRows.length === 0) {
      return owned;
    }

    const ids = adminRows.map(
      (row) => row.tournament_id
    );

    const {
      data: adminTournaments,
      error: tournamentsError,
    } = await supabase
      .from("tournaments")
      .select("*")
      .in("id", ids);

    if (tournamentsError) {
      throw tournamentsError;
    }

    const map = new Map<number, Tournament>();

    owned.forEach((tournament) =>
      map.set(tournament.id, tournament)
    );

    (adminTournaments as Tournament[]).forEach(
      (tournament) =>
        map.set(tournament.id, tournament)
    );

    return Array.from(map.values());
  }

  static async getById(
    id: number,
    userId: string
  ): Promise<Tournament | null> {
    const tournaments =
      await this.getAccessibleTournaments(userId);

    return (
      tournaments.find(
        (tournament) => tournament.id === id
      ) ?? null
    );
  }

  static async isTournamentAdmin(
    tournamentId: number,
    userId: string
  ): Promise<boolean> {
    const tournament =
      await this.getById(
        tournamentId,
        userId
      );

    if (tournament) {
      return true;
    }

    const { data } = await supabase
      .from("tournament_admins")
      .select("id")
      .eq(
        "tournament_id",
        tournamentId
      )
      .eq("user_id", userId)
      .maybeSingle();

    return !!data;
  }

  static async getTournamentAdmins(
    tournamentId: number
  ) {
    const { data, error } = await supabase
      .from("tournament_admins")
      .select("*")
      .eq(
        "tournament_id",
        tournamentId
      );

    if (error) throw error;

    return data ?? [];
  }

  static async addTournamentAdmin(
    tournamentId: number,
    userId: string
  ): Promise<void> {
    const { error } = await supabase
      .from("tournament_admins")
      .insert({
        tournament_id: tournamentId,
        user_id: userId,
      });

    if (error) throw error;
  }

  static async removeTournamentAdmin(
    tournamentId: number,
    userId: string
  ): Promise<void> {
    const { error } = await supabase
      .from("tournament_admins")
      .delete()
      .eq("tournament_id", tournamentId)
      .eq("user_id", userId);

    if (error) throw error;
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
      .order("team_id", {
        ascending: true,
      });

    if (error) throw error;

    return (data ?? [])
      .map(
        (row: {
          teams: Team | Team[] | null;
        }) => {
          if (Array.isArray(row.teams)) {
            return row.teams[0] ?? null;
          }

          return row.teams;
        }
      )
      .filter(
        (team): team is Team =>
          team !== null
      );
  }
}