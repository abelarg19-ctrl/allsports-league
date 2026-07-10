"use client";

import TournamentMatchesList from "@/features/tournaments/components/TournamentMatchesList";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TournamentPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <TournamentMatchesList
      tournamentId={Number(id)}
    />
  );
}