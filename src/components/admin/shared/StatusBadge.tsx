import React from "react";
import { cn } from "@/lib/utils";

type StatusType =
  | "active"
  | "pending"
  | "suspended"
  | "expired"
  | "operational"
  | "degraded"
  | "down"
  | "paid"
  | "overdue"
  | "failed"
  | "approved"
  | "rejected"
  | "new"
  | "in_progress"
  | "resolved"
  | "closed";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";

    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    const statusStyles: Record<StatusType, string> = {
      active: "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
      operational: "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
      paid: "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
      approved: "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
      resolved: "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
      
      pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(251,146,60,0.2)]",
      new: "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(251,146,60,0.2)]",
      degraded: "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(251,146,60,0.2)]",
      
      suspended: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      down: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      overdue: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      failed: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      rejected: "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
      
      expired: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
      in_progress: "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
      closed: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
    };

    return cn(baseStyles, sizeStyles[size], statusStyles[status], className);
  };

  const getStatusLabel = () => {
    if (!status) return "Unknown";
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return <span className={getStatusStyles()}>{getStatusLabel()}</span>;
}
