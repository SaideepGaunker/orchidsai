"use client";

import React, { useEffect, useState } from "react";
import { Activity, Clock, AlertTriangle, Users } from "lucide-react";
import { MetricCard } from "../shared/MetricCard";
import { getPlatformMetrics } from "@/lib/admin/mock/mockApi";

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    systemStatus: "operational" as "operational" | "degraded" | "down",
    responseTime: 125,
    errorRate: 0.2,
    activeUsers: 1234,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getPlatformMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-white/5 backdrop-blur-xl rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={Activity}
        label="System Status"
        value={metrics.systemStatus === "operational" ? "Operational" : "Degraded"}
        trend="neutral"
        className="hover:-translate-y-1 transition-transform duration-300"
      />
      <MetricCard
        icon={Clock}
        label="Avg Response Time"
        value={`${metrics.responseTime}ms`}
        trend="down"
        trendValue="5% faster"
        className="hover:-translate-y-1 transition-transform duration-300"
      />
      <MetricCard
        icon={AlertTriangle}
        label="Error Rate"
        value={`${metrics.errorRate}%`}
        trend="down"
        trendValue="0.1% lower"
        className="hover:-translate-y-1 transition-transform duration-300"
      />
      <MetricCard
        icon={Users}
        label="Active Users"
        value={metrics.activeUsers.toLocaleString()}
        trend="up"
        trendValue="12% increase"
        className="hover:-translate-y-1 transition-transform duration-300"
      />
    </div>
  );
}
