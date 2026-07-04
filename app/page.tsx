import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">

      <h1 className="text-5xl font-bold">AllSports League</h1>

      <p className="mt-4 text-xl text-gray-300">
        Where Champions Are Born.
      </p>

      <div className="mt-8 flex gap-4">

        <Link
          href="/create"
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Create League
        </Link>

        <Link
          href="/login"
          className="px-6 py-3 bg-gray-800 rounded-xl hover:bg-gray-700"
        >
          Sign In
        </Link>

      </div>

    </main>
  );
}