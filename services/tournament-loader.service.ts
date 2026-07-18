import { Tournament } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import {
  TournamentOverview,
  TournamentStatsService,
} from "@/services/tournament-stats.service";
import { MatchService } from "@/services/match.service";
import { TeamService } from "@/services/team.service";

export type TournamentPageData = {
  tournament: Tournament;
  overview: TournamentOverview;
  matches: Awaited<
    ReturnType<typeof MatchService.getByTournament>
  >;
  teams: Awaited<
    ReturnType<typeof TournamentService.getRegisteredTeams>
  >;
  teamMap: Awaited<
    ReturnType<typeof TeamService.getBasicInfos>
  >;
  canManage: boolean;
};

export class TournamentLoaderService {
  static async load(
    tournamentId: number,
    userId: string
  ): Promise<TournamentPageData> {
    const tournament =
      await TournamentService.getById(
        tournamentId,
        userId
      );

    if (!tournament) {
      throw new Error("Tournament not found.");
    }

    const [
      overview,
      matches,
      teams,
      canManage,
    ] = await Promise.all([
      TournamentStatsService.getOverview(
        tournamentId
      ),
      MatchService.getByTournament(
        tournamentId
      ),
      TournamentService.getRegisteredTeams(
        tournamentId
      ),
      (async () => {
        if (tournament.owner_id === userId) {
          return true;
        }

        const [isSuperAdmin, isTournamentAdmin] =
          await Promise.all([
            TournamentService.isSuperAdmin(),
            TournamentService.isTournamentAdmin(
              tournamentId,
              userId
            ),
          ]);

        return (
          isSuperAdmin ||
          isTournamentAdmin
        );
      })(),
    ]);

    const ids = teams.map((team) => team.id);

    const teamMap =
      await TeamService.getBasicInfos(ids);

    return {
      tournament,
      overview,
      matches,
      teams,
      teamMap,
      canManage,
    };
  }
}