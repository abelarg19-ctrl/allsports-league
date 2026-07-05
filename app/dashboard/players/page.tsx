export default function PlayersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Players</h1>

        <p className="text-muted-foreground mt-2">
          Player management is currently available inside each Team profile.
        </p>
      </div>

      <div className="rounded-xl border border-border p-8">
        <p className="text-muted-foreground">
          Open a Team and use the <strong>Players</strong> section to create and
          manage players.
        </p>
      </div>
    </div>
  );
}