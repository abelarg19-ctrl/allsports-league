import { supabase } from "@/lib/supabase";

export type TournamentOverview = {
  teams: number;
  matches: number;
  finishedMatches: number;
  admins: number;
  progress: number;
};

export class TournamentStatsService {
  static async getRegisteredTeamsCount(
    tournamentId: number
  ): Promise<number> {
    const { count, error } = await supabase
      .from("tournament_teams")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("tournament_id", tournamentId);

    if (error) throw error;

    return count ?? 0;
  }

  static async getMatchesCount(
    tournamentId: number
  ): Promise<number> {
    const { count, error } = await supabase
      .from("matches")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("tournament_id", tournamentId);

    if (error) throw error;

    return count ?? 0;
  }

  static async getFinishedMatchesCount(
    tournamentId: number
  ): Promise<number> {
    const { count, error } = await supabase
      .from("matches")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("tournament_id", tournamentId)
      .eq("status", "Finished");

    if (error) throw error;

    return count ?? 0;
  }

  static async getAdminsCount(
    tournamentId: number
  ): Promise<number> {
    const { count, error } = await supabase
      .from("tournament_admins")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("tournament_id", tournamentId);

    if (error) throw error;

    return count ?? 0;
  }

  static async getProgress(
    tournamentId: number
  ): Promise<number> {
    const [matches, finished] =
      await Promise.all([
        this.getMatchesCount(tournamentId),
        this.getFinishedMatchesCount(
          tournamentId
        ),
      ]);

    if (matches === 0) {
      return 0;
    }

    return Math.round(
      (finished / matches) * 100
    );
  }

  static async getOverview(
    tournamentId: number
  ): Promise<TournamentOverview> {
    const [
      teams,
      matches,
      finishedMatches,
      admins,
      progress,
    ] = await Promise.all([
      this.getRegisteredTeamsCount(
        tournamentId
      ),
      this.getMatchesCount(
        tournamentId
      ),
      this.getFinishedMatchesCount(
        tournamentId
      ),
      this.getAdminsCount(
        tournamentId
      ),
      this.getProgress(
        tournamentId
      ),
    ]);

    return {
      teams,
      matches,
      finishedMatches,
      admins,
      progress,
    };
  }
}