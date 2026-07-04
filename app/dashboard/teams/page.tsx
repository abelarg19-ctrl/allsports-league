"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { TeamService } from "@/services/team.service";
import { Team } from "@/lib/types";
import TeamCard from "@/components/teams/TeamCard";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await TeamService.getAll(user.id);

      setTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Teams
          </h1>

          <p className="text-muted-foreground">
            Manage all your teams
          </p>
        </div>

        <Link
          href="/dashboard/teams/create"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          + New Team
        </Link>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : teams.length === 0 ? (

        <div className="border rounded-xl p-10 text-center">

          <h2 className="text-2xl font-bold">
            No teams yet
          </h2>

          <p className="text-muted-foreground mt-2">
            Create your first team.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

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