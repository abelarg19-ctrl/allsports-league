"use client";

import { useState } from "react";

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