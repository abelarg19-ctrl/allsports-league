"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TeamService } from "@/services/team.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateTeamPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");
  const [description, setDescription] = useState("");

  async function createTeam() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      await TeamService.create({
        owner_id: user.id,

        name,
        tag,
        description,

        logo_url: null,
        banner_url: null,

        country,
        city,

        website,
        discord,

        wins: 0,
        losses: 0,

        elo: 1000,

        is_public: true,
      });

      router.push("/dashboard/teams");
    } catch (error) {
      console.error(error);
      alert("Error creating team.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">

      <CardHeader>
        <CardTitle>Create Team</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <div>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label>Tag</Label>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="RMA"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <Label>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

        </div>

        <div>
          <Label>Website</Label>
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <Label>Discord</Label>
          <Input
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          onClick={createTeam}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Creating..." : "Create Team"}
        </Button>

      </CardContent>

    </Card>
  );
}