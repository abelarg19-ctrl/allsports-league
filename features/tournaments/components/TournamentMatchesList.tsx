"use client";

import { useEffect, useState } from "react";

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
    loadMatches();
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
      <p className="text-gray-400">
        Loading matches...
      </p>
    );
  }

  if (!matches.length) {
    return (
      <p className="text-gray-400">
        No matches generated yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div
          key={match.id}
          className="rounded-xl border border-gray-800 bg-gray-900 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="font-semibold">
              Round {match.round}
            </span>

            <span className="rounded bg-gray-800 px-3 py-1 text-sm">
              {match.status}
            </span>
          </div>

          <div className="flex items-center justify-between">

            {/* HOME */}

            <div className="flex w-2/5 items-center gap-3">

              <img
                src={
                  teams[match.home_team_id]?.logo_url ??
                  "/team-placeholder.png"
                }
                alt=""
                className="h-12 w-12 rounded-full border object-cover"
              />

              <span className="font-semibold">
                {teams[match.home_team_id]?.name ??
                  "Unknown Team"}
              </span>

            </div>

            {/* SCORE */}

            <div className="text-center">

              <div className="text-2xl font-bold">
                {match.home_score} - {match.away_score}
              </div>

              <div className="text-xs text-gray-400">
                VS
              </div>

            </div>

            {/* AWAY */}

            <div className="flex w-2/5 items-center justify-end gap-3">

              <span className="font-semibold">
                {teams[match.away_team_id]?.name ??
                  "Unknown Team"}
              </span>

              <img
                src={
                  teams[match.away_team_id]?.logo_url ??
                  "/team-placeholder.png"
                }
                alt=""
                className="h-12 w-12 rounded-full border object-cover"
              />

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}