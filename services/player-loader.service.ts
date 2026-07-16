import { Player } from "@/lib/types";

import { PlayerService } from "@/services/player.service";

export type PlayerPageData = {
  player: Player;
};

export class PlayerLoaderService {
  static async load(
    playerId: number
  ): Promise<PlayerPageData> {
    const player =
      await PlayerService.getById(playerId);

    return {
      player,
    };
  }
}