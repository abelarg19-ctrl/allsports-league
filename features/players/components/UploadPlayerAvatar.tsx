"use client";

import { ChangeEvent, useState } from "react";

import { supabase } from "@/lib/supabase";
import { PlayerService } from "@/features/players/services/player.service";

interface Props {
  playerId: number;
  onUploaded: (url: string) => void;
}

export default function UploadPlayerAvatar({
  playerId,
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const extension = file.name.split(".").pop();

      const filePath = `${playerId}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("player-avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("player-avatars")
        .getPublicUrl(filePath);

      await PlayerService.update(playerId, {
        avatar_url: publicUrl,
      });

      onUploaded(publicUrl);
    } catch (error) {
      console.error(error);
      alert("Unable to upload avatar.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <label className="cursor-pointer text-sm text-primary hover:underline">
      {uploading ? "Uploading..." : "Change Avatar"}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </label>
  );
}