import React from "react";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function MetricCard({ icon: Icon, label, value, trend, trendValue, className }: MetricCardProps) {
  return (
    <GlassCard className={cn("p-6 group", className)} hover glow>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300">
              <Icon className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2 tracking-tight">{value}</div>
          <div className="text-sm text-gray-400 font-medium">{label}</div>
          {trend && trendValue && (
            <div className={cn(
              "text-xs mt-3 flex items-center gap-1.5 font-medium",
              trend === "up" && "text-green-400",
              trend === "down" && "text-red-400",
              trend === "neutral" && "text-gray-400"
            )}>
              <span className="text-base">
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trend === "neutral" && "→"}
              </span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
