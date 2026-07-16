"use client";

import { CalendarDays } from "lucide-react";

import { Match } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type TeamInfo = {
  name: string;
  logo_url: string | null;
};

type Props = {
  matches: Match[];
  teamMap: Record<number, TeamInfo>;
};

export default function UpcomingMatches({
  matches,
  teamMap,
}: Props) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <div className="rounded-xl bg-cyan-500/10 p-2">
            <CalendarDays className="h-5 w-5 text-cyan-400" />
          </div>

          <h2 className="text-base font-bold sm:text-lg">
            Upcoming Matches
          </h2>
        </div>

        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming matches.
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

                    <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-black text-muted-foreground sm:text-xs">
                      VS
                    </span>

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

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 sm:mt-4">
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Round {match.round}
                    </p>

                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-400 sm:px-3 sm:text-xs">
                      {match.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}