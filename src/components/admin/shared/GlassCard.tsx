import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, glow = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300",
        hover && "hover:bg-white/8 hover:border-white/20 cursor-pointer",
        glow && "shadow-[0_0_30px_rgba(251,146,60,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
