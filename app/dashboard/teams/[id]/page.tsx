"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Team } from "@/lib/types";
import { TeamService } from "@/services/team.service";

import TeamHeader from "@/components/teams/TeamHeader";
import TeamPlayersSection from "@/features/players/components/TeamPlayersSection";

import { Card, CardContent } from "@/components/ui/card";

import { Trophy } from "lucide-react";

export default function TeamProfilePage() {
  const { id } = useParams();

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      const data = await TeamService.getById(Number(id));
      setTeam(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!team) return <p>Team not found.</p>;

  return (
    <div className="space-y-6">
      <TeamHeader
        team={team}
        onLogoUploaded={(logoUrl) =>
          setTeam({
            ...team,
            logo_url: logoUrl,
          })
        }
        onTeamUpdated={(updatedTeam) => setTeam(updatedTeam)}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Wins</p>
            <h2 className="text-4xl font-bold">{team.wins}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Losses</p>
            <h2 className="text-4xl font-bold">{team.losses}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-500" />

              <div>
                <p className="text-muted-foreground">ELO</p>
                <h2 className="text-4xl font-bold">{team.elo}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TeamPlayersSection team={team} />

      <Card>
        <CardContent className="p-8">
          <h2 className="mb-4 text-2xl font-bold">About</h2>

          <p className="text-muted-foreground">
            {team.description || "No description yet."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}