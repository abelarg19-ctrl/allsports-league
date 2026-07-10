import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-8 py-20 lg:grid-cols-2 lg:items-center">

        <div>

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            ALLSPORTS LEAGUE
          </span>

          <h1 className="mt-8 text-6xl font-black leading-tight">
            Build the next
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Championship
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-gray-300">
            Organize tournaments, manage teams, track players,
            generate fixtures and publish standings in one
            modern platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold transition hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              Sign In
            </Link>

          </div>

        </div>

        <div className="grid gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Trophy className="mb-4 h-10 w-10 text-yellow-400" />
            <h2 className="text-2xl font-bold">
              Tournament Management
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Users className="mb-4 h-10 w-10 text-cyan-400" />
            <h2 className="text-2xl font-bold">
              Teams & Players
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Shield className="mb-4 h-10 w-10 text-green-400" />
            <h2 className="text-2xl font-bold">
              Secure & Realtime
            </h2>
          </div>

        </div>

      </div>
    </main>
  );
}