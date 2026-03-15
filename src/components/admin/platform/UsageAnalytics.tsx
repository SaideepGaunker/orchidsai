"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface UsageData {
  activeUsers: number;
  totalSessions: number;
  avgSessionDuration: number;
  peakHours: string;
}

export function UsageAnalytics() {
  const [data, setData] = useState<UsageData>({
    activeUsers: 0,
    totalSessions: 0,
    avgSessionDuration: 0,
    peakHours: "Loading...",
  });

  useEffect(() => {
    // Simulate fetching usage analytics
    const mockData: UsageData = {
      activeUsers: 1247,
      totalSessions: 3891,
      avgSessionDuration: 24.5,
      peakHours: "2:00 PM - 4:00 PM",
    };
    setData(mockData);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-white">Usage Analytics</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Active Users</p>
          <p className="text-2xl font-bold text-white">{data.activeUsers.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Total Sessions</p>
          <p className="text-2xl font-bold text-white">{data.totalSessions.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Avg Session (min)</p>
          <p className="text-2xl font-bold text-white">{data.avgSessionDuration}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Peak Hours</p>
          <p className="text-lg font-semibold text-white">{data.peakHours}</p>
        </div>
      </div>
    </div>
  );
}
