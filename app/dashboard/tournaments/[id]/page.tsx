"use client";

import { use, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import TournamentDetail from "@/features/tournaments/components/TournamentDetail";
import TournamentMatchesList from "@/features/tournaments/components/TournamentMatchesList";

import {
  TournamentLoaderService,
  TournamentPageData,
} from "@/services/tournament-loader.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function TournamentPage({
  params,
}: PageProps) {
  const { id } = use(params);

  const [data, setData] =
    useState<TournamentPageData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    void loadTournament();
  }, [id]);

  async function loadTournament() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const page =
        await TournamentLoaderService.load(
          Number(id),
          user.id
        );

      setData(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        Loading tournament...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-300">
        Tournament not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <TournamentDetail
        tournament={data.tournament}
        overview={data.overview}
        canManage={data.canManage}
      />

      <TournamentMatchesList
        matches={data.matches}
        teamMap={data.teamMap}
      />
    </div>
  );
}