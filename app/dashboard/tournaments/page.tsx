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
    <div className="space-y-8">

      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black text-transparent">
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
        <div className="grid gap-6 lg:grid-cols-2">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/dashboard/tournaments/${tournament.id}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {tournament.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDays className="h-4 w-4" />
                    {tournament.sport} • {tournament.format}
                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                    tournament.status
                  )}`}
                >
                  {tournament.status}
                </span>

              </div>

              <div className="mt-8 flex items-center justify-end text-cyan-400 transition group-hover:translate-x-1">
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