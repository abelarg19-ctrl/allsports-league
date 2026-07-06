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

  static async getCount(ownerId: string): Promise<number> {
    const { count, error } = await supabase
      .from("teams")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("owner_id", ownerId);

    if (error) throw error;

    return count ?? 0;
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

  static async getName(id: number): Promise<string> {
    const { data, error } = await supabase
      .from("teams")
      .select("name")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data.name;
  }

  static async getNames(ids: number[]): Promise<Record<number, string>> {
    if (ids.length === 0) return {};

    const { data, error } = await supabase
      .from("teams")
      .select("id,name")
      .in("id", ids);

    if (error) throw error;

    return (data ?? []).reduce<Record<number, string>>((acc, team) => {
      acc[team.id] = team.name;
      return acc;
    }, {});
  }

  static async create(
    team: Omit<Team, "id" | "created_at">
  ): Promise<Team> {
    const { data, error } = await supabase
      .from("teams")
      .insert(team)
      .select()
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

  static async exists(
    ownerId: string,
    name: string
  ): Promise<boolean> {
    const { count, error } = await supabase
      .from("teams")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("owner_id", ownerId)
      .ilike("name", name);

    if (error) throw error;

    return (count ?? 0) > 0;
  }
}