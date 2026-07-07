"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, Radio } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";

interface Props {
  tournamentId: number;
}

type TeamMap = Record<
  number,
  {
    name: string;
    logo_url: string | null;
  }
>;

export default function TournamentMatchesList({
  tournamentId,
}: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadMatches();
  }, [tournamentId]);

  async function loadMatches() {
    try {
      setLoading(true);

      const data = await MatchService.getByTournament(
        tournamentId
      );

      setMatches(data);

      const ids = [
        ...new Set(
          data.flatMap((m) => [
            m.home_team_id,
            m.away_team_id,
          ])
        ),
      ];

      if (!ids.length) return;

      const { data: teamsData, error } = await supabase
        .from("teams")
        .select("id,name,logo_url")
        .in("id", ids);

      if (error) throw error;

      const map: TeamMap = {};

      teamsData?.forEach((team) => {
        map[team.id] = {
          name: team.name,
          logo_url: team.logo_url,
        };
      });

      setTeams(map);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-muted-foreground animate-pulse">
        Loading matches...
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <p className="text-muted-foreground">
          No matches generated yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {matches.map((match) => (
        <div
          key={match.id}
          className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Round {match.round}
            </span>

            {match.status === "Pending" && (
              <span className="rounded-full bg-yellow-500/10 px-4 py-1 text-xs font-semibold text-yellow-400">
                Pending
              </span>
            )}

            {match.status === "Live" && (
              <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                LIVE
              </span>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">

            {/* HOME */}

            <div className="flex items-center gap-4">
              <Image
                src={
                  teams[match.home_team_id]?.logo_url ??
                  "/team-placeholder.png"
                }
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border border-white/10 object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div>
                <h3 className="text-lg font-bold">
                  {teams[match.home_team_id]?.name ??
                    "Unknown Team"}
                </h3>
              </div>
            </div>

            {/* SCORE */}

            <div className="text-center">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-8 py-4">
                <div className="text-4xl font-black tracking-tight">
                  {match.home_score}
                  <span className="mx-3 text-muted-foreground">
                    —
                  </span>
                  {match.away_score}
                </div>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Match
                </p>
              </div>
            </div>

            {/* AWAY */}

            <div className="flex items-center justify-end gap-4">
              <div className="text-right">
                <h3 className="text-lg font-bold">
                  {teams[match.away_team_id]?.name ??
                    "Unknown Team"}
                </h3>
              </div>

              <Image
                src={
                  teams[match.away_team_id]?.logo_url ??
                  "/team-placeholder.png"
                }
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-full border border-white/10 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}