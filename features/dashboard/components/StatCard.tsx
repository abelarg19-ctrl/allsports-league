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
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <Icon
            className={`h-10 w-10 ${iconClassName ?? ""}`}
          />
        </div>

        {(trend || badge) && (
          <div className="mt-4 flex items-center justify-between">
            {trend === "up" && (
              <div className="flex items-center gap-1 text-xs text-green-500">
                <TrendingUp className="h-4 w-4" />
                Increasing
              </div>
            )}

            {trend === "down" && (
              <div className="flex items-center gap-1 text-xs text-red-500">
                <TrendingDown className="h-4 w-4" />
                Decreasing
              </div>
            )}

            {trend === "neutral" && (
              <div className="text-xs text-muted-foreground">
                Stable
              </div>
            )}

            {badge && (
              <span className="rounded-full bg-muted px-2 py-1 text-xs">
                {badge}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}