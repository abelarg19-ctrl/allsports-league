export interface Standing {
  team_id: number;

  team_name: string;

  logo_url: string | null;

  played: number;

  wins: number;

  draws: number;

  losses: number;

  goals_for: number;

  goals_against: number;

  goal_difference: number;

  points: number;
}

export interface MatchResult {
  match_id: number;

  home_score: number;

  away_score: number;

  status: "Pending" | "Live" | "Finished";
}