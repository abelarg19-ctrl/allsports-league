import { supabase } from "@/lib/supabase";
import { Player } from "@/lib/types";

export class PlayerService {
  static async getAll(ownerId: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Player[];
  }

  static async getCount(ownerId: string): Promise<number> {
    const { count, error } = await supabase
      .from("players")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("owner_id", ownerId);

    if (error) throw error;

    return count ?? 0;
  }

  static async getByTeam(teamId: number): Promise<Player[]> {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", teamId)
      .order("number", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Player[];
  }

  static async getById(id: number): Promise<Player> {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Player;
  }

  static async create(
    player: Omit<Player, "id" | "created_at">
  ): Promise<Player> {
    const { data, error } = await supabase
      .from("players")
      .insert(player)
      .select()
      .single();

    if (error) throw error;

    return data as Player;
  }

  static async update(
    id: number,
    updates: Partial<Player>
  ): Promise<Player> {
    const { data, error } = await supabase
      .from("players")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Player;
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  static async search(
    teamId: number,
    query: string
  ): Promise<Player[]> {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", teamId)
      .or(
        `first_name.ilike.%${query}%,last_name.ilike.%${query}%`
      )
      .order("first_name");

    if (error) throw error;

    return (data ?? []) as Player[];
  }
}