"use client";

import { Match } from "@/lib/types";

import UpcomingMatches from "@/features/dashboard/components/UpcomingMatches";
import DashboardLatestResults from "@/features/dashboard/components/DashboardLatestResults";
import DashboardRecentActivity from "@/features/dashboard/components/DashboardRecentActivity";

type TeamInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

type Props = {
  matches: Match[];
  latestResults: Match[];
  teamMap: Record<number, TeamInfo>;
  tournaments: number;
  teams: number;
  totalMatches: number;
  finishedTournaments: number;
};

export default function DashboardUpcomingSection({
  matches,
  latestResults,
  teamMap,
  tournaments,
  teams,
  totalMatches,
  finishedTournaments,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <UpcomingMatches
        matches={matches}
        teamMap={teamMap}
      />

      <DashboardLatestResults
  matches={latestResults}
  teamMap={teamMap}
/>

      <DashboardRecentActivity
        tournaments={tournaments}
        teams={teams}
        matches={totalMatches}
        finishedMatches={finishedTournaments}
      />
    </div>
  );
}