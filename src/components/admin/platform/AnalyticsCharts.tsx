"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Activity } from "lucide-react";
import { getAnalytics } from "@/lib/admin/mock/mockApi";

export function AnalyticsCharts() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <GlassCard key={i} className="p-6">
            <div className="h-80 bg-white/5 rounded-xl animate-pulse" />
          </GlassCard>
        ))}
      </div>
    );
  }

  const performanceData = [
    { time: "00:00", responseTime: 120, errorRate: 0.1 },
    { time: "04:00", responseTime: 115, errorRate: 0.15 },
    { time: "08:00", responseTime: 145, errorRate: 0.25 },
    { time: "12:00", responseTime: 180, errorRate: 0.3 },
    { time: "16:00", responseTime: 160, errorRate: 0.2 },
    { time: "20:00", responseTime: 130, errorRate: 0.15 },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Time Range:</span>
        {(["24h", "7d", "30d"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              timeRange === range
                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <GlassCard className="p-6" glow>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Activity className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Performance Trends</h3>
              <p className="text-sm text-gray-400">Response time over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 15, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#9ca3af" }} />
              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="#fb923c"
                strokeWidth={2}
                dot={{ fill: "#fb923c", r: 4 }}
                name="Response Time (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* User Growth */}
        <GlassCard className="p-6" glow>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">User Growth</h3>
              <p className="text-sm text-gray-400">New registrations by type</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.growth?.userGrowth || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 15, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#9ca3af" }} />
              <Bar dataKey="students" fill="#fb923c" name="Students" radius={[8, 8, 0, 0]} />
              <Bar dataKey="mentors" fill="#06b6d4" name="Mentors" radius={[8, 8, 0, 0]} />
              <Bar dataKey="institutions" fill="#10b981" name="Institutions" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-white">
                {(analytics?.totalUsers?.students || 0) + (analytics?.totalUsers?.mentors || 0) + (analytics?.totalUsers?.institutions || 0)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <TrendingUp className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <span className="text-green-400">↑ 12%</span>
            <span>vs last month</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Interview Sessions</p>
              <p className="text-3xl font-bold text-white">{analytics?.sessions?.interviews?.toLocaleString() || 0}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <span className="text-green-400">↑ 8%</span>
            <span>vs last month</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Exam Sessions</p>
              <p className="text-3xl font-bold text-white">{analytics?.sessions?.exams?.toLocaleString() || 0}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <span className="text-green-400">↑ 15%</span>
            <span>vs last month</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
