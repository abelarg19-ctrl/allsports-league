"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function TournamentDetail() {
  const { id } = useParams();

  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      .eq("id", id)
      .eq("owner_id", user.id)
      .single();

    if (error) {
      console.log(error);
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
    return <p className="text-red-400">Tournament not found</p>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">{tournament.name}</h1>
        <p className="text-gray-400">
          {tournament.sport} • {tournament.format}
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Status</p>
          <p className="text-lg font-bold">{tournament.status}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Max Teams</p>
          <p className="text-lg font-bold">{tournament.max_teams}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Type</p>
          <p className="text-lg font-bold">{tournament.format}</p>
        </div>

      </div>

      {/* FUTURE SECTION */}
      <div className="bg-gray-900 p-6 rounded-xl text-gray-400">
        <p>Teams, matches and standings will appear here ⚽</p>
      </div>

    </div>
  );
}