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
    <section className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="min-w-0">
        <UpcomingMatches
          matches={matches}
          teamMap={teamMap}
        />
      </div>

      <div className="min-w-0">
        <DashboardLatestResults
          matches={latestResults}
          teamMap={teamMap}
        />
      </div>

      <div className="min-w-0 lg:col-span-2">
        <DashboardRecentActivity
          tournaments={tournaments}
          teams={teams}
          matches={totalMatches}
          finishedMatches={finishedTournaments}
        />
      </div>
    </section>
  );
}
