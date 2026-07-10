"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  Swords,
  Trophy,
  Users,
  User,
} from "lucide-react";

import LatestResults from "@/features/dashboard/components/LatestResults";
import RecentActivity from "@/features/dashboard/components/RecentActivity";

import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { TeamService } from "@/services/team.service";
import { MatchService } from "@/services/match.service";
import { PlayerService } from "@/services/player.service";

import { Card, CardContent } from "@/components/ui/card";

import StatCard from "@/features/dashboard/components/StatCard";
import UpcomingMatches from "@/features/dashboard/components/UpcomingMatches";

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

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserName(
      user.email?.split("@")[0] ?? "Player"
    );

    const tournaments =
      await TournamentService.getAccessibleTournaments(
        user.id
      );

    const [teams, players] =
      await Promise.all([
        TeamService.getCount(user.id),
        PlayerService.getCount(user.id),
      ]);

    let matches = 0;

    const upcoming: Match[] = [];

    for (const tournament of tournaments) {
      const list =
        await MatchService.getByTournament(
          tournament.id
        );

      matches += list.length;

      if (upcoming.length < 5) {
        const pending =
          await MatchService.getUpcomingByTournament(
            tournament.id,
            5 - upcoming.length
          );

        upcoming.push(...pending);
      }
    }

    setUpcomingMatches(upcoming);

    setStats({
      tournaments: tournaments.length,
      active: tournaments.filter(
        (t) => t.status === "Active"
      ).length,
      finished: tournaments.filter(
        (t) => t.status === "Finished"
      ).length,
      teams,
      players,
      matches,
    });
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Welcome back, {userName} 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your tournaments, teams and competitions.
        </p>

      </div>

<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Tournaments"
          value={stats.tournaments}
          icon={Trophy}
          iconClassName="text-yellow-500"
        />

        <StatCard
          title="Active"
          value={stats.active}
          icon={Activity}
          iconClassName="text-green-500"
        />

        <StatCard
          title="Finished"
          value={stats.finished}
          icon={CalendarDays}
          iconClassName="text-blue-500"
        />

        <StatCard
          title="Teams"
          value={stats.teams}
          icon={Users}
          iconClassName="text-purple-500"
        />

        <StatCard
          title="Players"
          value={stats.players}
          icon={User}
          iconClassName="text-cyan-500"
        />

        <StatCard
          title="Matches"
          value={stats.matches}
          icon={Swords}
          iconClassName="text-red-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingMatches matches={upcomingMatches} />

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-bold">
              Latest Results
            </h2>

            <p className="text-sm text-muted-foreground">
              Coming in ASL-029.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-bold">
              Recent Activity
            </h2>

            <p className="text-sm text-muted-foreground">
              Activity feed coming soon.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}