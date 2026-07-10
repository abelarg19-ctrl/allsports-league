"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.session) {
      setError("Unable to create session.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

        <div className="text-center">

          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-black text-transparent">
            AllSports League
          </h1>

          <p className="mt-3 text-gray-400">
            Welcome back
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <Button
            className="h-12 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-semibold transition hover:scale-[1.02]"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Signing In..." : "Sign In"}

            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}

          <Link
            href="/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </main>
  );
}