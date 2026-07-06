"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";
import { MatchService } from "@/services/match.service";

import { Button } from "@/components/ui/button";

interface Props {
  tournamentId: number;
  onGenerated?: () => void;
}

export default function GenerateFixturesButton({
  tournamentId,
  onGenerated,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    const confirmed = window.confirm(
      "Generate fixtures for this tournament?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      // Evita generar fixtures duplicados
      const { count, error } = await supabase
        .from("matches")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("tournament_id", tournamentId);

      if (error) throw error;

      if ((count ?? 0) > 0) {
        alert("Fixtures have already been generated.");
        return;
      }

      await MatchService.generateRoundRobin(
        tournamentId
      );

      onGenerated?.();

      alert("Fixtures generated successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to generate fixtures.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading
        ? "Generating..."
        : "Generate Fixtures"}
    </Button>
  );
}