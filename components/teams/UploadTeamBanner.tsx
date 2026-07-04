"use client";

import { ChangeEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import TeamStorageService from "@/services/teamStorage.service";
import { TeamService } from "@/services/team.service";

interface UploadTeamBannerProps {
  teamId: number;
  onUploaded: (bannerUrl: string) => void;
}

export default function UploadTeamBanner({
  teamId,
  onUploaded,
}: UploadTeamBannerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Only PNG, JPG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum size is 5MB.");
      return;
    }

    try {
      setUploading(true);

      const publicUrl = await TeamStorageService.uploadBanner(
        teamId,
        file
      );

      await TeamService.update(teamId, {
        banner_url: publicUrl,
      });

      onUploaded(publicUrl);

      alert("Banner updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Error uploading banner.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      <Button
        variant="secondary"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? "Uploading..." : "Change Banner"}
      </Button>
    </>
  );
}