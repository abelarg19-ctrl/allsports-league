import { supabase } from "@/lib/supabase";
import {
  Player,
  CreatePlayerDto,
  UpdatePlayerDto,
} from "../types/player.types";

const TABLE = "players";

export const PlayerService = {
  async getAll(): Promise<Player[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("last_name");

    if (error) throw error;

    return data ?? [];
  },

  async getByTeam(teamId: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("team_id", teamId)
      .order("jersey_number");

    if (error) throw error;

    return data ?? [];
  },

  async create(player: CreatePlayerDto) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(player)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(id: string, player: UpdatePlayerDto) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(player)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};