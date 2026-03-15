"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { logAdminAction } from "@/lib/admin/mock/mockApi";
import { LoadingSpinner } from "@/components/admin/shared/LoadingSpinner";
import { SkeletonMetricsGrid, SkeletonChart, SkeletonTable } from "@/components/admin/shared/SkeletonLoader";

// Code splitting: Lazy load heavy components
const DashboardMetrics = dynamic(
  () => import("@/components/admin/platform/DashboardMetrics").then((mod) => ({ default: mod.DashboardMetrics })),
  {
    loading: () => <SkeletonMetricsGrid count={4} />,
    ssr: false,
  }
);

const AnalyticsCharts = dynamic(
  () => import("@/components/admin/platform/AnalyticsCharts").then((mod) => ({ default: mod.AnalyticsCharts })),
  {
    loading: () => <SkeletonChart />,
    ssr: false,
  }
);

const BugReportTable = dynamic(
  () => import("@/components/admin/platform/BugReportTable").then((mod) => ({ default: mod.BugReportTable })),
  {
    loading: () => <SkeletonTable />,
    ssr: false,
  }
);

const UsageAnalytics = dynamic(
  () => import("@/components/admin/platform/UsageAnalytics").then((mod) => ({ default: mod.UsageAnalytics })),
  {
    loading: () => <SkeletonChart />,
    ssr: false,
  }
);

export default function AdminDashboard() {
  const { user } = useAuth();

  useEffect(() => {
    // Log page access
    if (user) {
      logAdminAction({
        adminId: user.id || "unknown",
        adminEmail: user.email || "unknown",
        actionType: "auth_success",
        resourceType: "route",
        resourceId: "/admin",
        timestamp: new Date(),
      });
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Platform Monitor</h1>
        <p className="mt-2 text-gray-400">Real-time system health and performance metrics</p>
      </div>

      {/* Dashboard Metrics */}
      <DashboardMetrics />

      {/* Performance Analytics Charts */}
      <AnalyticsCharts />

      {/* Usage Analytics */}
      <UsageAnalytics />

      {/* Bug Reports */}
      <BugReportTable />
    </div>
  );
}
