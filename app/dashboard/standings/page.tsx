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

import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";

import { TournamentService } from "@/services/tournament.service";
import { TeamService } from "@/services/team.service";
import { MatchService } from "@/services/match.service";
import { PlayerService } from "@/services/player.service";

import StatCard from "@/features/dashboard/components/StatCard";
import UpcomingMatches from "@/features/dashboard/components/UpcomingMatches";
import LatestResults from "@/features/dashboard/components/LatestResults";
import RecentActivity from "@/features/dashboard/components/RecentActivity";

export default function Dashboard() {
  const [stats, setStats] = useState({
    tournaments: 0,
    active: 0,
    finished: 0,
    teams: 0,
    players: 0,
    matches: 0,
  });

  const [userName, setUserName] = useState("Player");

  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [latestResults, setLatestResults] = useState<Match[]>([]);

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserName(user.email?.split("@")[0] ?? "Player");

      const tournaments = await TournamentService.getAll(user.id);

      const [teams, players] = await Promise.all([
        TeamService.getCount(user.id),
        PlayerService.getCount(user.id),
      ]);

      let totalMatches = 0;

      const upcoming: Match[] = [];
      const finished: Match[] = [];

      for (const tournament of tournaments) {
        const matches =
          await MatchService.getByTournament(
            tournament.id
          );

        totalMatches += matches.length;

        if (upcoming.length < 5) {
          const pending =
            await MatchService.getUpcomingByTournament(
              tournament.id,
              5 - upcoming.length
            );

          upcoming.push(...pending);
        }

        if (finished.length < 5) {
          const recent =
            await MatchService.getRecentResultsByTournament(
              tournament.id,
              5 - finished.length
            );

          finished.push(...recent);
        }
      }

      setUpcomingMatches(upcoming);
      setLatestResults(finished);

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
        matches: totalMatches,
      });
    } catch (error) {
      console.error(error);
    }
  }  return (
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

        <LatestResults matches={latestResults} />

        <div className="lg:col-span-2">
          <RecentActivity
            items={[
              {
                id: 1,
                icon: "tournament",
                title: `${stats.tournaments} Tournament(s)`,
                description:
                  "Total tournaments created.",
              },
              {
                id: 2,
                icon: "team",
                title: `${stats.teams} Team(s)`,
                description:
                  "Registered across your tournaments.",
              },
              {
                id: 3,
                icon: "match",
                title: `${stats.matches} Match(es)`,
                description:
                  "Fixtures generated so far.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}