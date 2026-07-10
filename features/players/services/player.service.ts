import { supabase } from "@/lib/supabase";
import { Player } from "@/lib/types";

export class PlayerService {
  static async getAll(
    ownerId: string
  ): Promise<Player[]> {
    const { data, error } = await supabase
      .from("players")
      .select(`
        id,
        owner_id,
        team_id,
        first_name,
        last_name,
        nickname,
        number,
        position,
        avatar_url,
        elo,
        created_at
      `)
      .eq("owner_id", ownerId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as Player[];
  }

  static async getCount(
    ownerId: string
  ): Promise<number> {
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

  static async getByTeam(
    teamId: number
  ): Promise<Player[]> {
    const { data, error } = await supabase
      .from("players")
      .select(`
        id,
        owner_id,
        team_id,
        first_name,
        last_name,
        nickname,
        number,
        position,
        avatar_url,
        elo,
        created_at
      `)
      .eq("team_id", teamId)
      .order("number", {
        ascending: true,
      });

    if (error) throw error;

    return (data ?? []) as Player[];
  }

  static async getById(
    id: number
  ): Promise<Player> {
    const { data, error } = await supabase
      .from("players")
      .select(`
        id,
        owner_id,
        team_id,
        first_name,
        last_name,
        nickname,
        number,
        position,
        avatar_url,
        elo,
        created_at
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Player;
  }  static async create(
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
    if (Object.keys(updates).length === 0) {
      return this.getById(id);
    }

    const { data, error } = await supabase
      .from("players")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Player;
  }

  static async delete(
    id: number
  ): Promise<void> {
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
    const value = query.trim();

    if (!value) {
      return this.getByTeam(teamId);
    }

    const { data, error } = await supabase
      .from("players")
      .select(`
        id,
        owner_id,
        team_id,
        first_name,
        last_name,
        nickname,
        number,
        position,
        avatar_url,
        elo,
        created_at
      `)
      .eq("team_id", teamId)
      .or(
        `first_name.ilike.%${value}%,last_name.ilike.%${value}%,nickname.ilike.%${value}%`
      )
      .order("number", {
        ascending: true,
      });

    if (error) throw error;

    return (data ?? []) as Player[];
  }
}