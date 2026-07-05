"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

import RegisterTeamDialog from "@/features/tournaments/components/RegisterTeamDialog";
import RegisteredTeamsList from "@/features/tournaments/components/RegisteredTeamsList";

export default function TournamentDetail() {
  const { id } = useParams();

  const tournamentId = Number(id);

  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadTournament();
  }, []);

  async function loadTournament() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", tournamentId)
      .eq("owner_id", user.id)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setTournament(data);
    setLoading(false);
  }

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!tournament) {
    return <p className="text-red-400">Tournament not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {tournament.name}
          </h1>

          <p className="text-gray-400">
            {tournament.sport} • {tournament.format}
          </p>
        </div>

        <RegisterTeamDialog
          tournamentId={tournamentId}
          onRegistered={() =>
            setRefreshKey((v) => v + 1)
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Status</p>
          <p className="text-lg font-bold">
            {tournament.status}
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Max Teams</p>
          <p className="text-lg font-bold">
            {tournament.max_teams}
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Type</p>
          <p className="text-lg font-bold">
            {tournament.format}
          </p>
        </div>
      </div>

      <div
        key={refreshKey}
        className="rounded-xl bg-gray-900 p-6"
      >
        <h2 className="mb-4 text-xl font-bold">
          Registered Teams
        </h2>

        <RegisteredTeamsList
          tournamentId={tournamentId}
        />
      </div>
    </div>
  );
}