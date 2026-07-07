export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Players</h1>

        <p className="mt-2 text-muted-foreground">
          The public Player Profile module is currently under development.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-8">
        <h2 className="mb-3 text-xl font-semibold">
          Coming Soon
        </h2>

        <p className="text-muted-foreground">
          The next update will introduce public player profiles with avatars,
          personal information, team details, statistics, and match history.
        </p>
      </div>

      <div className="rounded-xl border border-border p-8">
        <h3 className="mb-3 text-lg font-semibold">
          Current Player Management
        </h3>

        <p className="text-muted-foreground">
          Players can currently be created and managed from each team's profile
          through the <strong>Players</strong> section.
        </p>
      </div>
    </div>
  );
}