"use client";

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Matches
        </h1>

        <p className="text-muted-foreground">
          Tournament matches will appear here.
        </p>
      </div>

      <div className="rounded-xl border p-8">
        <p className="text-muted-foreground">
          No matches generated yet.
        </p>
      </div>
    </div>
  );
}