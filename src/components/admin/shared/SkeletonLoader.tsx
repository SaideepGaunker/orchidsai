"use client";

import { cn } from "@/lib/utils";

export function SkeletonMetricsGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-8 w-32 animate-pulse rounded bg-white/20" />
          <div className="mt-2 h-3 w-20 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
        className
      )}
    >
      <div className="h-6 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-64 animate-pulse rounded bg-white/5" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="h-6 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
            <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
            <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-20 animate-pulse rounded bg-white/5" />
          <div className="mt-4 h-4 w-24 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
