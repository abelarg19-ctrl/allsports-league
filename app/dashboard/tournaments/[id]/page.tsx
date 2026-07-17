"use client";

import { use, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import TournamentDetail from "@/features/tournaments/components/TournamentDetail";
import TournamentMatchesList from "@/features/tournaments/components/TournamentMatchesList";
import RegisterTeamDialog from "@/features/tournaments/components/RegisterTeamDialog";
import GenerateFixturesButton from "@/features/tournaments/components/GenerateFixturesButton";
import RegisteredTeamsList from "@/features/tournaments/components/RegisteredTeamsList";

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

      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Regis              R         </h2>
            <p className="mt-1 text-sm text-gray-400">
              Teams participating in this tournament.
            </p>
          </div>

          {data.canManage && (
            <div className="flex flex-wrap gap-3">
              <RegisterTeamDialog
                tournamentId={data.tournament.id}
                onRegistered={loadTournament}
              />

              <GenerateFixturesButton
                tournamentId={data.tournament.id}
                onGenerated={loadTournament}
              />
            </div>
          )}
        </div>

        <RegisteredTeamsList
          tournamentId={data.tournament.id}
        />
      </section>

      <TournamentMatchesList
        matches={data.matches}
        teamMap={data.teamMap}
      />
    </div>
  );
}