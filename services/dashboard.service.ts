import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";
import { PlayerService } from "@/services/player.service";
import { TeamService } from "@/services/team.service";
import { TournamentService } from "@/services/tournament.service";

export interface DashboardData {
  tournaments: number;
  active: number;
  finished: number;
  teams: number;
  players: number;
  matches: number;
  upcomingMatches: Match[];
  latestResults: Match[];
  teamMap: Awaited<
    ReturnType<typeof TeamService.getBasicInfos>
  >;
}

export class DashboardService {
  static async load(
    userId: string
  ): Promise<DashboardData> {
    const tournaments =
      await TournamentService.getAccessibleTournaments(
        userId
      );

    const tournamentIds = tournaments.map(
      (tournament) => tournament.id
    );

    const [
      teams,
      players,
      matches,
      upcomingMatches,
      latestResults,
    ] = await Promise.all([
      TeamService.getCount(userId),

      PlayerService.getCount(userId),

      MatchService.getCountByTournaments(
        tournamentIds
      ),

      MatchService.getUpcoming(
        tournamentIds,
        5
      ),

      MatchService.getRecentResults(
        tournamentIds,
        5
      ),
    ]);

    const teamIds = Array.from(
      new Set(
        [
          ...upcomingMatches,
          ...latestResults,
        ].flatMap((match) => [
          match.home_team_id,
          match.away_team_id,
        ])
      )
    );

    const teamMap =
      await TeamService.getBasicInfos(teamIds);

    return {
      tournaments: tournaments.length,

      active: tournaments.filter(
        (tournament) =>
          tournament.status === "Active"
      ).length,

      finished: tournaments.filter(
        (tournament) =>
          tournament.status === "Finished"
      ).length,

      teams,

      players,

      matches,

      upcomingMatches,

      latestResults,

      teamMap,
    };
  }
}
