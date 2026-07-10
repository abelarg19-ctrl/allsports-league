import { Shield, Sparkles, Users } from "lucide-react";

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black text-transparent">
          Players
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Player management and public profiles.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <Users className="mb-5 h-12 w-12 text-cyan-400" />

          <h2 className="text-2xl font-bold">
            Player Profiles
          </h2>

          <p className="mt-3 text-gray-400">
            Public player pages with avatars, biography, teams,
            statistics and achievements.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <Shield className="mb-5 h-12 w-12 text-green-400" />

          <h2 className="text-2xl font-bold">
            Team Management
          </h2>

          <p className="mt-3 text-gray-400">
            Players are currently managed inside each team's
            profile.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <Sparkles className="mb-5 h-12 w-12 text-yellow-400" />

          <h2 className="text-2xl font-bold">
            Coming Soon
          </h2>

          <p className="mt-3 text-gray-400">
            Match history, trophies, MVP awards,
            goals, assists, ELO and advanced statistics.
          </p>
        </div>

      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold">
          Next Major Update
        </h2>

        <p className="mt-3 text-gray-300">
          The Player module will evolve into a complete profile
          system similar to professional esports and football
          platforms, with rich statistics, rankings and player
          history.
        </p>
      </div>

    </div>
  );
}