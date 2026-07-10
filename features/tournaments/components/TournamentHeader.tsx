"use client";

import {
  CalendarDays,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

import { Tournament } from "@/lib/types";

interface Props {
  tournament: Tournament;
  registeredTeams?: number;
}

export default function TournamentHeader({
  tournament,
  registeredTeams = 0,
}: Props) {
  function badgeColor() {
    switch (tournament.status) {
      case "Active":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Finished":
        return "bg-gray-500/10 text-gray-300 border-gray-500/20";

      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="relative h-64 bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900">

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-end justify-between p-10">

          <div>

            <span
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${badgeColor()}`}
            >
              {tournament.status}
            </span>

            <h1 className="mt-5 text-5xl font-black text-white">
              {tournament.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-6 text-cyan-100">

              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {tournament.sport}
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {tournament.format}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Tournament
              </div>

            </div>

          </div>

          <div className="hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl lg:block">

            <Users className="mx-auto mb-3 h-10 w-10 text-cyan-300" />

            <p className="text-center text-sm text-cyan-100">
              Registered Teams
            </p>

            <p className="mt-2 text-center text-5xl font-black text-white">
              {registeredTeams}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}