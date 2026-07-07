"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal } from "lucide-react";

import { Match } from "@/lib/types";
import { TeamService } from "@/services/team.service";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  matches: Match[];
};

export default function LatestResults({
  matches,
}: Props) {
  const [teamNames, setTeamNames] =
    useState<Record<number, string>>({});

  useEffect(() => {
    async function loadTeams() {
      if (!matches.length) return;

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
    <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Trophy className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Latest Results
            </h2>

            <p className="text-sm text-muted-foreground">
              Recently completed matches
            </p>
          </div>
        </div>

        {!matches.length ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <Trophy className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

            <p className="text-muted-foreground">
              No recent results.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => {
              const home =
                teamNames[match.home_team_id] ??
                "Loading...";

              const away =
                teamNames[match.away_team_id] ??
                "Loading...";

              const homeWon =
                match.home_score > match.away_score;

              const awayWon =
                match.away_score > match.home_score;

              return (
                <div
                  key={match.id}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">

                      <div className="flex items-center gap-2">
                        {homeWon && (
                          <Medal className="h-4 w-4 text-yellow-400" />
                        )}

                        <span
                          className={
                            homeWon
                              ? "font-bold text-white"
                              : "text-muted-foreground"
                          }
                        >
                          {home}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        {awayWon && (
                          <Medal className="h-4 w-4 text-yellow-400" />
                        )}

                        <span
                          className={
                            awayWon
                              ? "font-bold text-white"
                              : "text-muted-foreground"
                          }
                        >
                          {away}
                        </span>
                      </div>
                    </div>

                    <div className="mx-8 text-center">
                      <div className="text-3xl font-black tracking-tight">
                        {match.home_score}
                        <span className="mx-2 text-muted-foreground">
                          —
                        </span>
                        {match.away_score}
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Round {match.round}
                      </p>
                    </div>

                    <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Final
                    </div>
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