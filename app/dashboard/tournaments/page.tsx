"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { Tournament } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTournaments();
  }, []);

  async function loadTournaments() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await TournamentService.getAll(user.id);

      setTournaments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400";
      case "Finished":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Tournaments
        </h1>

        <p className="text-gray-400">
          Manage your competitions
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400">
          Loading tournaments...
        </p>
      ) : tournaments.length === 0 ? (
        <div className="rounded-xl bg-gray-900 p-6 text-gray-400">
          No tournaments yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              href={`/dashboard/tournaments/${tournament.id}`}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {tournament.name}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {tournament.sport} • {tournament.format}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    tournament.status
                  )}`}
                >
                  {tournament.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}