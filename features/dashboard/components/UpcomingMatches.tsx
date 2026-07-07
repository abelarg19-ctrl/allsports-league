"use client";

import { useEffect, useState } from "react";

import { Match } from "@/lib/types";
import { TeamService } from "@/services/team.service";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  matches: Match[];
};

type TeamMap = Record<number, string>;

export default function UpcomingMatches({
  matches,
}: Props) {
  const [teamNames, setTeamNames] =
    useState<TeamMap>({});

  useEffect(() => {
    async function loadTeams() {
      if (matches.length === 0) return;

      const ids = Array.from(
        new Set(
          matches.flatMap((match) => [
            match.home_team_id,
            match.away_team_id,
          ])
        )
      );

      try {
        const names = await TeamService.getNames(ids);
        setTeamNames(names);
      } catch (error) {
        console.error(error);
      }
    }

    void loadTeams();
  }, [matches]);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-lg font-bold">
          Upcoming Matches
        </h2>

        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming matches.
          </p>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {teamNames[match.home_team_id] ??
                      "Loading..."}{" "}
                    vs{" "}
                    {teamNames[match.away_team_id] ??
                      "Loading..."}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Round {match.round}
                  </p>
                </div>

                <span className="rounded bg-yellow-500/10 px-2 py-1 text-xs text-yellow-500">
                  {match.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}