"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  badge?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  subtitle,
  trend,
  badge,
}: Props) {
  return (
    <Card className="group overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
      <CardContent className="relative p-6">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/20" />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
              {value}
            </h2>

            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon
              className={`h-7 w-7 ${iconClassName ?? "text-cyan-400"}`}
            />
          </div>
        </div>

        {(trend || badge) && (
          <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            {trend === "up" && (
              <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <TrendingUp className="h-4 w-4" />
                Increasing
              </div>
            )}

            {trend === "down" && (
              <div className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                <TrendingDown className="h-4 w-4" />
                Decreasing
              </div>
            )}

            {trend === "neutral" && (
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted-foreground">
                Stable
              </div>
            )}

            {badge && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                {badge}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}