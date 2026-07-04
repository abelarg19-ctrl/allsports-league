"use client";

import { useState } from "react";

import { Team } from "@/lib/types";
import { TeamService } from "@/services/team.service";

import TeamForm, { TeamFormValues } from "./TeamForm";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";

interface Props {
  team: Team;
  onUpdated: (team: Team) => void;
}

export default function EditTeamDialog({
  team,
  onUpdated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: TeamFormValues) {
    try {
      setLoading(true);

      const updated = await TeamService.update(team.id, values);

      onUpdated(updated);

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to update team.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button variant="outline">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Team
          </Button>
        }
      />

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>

          <DialogDescription>
            Update your team's information.
          </DialogDescription>
        </DialogHeader>

        <TeamForm
          mode="edit"
          defaultValues={{
            name: team.name,
            tag: team.tag,
            description: team.description ?? "",
          }}
          loading={loading}
          onCancel={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}