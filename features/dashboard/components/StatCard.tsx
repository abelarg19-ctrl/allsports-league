"use client";

import Link from "next/link";

import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

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
  href?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  subtitle,
  trend,
  badge,
  href,
}: Props) {
  const card = (
    <Card className="group h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
      <CardContent className="relative p-4 sm:p-5 lg:p-6">
        <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-400/20 sm:h-24 sm:w-24" />

        <div className="relative flex items-start justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.2em] lg:tracking-[0.25em]">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:mt-3 sm:text-4xl">
              {value}
            </h2>

            {subtitle && (
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14">
            <Icon
              className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${
                iconClassName ?? "text-cyan-400"
              }`}
            />
          </div>
        </div>

        {(trend || badge) && (
          <div className="relative mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 sm:mt-6 sm:justify-between sm:pt-4">
            {trend === "up" && (
              <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400 sm:px-3 sm:text-xs">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                Increasing
              </div>
            )}

            {trend === "down" && (
              <div className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 sm:px-3 sm:text-xs">
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                Decreasing
              </div>
            )}

            {trend === "neutral" && (
              <div className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-muted-foreground sm:px-3 sm:text-xs">
                Stable
              </div>
            )}

            {badge && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-semibold text-cyan-300 sm:px-3 sm:text-xs">
                {badge}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block cursor-pointer"
    >
      {card}
    </Link>
  );
}