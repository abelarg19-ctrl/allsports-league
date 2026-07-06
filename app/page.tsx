import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-white">
      <h1 className="text-5xl font-bold text-center">
        AllSports League
      </h1>

      <p className="mt-4 text-center text-xl text-gray-300">
        Where Champions Are Born.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/login"
          className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-xl bg-gray-800 px-6 py-3 text-center font-semibold transition hover:bg-gray-700"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}