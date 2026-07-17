"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Trophy,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Tournament } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadTournaments();
  }, []);

  async function loadTournaments() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setTournaments(
  await TournamentService.getAccessibleTournaments(user.id)
);
    } finally {
      setLoading(false);
    }
  }

  function badge(status: string) {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-400";

      case "Finished":
        return "bg-gray-500/10 text-gray-300";

      default:
        return "bg-yellow-500/10 text-yellow-400";
    }
  }

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">

      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl lg:text-5xl">
          Tournaments
        </h1>

        <p className="mt-2 text-gray-400">
          Manage your competitions.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          Loading tournaments...
        </div>
      ) : tournaments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-cyan-400" />

          <p className="text-gray-400">
            No tournaments created yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/dashboard/tournaments/${tournament.id}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0 flex-1">

                  <h2 className="break-words text-xl font-bold leading-tight sm:text-2xl">
                    {tournament.name}
                  </h2>

                  <div className="mt-3 flex min-w-0 items-center gap-2 text-xs text-gray-400 sm:text-sm">
                    <CalendarDays className="h-4 w-4" />
                    {tournament.sport} • {tournament.format}
                  </div>

                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${badge(
                    tournament.status
                  )}`}
                >
                  {tournament.status}
                </span>

              </div>

              <div className="mt-5 flex items-center justify-end text-sm text-cyan-400 transition group-hover:translate-x-1 sm:mt-8">
                View Tournament
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>

            </Link>
          ))}
        </div>
      )}
    </div>
  );
}