"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleResetPassword() {
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Password Updated
          </h1>

          <p className="mt-4 text-gray-400">
            Your password has been changed successfully.
          </p>

          <p className="mt-2 text-gray-500">
            Redirecting to Sign In...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8">
        <h1 className="text-center text-3xl font-bold text-white">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your new password.
        </p>

        <div className="mt-8 space-y-4">
          <Input
            type="password"
            placeholder="New Password"
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
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </main>
  );
}