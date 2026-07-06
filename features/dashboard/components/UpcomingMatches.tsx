"use client";

import { Match } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  matches: Match[];
};

export default function UpcomingMatches({
  matches,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-lg font-bold">
          Upcoming Matches
        </h2>

        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming matches.
          </p>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    Team #{match.home_team_id} vs Team #{match.away_team_id}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Round {match.round}
                  </p>
                </div>

                <span className="rounded bg-yellow-500/10 px-2 py-1 text-xs text-yellow-500">
                  {match.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}