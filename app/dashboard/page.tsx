"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Users,
  CalendarDays,
  Activity,
  Swords,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { supabase } from "@/lib/supabase";

import { TournamentService } from "@/services/tournament.service";
import { TeamService } from "@/services/team.service";
import { MatchService } from "@/services/match.service";

export default function Dashboard() {
  const [stats, setStats] = useState({
    tournaments: 0,
    active: 0,
    finished: 0,
    teams: 0,
    matches: 0,
  });

  const [userName, setUserName] = useState("Player");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserName(user.email?.split("@")[0] || "Player");

    const tournaments = await TournamentService.getAll(user.id);
    const teams = await TeamService.getAll(user.id);

    let matches = 0;

    for (const tournament of tournaments) {
      const list = await MatchService.getByTournament(
        tournament.id
      );

      matches += list.length;
    }

    setStats({
      tournaments: tournaments.length,
      active: tournaments.filter(
        (t) => t.status === "Active"
      ).length,
      finished: tournaments.filter(
        (t) => t.status === "Finished"
      ).length,
      teams: teams.length,
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Tournaments
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.tournaments}
              </h2>
            </div>

            <Trophy className="h-10 w-10 text-yellow-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.active}
              </h2>
            </div>

            <Activity className="h-10 w-10 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Finished
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.finished}
              </h2>
            </div>

            <CalendarDays className="h-10 w-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Teams
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.teams}
              </h2>
            </div>

            <Users className="h-10 w-10 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Matches
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stats.matches}
              </h2>
            </div>

            <Swords className="h-10 w-10 text-red-500" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8">
          <h2 className="mb-4 text-xl font-bold">
            Recent Activity
          </h2>

          <p className="text-muted-foreground">
            Activity feed coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}