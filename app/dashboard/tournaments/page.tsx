"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTournaments();
  }, []);

  async function loadTournaments() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setTournaments(data || []);
    setLoading(false);
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
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tournaments</h1>
        <p className="text-gray-400">
          Manage your competitions
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading tournaments...</p>
      ) : tournaments.length === 0 ? (
        <div className="bg-gray-900 p-6 rounded-xl text-gray-400">
          No tournaments yet. Create your first one ⚽
        </div>
      ) : (
        <div className="grid gap-4">

          {tournaments.map((t) => (
            <Link
              key={t.id}
              href={`/dashboard/tournaments/${t.id}`}
              className="bg-gray-900 hover:bg-gray-800 transition rounded-xl p-5 border border-gray-800"
            >
              <div className="flex justify-between items-center">

                {/* LEFT */}
                <div>
                  <h2 className="text-lg font-semibold">
                    {t.name}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {t.sport} • {t.format}
                  </p>
                </div>

                {/* RIGHT */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    t.status
                  )}`}
                >
                  {t.status}
                </span>

              </div>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}