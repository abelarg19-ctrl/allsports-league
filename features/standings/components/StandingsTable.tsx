"use client";

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-center">PJ</TableHead>
          <TableHead className="text-center">PG</TableHead>
          <TableHead className="text-center">PE</TableHead>
          <TableHead className="text-center">PP</TableHead>
          <TableHead className="text-center">GF</TableHead>
          <TableHead className="text-center">GC</TableHead>
          <TableHead className="text-center">DG</TableHead>
          <TableHead className="text-center">PTS</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={10}
              className="py-8 text-center"
            >
              Loading...
            </TableCell>
          </TableRow>
        ) : standings.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={10}
              className="py-8 text-center text-muted-foreground"
            >
              No standings available.
            </TableCell>
          </TableRow>
        ) : (
          standings.map((team, index) => (
            <TableRow key={team.team_id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={team.logo_url ?? "/team-placeholder.png"}
                    alt={team.team_name}
                    className="h-8 w-8 rounded-full border object-cover"
                  />

                  <span>{team.team_name}</span>
                </div>
              </TableCell>

              <TableCell className="text-center">
                {team.played}
              </TableCell>

              <TableCell className="text-center">
                {team.wins}
              </TableCell>

              <TableCell className="text-center">
                {team.draws}
              </TableCell>

              <TableCell className="text-center">
                {team.losses}
              </TableCell>

              <TableCell className="text-center">
                {team.goals_for}
              </TableCell>

              <TableCell className="text-center">
                {team.goals_against}
              </TableCell>

              <TableCell className="text-center">
                {team.goal_difference}
              </TableCell>

              <TableCell className="text-center font-bold">
                {team.points}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}