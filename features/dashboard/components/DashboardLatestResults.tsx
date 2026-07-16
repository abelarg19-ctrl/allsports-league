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
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-4 text-base font-bold sm:mb-6 sm:text-lg">
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
                  className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4"
                >
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                    <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
                      {homeTeam?.logo_url ? (
                        <img
                          src={homeTeam.logo_url}
                          alt={homeTeam.name}
                          className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
                        />
                      ) : (
                        <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 sm:h-10 sm:w-10" />
                      )}

                      <span className="w-full truncate text-center text-xs font-semibold sm:text-left sm:text-sm">
                        {homeTeam?.name ??
                          `Team ${match.home_team_id}`}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-black/20 px-2 py-2 text-base font-black sm:gap-2 sm:px-3 sm:text-lg">
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

                    <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row-reverse sm:gap-3">
                      {awayTeam?.logo_url ? (
                        <img
                          src={awayTeam.logo_url}
                          alt={awayTeam.name}
                          className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
                        />
                      ) : (
                        <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 sm:h-10 sm:w-10" />
                      )}

                      <span className="w-full truncate text-center text-xs font-semibold sm:text-right sm:text-sm">
                        {awayTeam?.name ??
                          `Team ${match.away_team_id}`}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 border-t border-white/5 pt-3 text-center text-[10px] text-muted-foreground sm:text-xs">
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