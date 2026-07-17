import Link from "next/link";
import { Users, Trophy } from "lucide-react";

import { Team } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  return (
    <Link
      href={`/dashboard/teams/${team.id}`}
      className="block"
    >
      <Card className="cursor-pointer border-white/10 bg-white/5 transition-all active:scale-[0.99] sm:hover:-translate-y-1 sm:hover:border-cyan-500/40">
        <CardContent className="p-4 sm:p-6">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold sm:text-xl">
                {team.name}
              </h2>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {team.tag}
              </p>
            </div>

            <div className="shrink-0 space-y-2 text-right">
              <div className="flex items-center justify-end gap-2 text-sm">
                <Trophy className="h-4 w-4 shrink-0 text-yellow-500" />
                <span>{team.wins}</span>
              </div>

              <div className="flex items-center justify-end gap-2 text-sm">
                <Users className="h-4 w-4 shrink-0 text-blue-500" />
                <span>ELO {team.elo}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
