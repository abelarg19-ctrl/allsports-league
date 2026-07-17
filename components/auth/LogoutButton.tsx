"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}
