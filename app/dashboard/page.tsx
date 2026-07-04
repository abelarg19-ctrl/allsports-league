"use client";

import { useEffect, useState } from "react";
import { Trophy, Users, CalendarDays, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { TournamentService } from "@/services/tournament.service";

export default function Dashboard() {
  const [stats, setStats] = useState({
    tournaments: 0,
    active: 0,
    finished: 0,
    teams: 0,
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

    setUserName(
      user.email?.split("@")[0] || "Player"
    );

    const tournaments = await TournamentService.getAll(user.id);

    setStats({
      tournaments: tournaments.length,
      active: tournaments.filter(
        (t) => t.status === "Active"
      ).length,
      finished: tournaments.filter(
        (t) => t.status === "Finished"
      ).length,
      teams: 0,
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {userName} 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your tournaments, teams and competitions.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-muted-foreground text-sm">
                Tournaments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.tournaments}
              </h2>

            </div>

            <Trophy className="w-10 h-10 text-yellow-500" />

          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-muted-foreground text-sm">
                Active
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.active}
              </h2>

            </div>

            <Activity className="w-10 h-10 text-green-500" />

          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-muted-foreground text-sm">
                Finished
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.finished}
              </h2>

            </div>

            <CalendarDays className="w-10 h-10 text-blue-500" />

          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-muted-foreground text-sm">
                Teams
              </p>

              <h2 className="text-3xl font-bold">
                {stats.teams}
              </h2>

            </div>

            <Users className="w-10 h-10 text-purple-500" />

          </CardContent>
        </Card>

      </div>

      <Card>

        <CardContent className="p-8">

          <h2 className="text-xl font-bold mb-4">
            Recent Activity
          </h2>

          <p className="text-muted-foreground">
            Activity feed will appear here in the next sprint.
          </p>

        </CardContent>

      </Card>

    </div>
  );
}