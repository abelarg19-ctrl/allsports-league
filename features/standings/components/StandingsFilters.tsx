"use client";

import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function StandingsFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:max-w-md">

        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search team..."
          className="pl-12"
        />

      </div>

      <div className="flex gap-3">

        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          All
        </Button>

        <Button variant="outline">
          Top 10
        </Button>

        <Button variant="outline">
          Playoffs
        </Button>

      </div>

    </div>
  );
}