import Link from "next/link";
import {
  Activity,
  CalendarDays,
  ChevronRight,
  MessageSquareText,
  Users,
} from "lucide-react";

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
        {options.map((option) => {
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