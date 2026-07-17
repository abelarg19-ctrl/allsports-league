import Link from "next/link";
import FloatingLogoutButton from "@/components/auth/FloatingLogoutButton";
import {
  Activity,
  CalendarDays,
  House,
  Menu,
  Plus,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: House,
  },
  {
    href: "/dashboard/tournaments",
    label: "Tournaments",
    icon: Trophy,
  },
  {
    href: "/dashboard/teams",
    label: "Teams",
    icon: Shield,
  },
  {
    href: "/dashboard/players",
    label: "Players",
    icon: Users,
  },
  {
    href: "/dashboard/matches",
    label: "Matches",
    icon: Activity,
  },
  {
    href: "/dashboard/standings",
    label: "Standings",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/more",
    label: "More",
    icon: Menu,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white">
      <FloatingLogoutButton />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/10 bg-black/25 backdrop-blur-2xl lg:flex">
        <div className="border-b border-white/10 p-8">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-black text-transparent">
            AllSports League
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Premium Dashboard
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-5">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:translate-x-1 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              <Icon className="h-5 w-5" />

              {label}
            </Link>
          ))}

          <div className="pt-4">
            <Link
              href="/dashboard/create"
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold transition hover:scale-[1.02]"
            >
              Create Tournament
            </Link>
          </div>
        </nav>
      </aside>

      <main className="min-h-screen px-4 pb-32 pt-5 sm:px-6 sm:pt-6 lg:ml-72 lg:p-10">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          <Link
            href="/dashboard"
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
          >
            <House className="h-5 w-5" />
            <span className="text-[10px] font-medium">
              Home
            </span>
          </Link>

          <Link
            href="/dashboard/tournaments"
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
          >
            <Trophy className="h-5 w-5" />
            <span className="text-[10px] font-medium">
              Tournaments
            </span>
          </Link>

          <Link
            href="/dashboard/create"
            aria-label="Create Tournament"
            className="mx-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 transition active:scale-95"
          >
            <Plus className="h-6 w-6 text-white" />
          </Link>

          <Link
            href="/dashboard/teams"
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
          >
            <Shield className="h-5 w-5" />
            <span className="text-[10px] font-medium">
              Teams
            </span>
          </Link>

          <Link
            href="/dashboard/more"
            className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
          >
            <Menu className="h-5 w-5" />
            <span className="text-[10px] font-medium">
              More
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}