import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

class TeamStorageService {
  private async upload(
    bucket: string,
    folder: string,
    file: File
  ): Promise<string> {
    const extension = file.name.split(".").pop();

    const fileName = `${folder}/${uuidv4()}.${extension}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async uploadLogo(
    teamId: number,
    file: File
  ): Promise<string> {
    return this.upload(
      "team-logos",
      `${teamId}/logo`,
      file
    );
  }

  async uploadBanner(
    teamId: number,
    file: File
  ): Promise<string> {
    return this.upload(
      "team-banners",
      `${teamId}/banner`,
      file
    );
  }

  async deleteFile(
    bucket: string,
    publicUrl: string
  ) {
    const path = publicUrl.split(`/${bucket}/`)[1];

    if (!path) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  }
}

export default new TeamStorageService();