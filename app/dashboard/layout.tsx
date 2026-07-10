import Link from "next/link";
import {
  Activity,
  CalendarDays,
  House,
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
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen text-white">
      <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-black/25 backdrop-blur-2xl">
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
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-300 hover:translate-x-1"
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

      <main className="flex-1 p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}