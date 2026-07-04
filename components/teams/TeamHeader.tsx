"use client";

import UploadTeamLogo from "@/components/teams/UploadTeamLogo";
import UploadTeamBanner from "@/components/teams/UploadTeamBanner";
import EditTeamDialog from "@/features/teams/components/EditTeamDialog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Globe, MapPin } from "lucide-react";

import { Team } from "@/lib/types";

interface Props {
  team: Team;
  onLogoUploaded: (logoUrl: string) => void;
  onTeamUpdated: (team: Team) => void;
}

export default function TeamHeader({
  team,
  onLogoUploaded,
  onTeamUpdated,
}: Props) {
  return (
    <Card className="overflow-hidden">
      {/* Banner */}
      <div className="relative h-56 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 group">

  {team.banner_url && (
    <img
      src={team.banner_url}
      alt="Banner"
      className="w-full h-full object-cover"
    />
  )}

  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

    <UploadTeamBanner
      teamId={team.id}
      onUploaded={(bannerUrl) =>
        onTeamUpdated({
          ...team,
          banner_url: bannerUrl,
        })
      }
    />

  </div>

</div>

      <CardContent className="relative px-8 pb-8">
        <div className="-mt-16 flex flex-col md:flex-row gap-6 md:items-end justify-between">
          <div className="flex gap-6">
            {/* Logo */}
            <div className="flex flex-col items-center">
              {team.logo_url ? (
                <img
                  src={team.logo_url}
                  alt={team.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-background shadow-lg flex items-center justify-center text-5xl">
                  ⚽
                </div>
              )}

              <div className="mt-4">
                <UploadTeamLogo
                  teamId={team.id}
                  onUploaded={onLogoUploaded}
                />
              </div>
            </div>

            {/* Info */}
            <div className="pb-2">
              <h1 className="text-4xl font-bold">{team.name}</h1>

              <Badge className="mt-2">{team.tag}</Badge>

              <div className="flex flex-wrap gap-6 mt-5 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {team.country || "-"}
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  {team.website || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="self-start md:self-end">
            <EditTeamDialog
              team={team}
              onUpdated={onTeamUpdated}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}