import { supabase } from "@/lib/supabase";
import { Team } from "@/lib/types";

export class TeamService {
  static async getAll(ownerId: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Team[];
  }

  static async create(team: Omit<Team, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("teams")
      .insert(team)
      .select()
      .single();

    if (error) throw error;

    return data as Team;
  }

  static async getById(id: number): Promise<Team> {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Team;
  }

  static async update(
    id: number,
    updates: Partial<Team>
  ): Promise<Team> {
    const { data, error } = await supabase
      .from("teams")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Team;
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}