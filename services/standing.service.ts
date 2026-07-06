import { Match, Standing, Team } from "@/lib/types";

export class StandingService {
  static calculate(
    matches: Match[],
    teams: Team[]
  ): Standing[] {
    const table: Standing[] = teams.map((team) => ({
      team_id: team.id,
      team_name: team.name,
      logo_url: team.logo_url,

      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,

      goals_for: 0,
      goals_against: 0,
      goal_difference: 0,

      points: 0,
    }));

    const find = (id: number) =>
      table.find((t) => t.team_id === id)!;

    for (const match of matches) {
      if (match.status !== "Finished") continue;

      const home = find(match.home_team_id);
      const away = find(match.away_team_id);

      home.played++;
      away.played++;

      home.goals_for += match.home_score;
      home.goals_against += match.away_score;

      away.goals_for += match.away_score;
      away.goals_against += match.home_score;

      if (match.home_score > match.away_score) {
        home.wins++;
        away.losses++;
        home.points += 3;
      } else if (match.home_score < match.away_score) {
        away.wins++;
        home.losses++;
        away.points += 3;
      } else {
        home.draws++;
        away.draws++;
        home.points++;
        away.points++;
      }
    }

    table.forEach((team) => {
      team.goal_difference =
        team.goals_for - team.goals_against;
    });

    return table.sort((a, b) => {
      if (b.points !== a.points)
        return b.points - a.points;

      if (b.goal_difference !== a.goal_difference)
        return b.goal_difference - a.goal_difference;

      if (b.goals_for !== a.goals_for)
        return b.goals_for - a.goals_for;

      return a.team_name.localeCompare(b.team_name);
    });
  }
}