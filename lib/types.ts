// =======================================
// USER PROFILE
// =======================================

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;

  elo: number;

  wins: number;
  losses: number;
  draws: number;

  tournaments_played: number;
  tournaments_won: number;

  matches_played: number;

  is_verified: boolean;
  is_admin: boolean;
  is_banned: boolean;

  created_at: string;
}

// =======================================
// TOURNAMENT
// =======================================

export interface Tournament {
  id: number;

  name: string;
  description: string | null;

  sport: string;
  format: string;
  status: string;

  max_teams: number;

  owner_id: string;

  image_url: string | null;

  start_date: string | null;
  end_date: string | null;
  registration_deadline: string | null;

  prize_pool: number;

  game: string | null;
  platform: string | null;
  region: string | null;

  visibility: string;

  current_round: number;
  winner_team_id: number | null;

  is_registration_open: boolean;

  created_at: string;
}

// =======================================
// TOURNAMENT TEAM
// =======================================

export interface TournamentTeam {
  id: number;

  tournament_id: number;

  team_id: number;

  created_at: string;
}

// =======================================
// TEAM
// =======================================

export interface Team {
  id: number;

  name: string;
  tag: string;

  description: string | null;

  logo_url: string | null;
  banner_url: string | null;

  country: string | null;
  city: string | null;

  website: string | null;
  discord: string | null;

  owner_id: string;

  wins: number;
  losses: number;

  elo: number;

  is_public: boolean;

  created_at: string;
}

// =======================================
// TEAM MEMBER
// =======================================

export interface TeamMember {
  id: number;

  team_id: number;

  user_id: string;

  role: "Owner" | "Captain" | "Coach" | "Player";

  joined_at: string;
}

// =======================================
// MATCH
// =======================================

export interface Match {
  id: number;

  tournament_id: number;

  home_team_id: number;
  away_team_id: number;

  home_score: number;
  away_score: number;

  round: number;

  status: string;

  starts_at: string | null;
}

// =======================================
// PLAYER
// =======================================

export interface Player {
  id: number;

  team_id: number;

  owner_id: string;

  first_name: string;
  last_name: string;

  nickname: string | null;

  avatar_url: string | null;

  number: number | null;

  position: string | null;

  country: string | null;
  city: string | null;

  birth_date: string | null;

  bio: string | null;

  wins: number;
  losses: number;
  draws: number;

  goals: number;
  assists: number;
  mvp: number;

  elo: number;

  is_active: boolean;

  created_at: string;
}