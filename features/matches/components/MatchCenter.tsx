"use client";

import {
  CalendarDays,
  Clock3,
  Trophy,
} from "lucide-react";

import { Match } from "@/lib/types";

import MatchTimeline from "./MatchTimeline";
import MatchStats from "./MatchStats";
import MatchEvents from "./MatchEvents";
import MatchMVP from "./MatchMVP";
import MatchLineups from "./MatchLineups";

interface Props {
  match: Match;
  homeTeam: {
    name: string;
    logo_url: string | null;
  };
  awayTeam: {
    name: string;
    logo_url: string | null;
  };
}

export default function MatchCenter({
  match,
  homeTeam,
  awayTeam,
}: Props) {
  return (
    <div className="space-y-8">

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900 p-10">

          <div className="mb-8 flex items-center justify-center gap-3 text-cyan-100">
            <Trophy className="h-6 w-6" />
            <span className="text-lg font-bold">
              Round {match.round}
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-3">

            <div className="flex flex-col items-center">

              <img
                src={
                  homeTeam.logo_url ??
                  "/team-placeholder.png"
                }
                alt={homeTeam.name}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl"
              />

              <h2 className="mt-5 text-center text-3xl font-black text-white">
                {homeTeam.name}
              </h2>

            </div>

            <div className="text-center">

              <div className="text-7xl font-black text-white">
                {match.home_score}
                <span className="mx-5 text-cyan-300">
                  -
                </span>
                {match.away_score}
              </div>

              <div className="mt-5 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-cyan-100">
                {match.status}
              </div>

              {match.starts_at && (
                <div className="mt-6 flex items-center justify-center gap-6 text-cyan-100">

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(
                      match.starts_at
                    ).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {new Date(
                      match.starts_at
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                </div>
              )}

            </div>

            <div className="flex flex-col items-center">

              <img
                src={
                  awayTeam.logo_url ??
                  "/team-placeholder.png"
                }
                alt={awayTeam.name}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl"
              />

              <h2 className="mt-5 text-center text-3xl font-black text-white">
                {awayTeam.name}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <MatchStats />

      <div className="grid gap-8 xl:grid-cols-2">
        <MatchTimeline />
        <MatchEvents />
      </div>

      <MatchMVP />

      <MatchLineups
        homeTeam={homeTeam.name}
        awayTeam={awayTeam.name}
      />

    </div>
  );
}