import { supabase } from "@/lib/supabase";
import { Match } from "@/lib/types";

export class MatchService {
  static async getByTournament(
    tournamentId: number
  ): Promise<Match[]> {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("tournament_id", tournamentId)
      .order("round", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Match[];
  }

  static async getById(id: number): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Match;
  }

  static async create(
    match: Omit<Match, "id">
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .insert(match)
      .select()
      .single();

    if (error) throw error;

    return data as Match;
  }

  static async update(
    id: number,
    updates: Partial<Match>
  ): Promise<Match> {
    const { data, error } = await supabase
      .from("matches")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Match;
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("matches")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}