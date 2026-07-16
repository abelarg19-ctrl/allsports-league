"use client";

import { Match } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type TeamInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

type Props = {
  matches: Match[];
  teamMap: Record<number, TeamInfo>;
};

export default function DashboardLatestResults({
  matches,
  teamMap,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-lg font-bold">
          Latest Results
        </h2>

        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No results available yet.
          </p>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => {
              const homeTeam =
                teamMap[match.home_team_id];

              const awayTeam =
                teamMap[match.away_team_id];

              return (
                <div
                  key={match.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {homeTeam?.logo_url ? (
                        <img
                          src={homeTeam.logo_url}
                          alt={homeTeam.name}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
                      )}

                      <span className="truncate font-semibold">
                        {homeTeam?.name ??
                          `Team ${match.home_team_id}`}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-lg font-black">
                      <span>
                        {match.home_score}
                      </span>

                      <span className="text-muted-foreground">
                        -
                      </span>

                      <span>
                        {match.away_score}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                      <span className="truncate text-right font-semibold">
                        {awayTeam?.name ??
                          `Team ${match.away_team_id}`}
                      </span>

                      {awayTeam?.logo_url ? (
                        <img
                          src={awayTeam.logo_url}
                          alt={awayTeam.name}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Round {match.round}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}