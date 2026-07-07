"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Team } from "@/lib/types";
import { TournamentService } from "@/services/tournament.service";

interface Props {
  tournamentId: number;
}

export default function RegisteredTeamsList({
  tournamentId,
}: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadTeams();
  }, [tournamentId]);

  async function loadTeams() {
    try {
      setLoading(true);

      const data =
        await TournamentService.getRegisteredTeams(
          tournamentId
        );

      setTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-sm text-gray-400 animate-pulse">
          Loading teams...
        </p>
      </div>
    );
  }

  if (!teams.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <p className="text-gray-400">
          No teams registered yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {teams.map((team) => (
        <Link
          key={team.id}
          href={`/teams/${team.id}`}
          className="group"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="flex items-center gap-4">
              {team.logo_url ? (
                <Image
                  src={team.logo_url}
                  alt={team.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full border-2 border-white/10 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-bold text-white">
                  {team.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
                  {team.name}
                </h3>

                <p className="text-sm text-gray-400">
                  {team.tag}
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-white/10" />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-black/20 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  ELO
                </p>

                <p className="mt-1 text-xl font-bold text-cyan-300">
                  {team.elo}
                </p>
              </div>

              <div className="rounded-xl bg-black/20 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Wins
                </p>

                <p className="mt-1 text-xl font-bold text-green-400">
                  {team.wins}
                </p>
              </div>

              <div className="rounded-xl bg-black/20 p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Losses
                </p>

                <p className="mt-1 text-xl font-bold text-red-400">
                  {team.losses}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}