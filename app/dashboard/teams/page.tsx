"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Shield } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Team } from "@/lib/types";
import { TeamService } from "@/services/team.service";

import TeamCard from "@/components/teams/TeamCard";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadTeams();
  }, []);

  async function loadTeams() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setTeams(await TeamService.getAll(user.id));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black text-transparent">
            Teams
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your organizations.
          </p>
        </div>

        <Link
          href="/dashboard/teams/create"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold transition hover:scale-[1.02]"
        >
          <Plus className="h-5 w-5" />
          New Team
        </Link>

      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          Loading teams...
        </div>
      ) : teams.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <Shield className="mx-auto mb-4 h-12 w-12 text-cyan-400" />

          <h2 className="text-2xl font-bold">
            No teams yet
          </h2>

          <p className="mt-2 text-gray-400">
            Create your first team.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
            />
          ))}
        </div>
      )}

    </div>
  );
}