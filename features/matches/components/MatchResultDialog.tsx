"use client";

import { useState } from "react";

import { Match } from "@/lib/types";
import { MatchService } from "@/services/match.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match: Match;
  onSaved: () => void;
};

export default function MatchResultDialog({
  open,
  onOpenChange,
  match,
  onSaved,
}: Props) {
  const [homeScore, setHomeScore] = useState(match.home_score);
  const [awayScore, setAwayScore] = useState(match.away_score);

  const [loading, setLoading] = useState(false);

  async function saveResult() {
    setLoading(true);

    try {
      await MatchService.updateResult(
        match.id,
        Number(homeScore),
        Number(awayScore)
      );

      onSaved();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  async function finishMatch() {
    setLoading(true);

    try {
      await MatchService.finishMatch(match.id);

      onSaved();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  async function reopenMatch() {
    setLoading(true);

    try {
      await MatchService.reopenMatch(match.id);

      onSaved();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">

        <DialogHeader>
          <DialogTitle>Edit Match Result</DialogTitle>

          <DialogDescription>
            Update the match score.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">

          <Input
            type="number"
            min={0}
            value={homeScore}
            onChange={(e) =>
              setHomeScore(Number(e.target.value))
            }
          />

          <Input
            type="number"
            min={0}
            value={awayScore}
            onChange={(e) =>
              setAwayScore(Number(e.target.value))
            }
          />

        </div>

        <DialogFooter className="gap-2">

          <Button
            variant="outline"
            onClick={reopenMatch}
            disabled={loading}
          >
            Reopen
          </Button>

          <Button
            variant="secondary"
            onClick={saveResult}
            disabled={loading}
          >
            Save
          </Button>

          <Button
            onClick={finishMatch}
            disabled={loading}
          >
            Finish Match
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}