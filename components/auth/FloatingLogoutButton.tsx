"use client";

import LogoutButton from "@/components/auth/LogoutButton";

export default function FloatingLogoutButton() {
  return (
    <div className="fixed right-4 top-4 z-50 w-32 rounded-2xl border border-white/10 bg-black/70 p-1 shadow-xl backdrop-blur-xl lg:right-6 lg:top-6">
      <LogoutButton />
    </div>
  );
}
