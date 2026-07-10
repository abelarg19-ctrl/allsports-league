import { supabase } from "@/lib/supabase";
import { Team } from "@/lib/types";

type TeamBasicInfo = {
  id: number;
  name: string;
  logo_url: string | null;
};

export class TeamService {
  static async getAll(
    ownerId: string
  ): Promise<Team[]> {
    const { data, error } = await supabase
      .from("teams")
      .select(`
        id,
        owner_id,
        name,
        tag,
        logo_url,
        wins,
        losses,
        elo,
        created_at
      `)
      .eq("owner_id", ownerId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as Team[];
  }

  static async getCount(
    ownerId: string
  ): Promise<number> {
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

  static async getById(
    id: number
  ): Promise<Team> {
    const { data, error } = await supabase
      .from("teams")
      .select(`
        id,
        owner_id,
        name,
        tag,
        description,
        country,
        website,
        logo_url,
        banner_url,
        wins,
        losses,
        elo,
        created_at
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Team;
  }

  static async getName(
    id: number
  ): Promise<string> {
    const { data, error } = await supabase
      .from("teams")
      .select("name")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data.name;
  }

  static async getNames(
    ids: number[]
  ): Promise<Record<number, string>> {
    if (ids.length === 0) {
      return {};
    }

    const { data, error } = await supabase
      .from("teams")
      .select("id,name")
      .in("id", ids);

    if (error) throw error;

    const map: Record<number, string> = {};

    for (const team of data ?? []) {
      map[team.id] = team.name;
    }

    return map;
  }

  static async getBasicInfos(
    ids: number[]
  ): Promise<Record<number, TeamBasicInfo>> {
    if (ids.length === 0) {
      return {};
    }

    const { data, error } = await supabase
      .from("teams")
      .select("id,name,logo_url")
      .in("id", ids);

    if (error) throw error;

    const map: Record<number, TeamBasicInfo> = {};

    for (const team of data ?? []) {
      map[team.id] = {
        id: team.id,
        name: team.name,
        logo_url: team.logo_url,
      };
    }

    return map;
  }  static async create(
    team: Omit<Team, "id" | "created_at">
  ): Promise<Team> {
    const alreadyExists = await this.exists(
      team.owner_id,
      team.name
    );

    if (alreadyExists) {
      throw new Error("A team with this name already exists.");
    }

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
    if (Object.keys(updates).length === 0) {
      return this.getById(id);
    }

    const { data, error } = await supabase
      .from("teams")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Team;
  }

  static async delete(
    id: number
  ): Promise<void> {
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
      .ilike("name", name.trim());

    if (error) throw error;

    return (count ?? 0) > 0;
  }
}