"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CreateTournament() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sport, setSport] = useState("Soccer");
  const [format, setFormat] = useState("League");
  const [status, setStatus] = useState("Draft");
  const [maxTeams, setMaxTeams] = useState(8);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createTournament() {
    setError("");

    if (!name.trim()) {
      setError("Tournament name is required.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("tournaments").insert({
        name,
        sport,
        format,
        status,
        max_teams: maxTeams,

        // Nuevo nombre del campo
        owner_id: user.id,

        // Nuevos campos
        description: "",
        image_url: "",
        prize_pool: 0,
        game: sport,
        platform: "All",
        region: "Worldwide",
        visibility: "Public",
        current_round: 0,
        is_registration_open: true,
        created_by: user.id,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard/tournaments");
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold mb-2">
          Create Tournament
        </h1>

        <p className="text-gray-400 mb-6">
          Build a new competition for your league
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">
              Tournament Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer Cup 2026"
              className="w-full mt-1 rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Sport
            </label>

            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full mt-1 rounded-lg bg-gray-800 p-3"
            >
              <option>Soccer</option>
              <option>Basketball</option>
              <option>Baseball</option>
              <option>Volleyball</option>
              <option>Tennis</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Format
            </label>

            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full mt-1 rounded-lg bg-gray-800 p-3"
            >
              <option>League</option>
              <option>Knockout</option>
              <option>Groups</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 rounded-lg bg-gray-800 p-3"
            >
              <option>Draft</option>
              <option>Active</option>
              <option>Finished</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Maximum Teams
            </label>

            <input
              type="number"
              min={2}
              max={128}
              value={maxTeams}
              onChange={(e) => setMaxTeams(Number(e.target.value))}
              className="w-full mt-1 rounded-lg bg-gray-800 p-3"
            />
          </div>

          <button
            onClick={createTournament}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Tournament"}
          </button>

        </div>

      </div>
    </div>
  );
}