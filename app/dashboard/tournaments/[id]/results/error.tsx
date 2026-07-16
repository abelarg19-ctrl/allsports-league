"use client";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function TournamentResultsError({
  error,
  reset,
}: Props) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-300">
          Unable to load tournament results
        </h2>

        <p className="mt-3 text-sm text-red-200/70">
          {error.message ||
            "An unexpected error occurred while loading tournament results."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}