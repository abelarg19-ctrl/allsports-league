"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const options = [
  {
    href: "/dashboard/players",
    title: "Players",
    description: "Manage players and profiles.",
    icon: Users,
  },
  {
    href: "/dashboard/matches",
    title: "Matches",
    description: "View matches and results.",
    icon: Activity,
  },
  {
    href: "/dashboard/standings",
    title: "Standings",
    description: "View league standings.",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/feedback",
    title: "Send Feedback",
    description: "Report a bug or suggest an improvement.",
    icon: MessageSquareText,
  },
];

export default function MorePage() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    void checkSuperAdmin();
  }, []);

  async function checkSuperAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data } = await supabase
      .from("super_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    setIsSuperAdmin(Boolean(data));
  }

  const visibleOptions = isSuperAdmin
    ? [
        ...options,
        {
          href: "/dashboard/admin/feedback",
          title: "Beta Feedback",
          description: "Review feedback submitted by beta testers.",
          icon: ShieldCheck,
        },
      ]
    : options;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          More
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Explore more AllSports League features.
        </p>
      </div>

      <div className="space-y-3">
        {visibleOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Link
              key={option.href}
              href={option.href}
              className="group flex min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Icon className="h-6 w-6 text-cyan-400" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-bold">
                  {option.title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}