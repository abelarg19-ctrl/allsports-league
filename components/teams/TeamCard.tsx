import Link from "next/link";
import { Team } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy } from "lucide-react";

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  return (
    <Link href={`/dashboard/teams/${team.id}`}>
      <Card className="hover:border-blue-500 transition cursor-pointer">
        <CardContent className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                {team.name}
              </h2>

              <p className="text-muted-foreground">
                {team.tag}
              </p>

            </div>

            <div className="text-right">

              <div className="flex items-center gap-2 justify-end">

                <Trophy className="w-4 h-4 text-yellow-500"/>

                <span>{team.wins}</span>

              </div>

              <div className="flex items-center gap-2 justify-end">

                <Users className="w-4 h-4 text-blue-500"/>

                <span>ELO {team.elo}</span>

              </div>

            </div>

          </div>

        </CardContent>
      </Card>
    </Link>
  );
}