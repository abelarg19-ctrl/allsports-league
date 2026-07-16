"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";

import { DashboardService } from "@/services/dashboard.service";

import DashboardHero from "@/features/dashboard/components/DashboardHero";
import DashboardStatsGrid from "@/features/dashboard/components/DashboardStatsGrid";
import DashboardUpcomingSection from "@/features/dashboard/components/DashboardUpcomingSection";

type TeamInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    tournaments: 0,
    active: 0,
    finished: 0,
    teams: 0,
    players: 0,
    matches: 0,
  });

  const [userName, setUserName] =
    useState("Player");

  const [upcomingMatches, setUpcomingMatches] =
    useState<Match[]>([]);

  const [latestResults, setLatestResults] =
    useState<Match[]>([]);

  const [teamMap, setTeamMap] =
    useState<Record<number, TeamInfo>>({});

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setUserName(
      user.email?.split("@")[0] ?? "Player"
    );

    const dashboard =
      await DashboardService.load(user.id);

    setStats({
      tournaments: dashboard.tournaments,
      active: dashboard.active,
      finished: dashboard.finished,
      teams: dashboard.teams,
      players: dashboard.players,
      matches: dashboard.matches,
    });

    setUpcomingMatches(
      dashboard.upcomingMatches
    );

    setLatestResults(
      dashboard.latestResults
    );

    setTeamMap(
      dashboard.teamMap
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHero
        userName={userName}
      />

      <DashboardStatsGrid
        stats={stats}
      />

      <DashboardUpcomingSection
        matches={upcomingMatches}
        latestResults={latestResults}
        teamMap={teamMap}
        tournaments={stats.tournaments}
        teams={stats.teams}
        totalMatches={stats.matches}
        finishedTournaments={stats.finished}
      />
    </div>
  );
}