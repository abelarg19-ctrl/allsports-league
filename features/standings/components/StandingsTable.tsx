"use client";

import { Crown, Medal, Trophy } from "lucide-react";

import { Standing } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  standings: Standing[];
  loading: boolean;
};

export default function StandingsTable({
  standings,
  loading,
}: Props) {
  function getPositionIcon(position: number) {
    switch (position) {
      case 1:
        return (
          <Crown className="h-5 w-5 text-yellow-400" />
        );

      case 2:
        return (
          <Medal className="h-5 w-5 text-gray-300" />
        );

      case 3:
        return (
          <Trophy className="h-5 w-5 text-amber-500" />
        );

      default:
        return (
          <span className="font-bold">
            {position}
          </span>
        );
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <Table>

        <TableHeader>

          <TableRow className="border-white/10">

            <TableHead className="w-16 text-center">
              #
            </TableHead>

            <TableHead>
              Team
            </TableHead>

            <TableHead className="text-center">
              PJ
            </TableHead>

            <TableHead className="text-center">
              PG
            </TableHead>

            <TableHead className="text-center">
              PE
            </TableHead>

            <TableHead className="text-center">
              PP
            </TableHead>

            <TableHead className="text-center">
              GF
            </TableHead>

            <TableHead className="text-center">
              GC
            </TableHead>

            <TableHead className="text-center">
              DG
            </TableHead>

            <TableHead className="text-center">
              PTS
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {loading ? (
            <TableRow>

              <TableCell
                colSpan={10}
                className="py-10 text-center"
              >
                Loading...
              </TableCell>

            </TableRow>
          ) : standings.length === 0 ? (
            <TableRow>

              <TableCell
                colSpan={10}
                className="py-10 text-center text-muted-foreground"
              >
                No standings available.
              </TableCell>

            </TableRow>
          ) : (
            standings.map((team, index) => (
              <TableRow
                key={team.team_id}
                className="border-white/10 transition-all duration-300 hover:bg-cyan-500/5"
              >

                <TableCell className="text-center">
                  {getPositionIcon(index + 1)}
                </TableCell>

                <TableCell>

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        team.logo_url ??
                        "/team-placeholder.png"
                      }
                      alt={team.team_name}
                      className="h-10 w-10 rounded-full border border-white/10 object-cover"
                    />

                    <div>

                      <p className="font-semibold">
                        {team.team_name}
                      </p>

                      <div className="mt-2 h-2 w-28 overflow-hidden rounded-full bg-white/10">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{
                            width: `${Math.min(
                              team.points * 5,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </TableCell>

                <TableCell className="text-center">
                  {team.played}
                </TableCell>

                <TableCell className="text-center text-green-400 font-semibold">
                  {team.wins}
                </TableCell>

                <TableCell className="text-center text-yellow-400 font-semibold">
                  {team.draws}
                </TableCell>

                <TableCell className="text-center text-red-400 font-semibold">
                  {team.losses}
                </TableCell>

                <TableCell className="text-center">
                  {team.goals_for}
                </TableCell>

                <TableCell className="text-center">
                  {team.goals_against}
                </TableCell>

                <TableCell
                  className={`text-center font-semibold ${
                    team.goal_difference >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {team.goal_difference > 0
                    ? `+${team.goal_difference}`
                    : team.goal_difference}
                </TableCell>

                <TableCell>

                  <div className="flex justify-center">

                    <span className="rounded-full bg-cyan-500/10 px-4 py-1 font-bold text-cyan-300">
                      {team.points}
                    </span>

                  </div>

                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>

    </div>
  );
}