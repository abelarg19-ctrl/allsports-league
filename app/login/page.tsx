"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function signIn() {
    console.clear();
    console.log("========== LOGIN ==========");

    setLoading(true);
    setError("");

    try {
      console.log("Intentando iniciar sesión...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Respuesta:", data);
      console.log("Error:", error);

      if (error) {
        setError(error.message);
        return;
      }

      if (!data.session) {
        setError("No session returned.");
        return;
      }

      console.log("LOGIN OK");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          AllSports League
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Sign in to your account
        </p>

        <input
          className="w-full p-3 mb-3 bg-gray-800 rounded-lg outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 bg-gray-800 rounded-lg outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

      <button
  onClick={() => {
    console.log("BOTÓN PRESIONADO");
    signIn();
  }}
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
>
  {loading ? "Loading..." : "Sign In"}
</button>
      </div>
    </div>
  );
}