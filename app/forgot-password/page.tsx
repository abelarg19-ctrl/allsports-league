"use client";

import Link from "next/link";
import { useState } from "react";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleReset() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
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
            Email Sent
          </h1>

          <p className="mt-4 text-gray-400">
            Check your email for the password reset link.
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
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your email to receive a reset link.
        </p>

        <div className="mt-8 space-y-4">

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            className="w-full"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
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