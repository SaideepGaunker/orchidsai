"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function SystemStatusIndicator() {
  const [status, setStatus] = useState<"operational" | "degraded" | "down">("operational");

  useEffect(() => {
    // Simulate status checks
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.95) {
        setStatus("degraded");
      } else {
        setStatus("operational");
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    operational: {
      icon: CheckCircle2,
      text: "All Systems Operational",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    degraded: {
      icon: AlertTriangle,
      text: "Degraded Performance",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    down: {
      icon: XCircle,
      text: "System Down",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <GlassCard className={`px-6 py-3 ${config.bg} border ${config.border}`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${config.color}`} />
        <span className={`text-sm font-medium ${config.color}`}>{config.text}</span>
      </div>
    </GlassCard>
  );
}
