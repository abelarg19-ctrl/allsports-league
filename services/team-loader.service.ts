import { Team } from "@/lib/types";

import { TeamService } from "@/services/team.service";

export type TeamPageData = {
  team: Team;
};

export class TeamLoaderService {
  static async load(
    teamId: number
  ): Promise<TeamPageData> {
    const team =
      await TeamService.getById(teamId);

    return {
      team,
    };
  }
}