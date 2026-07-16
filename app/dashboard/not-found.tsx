import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <h2 className="text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The page or resource you are looking for could not be found.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}