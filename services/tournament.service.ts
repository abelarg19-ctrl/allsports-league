import { supabase } from "@/lib/supabase";
import { Tournament } from "@/lib/types";

export class TournamentService {
  static async getAll(userId: string): Promise<Tournament[]> {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []) as Tournament[];
  }

  static async getById(
    id: number,
    userId: string
  ): Promise<Tournament | null> {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .eq("owner_id", userId)
      .single();

    if (error) {
      return null;
    }

    return data as Tournament;
  }
}