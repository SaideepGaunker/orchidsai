"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Users, TrendingUp, Award, Activity } from "lucide-react";

export default function MentorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // Mock data
  const metrics = [
    { label: "TOTAL STUDENTS", value: "334", subtext: "+12% from last month", icon: Users, color: "emerald" },
    { label: "AVERAGE SCORE", value: "64.4", subtext: "AVERAGE SCORE CI", icon: Award, color: "blue" },
    { label: "TOTAL SESSIONS", value: "1,248", subtext: "100% are in-depth", icon: Activity, color: "purple" },
    { label: "DIFFICULT BATCHES", value: "24", subtext: "Requires attention", icon: TrendingUp, color: "red" },
  ];

  const recentActivity = [
    { id: 1, student: "ANAND SHARMA", batchId: 17, level: 98, status: "ACTIVE", profile: "View Profile" },
    { id: 2, student: "ANANYA NATE", batchId: 8, level: 94, status: "ACTIVE", profile: "View Profile" },
    { id: 3, student: "ETHAN HUNT", batchId: 14, level: 92, status: "ACTIVE", profile: "View Profile" },
    { id: 4, student: "PRACHI GUPTA", batchId: 2, level: 52, status: "INACTIVE", profile: "View Profile" },
    { id: 5, student: "NEHA REDDY", batchId: 22, level: 88, status: "ACTIVE", profile: "View Profile" },
  ];

  const performanceBySkill = [
    { skill: "Databases", score: 95 },
    { skill: "Data Structures", score: 88 },
    { skill: "Networking", score: 82 },
    { skill: "System Design", score: 78 },
    { skill: "Problem Solving", score: 62 },
    { skill: "Communication", score: 45 },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Mentor Overview</h1>
        <p className="mt-1 text-sm text-gray-400">
          Students performance metrics across all batches and institutions
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {metric.label}
              </p>
              <metric.icon size={16} className={`text-${metric.color}-400`} />
            </div>
            <p className="mb-1 text-3xl font-bold text-white">{metric.value}</p>
            <p className="text-xs text-gray-500">{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Platform Engagement Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              PLATFORM ENGAGEMENT
            </h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span className="text-gray-400">Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                <span className="text-gray-400">Inactive Students</span>
              </div>
            </div>
          </div>
          <div className="relative h-48">
            {/* Simple line chart visualization */}
            <svg className="h-full w-full" viewBox="0 0 600 150" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Active students line (emerald) */}
              <polyline
                points="0,120 100,110 200,100 300,85 400,75 500,65 600,50"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              
              {/* Inactive students line (gray) */}
              <polyline
                points="0,130 100,128 200,125 300,122 400,120 500,118 600,115"
                fill="none"
                stroke="#4b5563"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>
            {/* X-axis labels */}
            <div className="mt-2 flex justify-between text-xs text-gray-600">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Performance by Skill */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            PERFORMANCE BY SKILL
          </h3>
          <div className="space-y-3">
            {performanceBySkill.map((item, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{item.skill}</span>
                  <span className={item.score >= 70 ? "text-emerald-400" : "text-red-400"}>
                    {item.score}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 70 ? "bg-emerald-400" : "bg-red-400"
                    }`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">
              COMMUNICATION
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Monitor closely: performance is below 50%. Consider additional training or resources.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            RECENT ACTIVITY
          </h3>
          <div className="flex gap-2">
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-all hover:bg-white/10">
              Student Batches
            </button>
            <button className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 transition-all hover:bg-emerald-500/20">
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <th className="pb-3">STUDENT</th>
                <th className="pb-3">BATCH/COHORT</th>
                <th className="pb-3">AVG CI</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-white/5 text-sm transition-colors hover:bg-white/5"
                >
                  <td className="py-4 font-medium text-white">{activity.student}</td>
                  <td className="py-4 text-gray-400">{activity.batchId}</td>
                  <td className="py-4 text-gray-400">{activity.level}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        activity.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => router.push(`/mentor/profile/${activity.id}`)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {activity.profile}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
