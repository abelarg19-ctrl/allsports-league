"use client";

import Link from "next/link";
import { useState } from "react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignUp() {
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">

          <h1 className="text-3xl font-bold text-white">
            Check your email
          </h1>

          <p className="mt-4 text-gray-400">
            Your account has been created.
          </p>

          <p className="mt-2 text-gray-400">
            Verify your email before signing in.
          </p>

          <Link href="/login">
            <Button className="mt-8 w-full">
              Back to Sign In
            </Button>
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">

        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Join AllSports League
        </p>

        <div className="mt-8 space-y-4">

          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}