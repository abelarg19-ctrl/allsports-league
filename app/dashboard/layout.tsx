import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-xl font-bold mb-8">
          ⚽ AllSports
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
    href="/dashboard/create"
    className="block text-gray-300 hover:text-white"
  >
    Create Tournament
  </Link>
</nav>
        
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}