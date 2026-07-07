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
  onLogoUploaded?: (logoUrl: string) => void;
  onTeamUpdated?: (team: Team) => void;
  readOnly?: boolean;
}

export default function TeamHeader({
  team,
  onLogoUploaded,
  onTeamUpdated,
  readOnly = false,
}: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative group h-56 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        {team.banner_url && (
          <img
            src={team.banner_url}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        )}

        {!readOnly && onTeamUpdated && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
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
        )}
      </div>

      <CardContent className="relative px-8 pb-8">
        <div className="-mt-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              {team.logo_url ? (
                <img
                  src={team.logo_url}
                  alt={team.name}
                  className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-background bg-gray-800 text-5xl shadow-lg">
                  ⚽
                </div>
              )}

              {!readOnly && onLogoUploaded && (
                <div className="mt-4">
                  <UploadTeamLogo
                    teamId={team.id}
                    onUploaded={onLogoUploaded}
                  />
                </div>
              )}
            </div>

            <div className="pb-2">
              <h1 className="text-4xl font-bold">
                {team.name}
              </h1>

              <Badge className="mt-2">
                {team.tag}
              </Badge>

              <div className="mt-5 flex flex-wrap gap-6 text-muted-foreground">
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
          </div>          {!readOnly && onTeamUpdated && (
            <div className="self-start md:self-end">
              <EditTeamDialog
                team={team}
                onUpdated={onTeamUpdated}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}