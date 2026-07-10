"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MatchCenter from "@/features/matches/components/MatchCenter";

import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";
import { TeamService } from "@/services/team.service";

type TeamInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

export default function MatchPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<Match | null>(null);

  const [homeTeam, setHomeTeam] =
    useState<TeamInfo | null>(null);

  const [awayTeam, setAwayTeam] =
    useState<TeamInfo | null>(null);

  useEffect(() => {
    void loadMatch();
  }, [id]);

  async function loadMatch() {
    try {
      const data = await MatchService.getById(Number(id));

      setMatch(data);

      const teams =
        await TeamService.getBasicInfos([
          data.home_team_id,
          data.away_team_id,
        ]);

      setHomeTeam(
        teams[data.home_team_id] ?? null
      );

      setAwayTeam(
        teams[data.away_team_id] ?? null
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Loading match...
        </p>
      </div>
    );
  }

  if (
    !match ||
    !homeTeam ||
    !awayTeam
  ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Match not found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      <MatchCenter
        match={match}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />

    </div>
  );
}