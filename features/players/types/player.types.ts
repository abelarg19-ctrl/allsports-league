export interface Player {
  id: string;

  team_id: string;

  first_name: string;

  last_name: string;

  jersey_number: number | null;

  position: string | null;

  birth_date: string | null;

  avatar_url: string | null;

  created_at: string;

  updated_at: string;
}

export interface CreatePlayerDto {
  team_id: string;

  first_name: string;

  last_name: string;

  jersey_number?: number;

  position?: string;

  birth_date?: string;
}

export interface UpdatePlayerDto {
  first_name?: string;

  last_name?: string;

  jersey_number?: number;

  position?: string;

  birth_date?: string;

  avatar_url?: string;
}