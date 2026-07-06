import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <aside className="w-64 border-r border-gray-800 bg-gray-900 p-6">
        <h1 className="mb-8 text-xl font-bold">
          ⚽ AllSports League
        </h1>

        <nav className="space-y-3">
  <Link
    href="/dashboard"
    className="block text-gray-300 hover:text-white"
  >
    Dashboard
  </Link>

  <Link
    href="/dashboard/tournaments"
    className="block text-gray-300 hover:text-white"
  >
    Tournaments
  </Link>

  <Link
    href="/dashboard/teams"
    className="block text-gray-300 hover:text-white"
  >
    Teams
  </Link>

  <Link
    href="/dashboard/players"
    className="block text-gray-300 hover:text-white"
  >
    Players
  </Link>

  <Link
    href="/dashboard/matches"
    className="block text-gray-300 hover:text-white"
  >
    Matches
  </Link>

  <Link
    href="/dashboard/standings"
    className="block text-gray-300 hover:text-white"
  >
    Standings
  </Link>

  <Link
    href="/dashboard/create"
    className="block text-gray-300 hover:text-white"
  >
    Create Tournament
  </Link>
</nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}