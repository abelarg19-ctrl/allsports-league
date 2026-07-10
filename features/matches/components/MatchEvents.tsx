"use client";

import {
  Goal,
  ShieldAlert,
  Repeat,
  Star,
  Flag,
} from "lucide-react";

export type MatchEvent = {
  id: number;
  minute: number;
  type:
    | "goal"
    | "yellow"
    | "red"
    | "substitution"
    | "mvp";
  player: string;
  description?: string;
};

interface Props {
  events?: MatchEvent[];
}

const icons = {
  goal: Goal,
  yellow: ShieldAlert,
  red: ShieldAlert,
  substitution: Repeat,
  mvp: Star,
};

const colors = {
  goal: "text-green-400",
  yellow: "text-yellow-400",
  red: "text-red-500",
  substitution: "text-cyan-400",
  mvp: "text-purple-400",
};

export default function MatchEvents({
  events = [],
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <h2 className="mb-6 text-2xl font-bold">
        Match Events
      </h2>

      {!events.length ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <Flag className="mx-auto mb-4 h-10 w-10 text-gray-500" />

          <p className="text-gray-400">
            No events recorded.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {events.map((event) => {
            const Icon = icons[event.type];

            return (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Icon
                      className={`h-5 w-5 ${colors[event.type]}`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {event.player}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {event.description ??
                        event.type}
                    </p>
                  </div>

                </div>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-300">
                  {event.minute}'
                </span>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}