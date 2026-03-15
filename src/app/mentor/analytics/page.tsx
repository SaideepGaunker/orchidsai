"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, Award, Calendar, Globe, Target, Clock } from "lucide-react";

export default function InstitutionAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  const domainPerformance = [
    { domain: "Backend Development", avgScore: 85.6, students: 41 },
    { domain: "Data Science & ML", avgScore: 82.3, students: 32 },
    { domain: "Frontend Development", avgScore: 79.4, students: 35 },
    { domain: "Full Stack Development", avgScore: 78.5, students: 45 },
    { domain: "DevOps & Cloud", avgScore: 75.8, students: 28 },
    { domain: "Mobile Development", avgScore: 71.2, students: 38 },
    { domain: "System Design", avgScore: 68.9, students: 22 },
  ];

  const skillBreakdown = [
    { skill: "Technical Knowledge", score: 84, trend: "+5%" },
    { skill: "Problem Solving", score: 78, trend: "+8%" },
    { skill: "Communication", score: 72, trend: "+12%" },
    { skill: "System Design", score: 69, trend: "+3%" },
    { skill: "Coding Speed", score: 81, trend: "+6%" },
    { skill: "Debugging", score: 76, trend: "+4%" },
  ];

  const batchComparison = [
    { batch: "CS Batch 2024-A", students: 45, avgCI: 78.5, completion: 93 },
    { batch: "Data Science Cohort", students: 32, avgCI: 82.3, completion: 88 },
    { batch: "DevOps Engineers", students: 28, avgCI: 75.8, completion: 90 },
    { batch: "Mobile Dev Batch", students: 38, avgCI: 71.2, completion: 85 },
    { batch: "Backend Specialists", students: 41, avgCI: 85.6, completion: 95 },
  ];

  const weeklyActivity = [
    { day: "Mon", interviews: 45, exams: 32 },
    { day: "Tue", interviews: 52, exams: 38 },
    { day: "Wed", interviews: 48, exams: 35 },
    { day: "Thu", interviews: 55, exams: 42 },
    { day: "Fri", interviews: 50, exams: 40 },
    { day: "Sat", interviews: 38, exams: 28 },
    { day: "Sun", interviews: 30, exams: 22 },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Institution Analytics</h1>
          <p className="mt-1 text-sm text-gray-400">Comprehensive performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange("1m")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              timeRange === "1m"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setTimeRange("3m")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              timeRange === "3m"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            3M
          </button>
          <button
            onClick={() => setTimeRange("6m")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              timeRange === "6m"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            6M
          </button>
          <button
            onClick={() => setTimeRange("1y")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              timeRange === "1y"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            1Y
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <Users size={18} className="text-emerald-400" />
            <span className="text-xs text-emerald-400">+12%</span>
          </div>
          <h3 className="text-xs font-medium text-gray-400">Total Students</h3>
          <p className="mt-2 text-3xl font-bold text-white">334</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <BarChart3 size={18} className="text-blue-400" />
            <span className="text-xs text-blue-400">+8%</span>
          </div>
          <h3 className="text-xs font-medium text-gray-400">Total Sessions</h3>
          <p className="mt-2 text-3xl font-bold text-white">2,321</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <Award size={18} className="text-amber-400" />
            <span className="text-xs text-amber-400">+15%</span>
          </div>
          <h3 className="text-xs font-medium text-gray-400">Avg CI Score</h3>
          <p className="mt-2 text-3xl font-bold text-white">78.2</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <TrendingUp size={18} className="text-purple-400" />
            <span className="text-xs text-purple-400">+20%</span>
          </div>
          <h3 className="text-xs font-medium text-gray-400">Completion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-white">87%</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              WEEKLY ACTIVITY
            </h3>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span className="text-gray-400">Interviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                <span className="text-gray-400">Exams</span>
              </div>
            </div>
          </div>
          <div className="relative h-56">
            <svg className="h-full w-full" viewBox="0 0 700 200">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={40 * i + 10}
                  x2="700"
                  y2={40 * i + 10}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Bars */}
              {weeklyActivity.map((day, i) => {
                const x = i * 100 + 20;
                const interviewHeight = (day.interviews / 60) * 180;
                const examHeight = (day.exams / 60) * 180;
                return (
                  <g key={i}>
                    {/* Interview bar */}
                    <rect
                      x={x}
                      y={190 - interviewHeight}
                      width="35"
                      height={interviewHeight}
                      fill="#10b981"
                      rx="4"
                    />
                    {/* Exam bar */}
                    <rect
                      x={x + 40}
                      y={190 - examHeight}
                      width="35"
                      height={examHeight}
                      fill="#3b82f6"
                      rx="4"
                    />
                  </g>
                );
              })}
            </svg>
            <div className="mt-2 flex justify-around text-xs text-gray-600">
              {weeklyActivity.map((day) => (
                <span key={day.day}>{day.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            SKILL BREAKDOWN
          </h3>
          <div className="space-y-4">
            {skillBreakdown.map((item, index) => (
              <div key={index}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400">{item.trend}</span>
                    <span className="text-xs font-semibold text-white">{item.score}%</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 80
                        ? "bg-emerald-400"
                        : item.score >= 70
                        ? "bg-blue-400"
                        : "bg-amber-400"
                    }`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domain Performance & Batch Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance by Domain */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            PERFORMANCE BY DOMAIN
          </h3>
          <div className="space-y-3">
            {domainPerformance.map((item, index) => (
              <div key={index} className="rounded-lg border border-white/5 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{item.domain}</span>
                  <span className="text-sm font-bold text-emerald-400">{item.avgScore}%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.students} students</span>
                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                      style={{ width: `${item.avgScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch Comparison */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            BATCH COMPARISON
          </h3>
          <div className="space-y-3">
            {batchComparison.map((batch, index) => (
              <div key={index} className="rounded-lg border border-white/5 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{batch.batch}</span>
                  <span className="text-xs text-gray-500">{batch.students} students</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Avg CI:</span>
                    <span className="ml-1 font-semibold text-emerald-400">{batch.avgCI}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Completion:</span>
                    <span className="ml-1 font-semibold text-blue-400">{batch.completion}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Progress Trend */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            MONTHLY PROGRESS TREND
          </h3>
          <div className="relative h-56">
            <svg className="h-full w-full" viewBox="0 0 600 200">
              {/* Grid */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={40 * i + 10}
                  x2="600"
                  y2={40 * i + 10}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Line chart */}
              <polyline
                points="0,150 100,140 200,125 300,110 400,95 500,80 600,65"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />
              
              {/* Data points */}
              {[0, 100, 200, 300, 400, 500, 600].map((x, i) => {
                const y = 150 - i * 15;
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill="#10b981" />
                );
              })}
              
              {/* Area fill */}
              <polygon
                points="0,150 100,140 200,125 300,110 400,95 500,80 600,65 600,190 0,190"
                fill="url(#progressGradient)"
                opacity="0.2"
              />
              
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
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

        {/* Session Distribution */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            SESSION DISTRIBUTION
          </h3>
          <div className="relative h-56 flex items-center justify-center">
            {/* Donut Chart */}
            <svg className="h-48 w-48" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="30"
              />
              {/* Interviews - 60% */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#10b981"
                strokeWidth="30"
                strokeDasharray="263 440"
                transform="rotate(-90 100 100)"
              />
              {/* Exams - 40% */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="30"
                strokeDasharray="176 440"
                strokeDashoffset="-263"
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold" fill="white">
                60%
              </text>
              <text x="100" y="115" textAnchor="middle" className="text-xs" fill="rgba(255,255,255,0.5)">
                Interviews
              </text>
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
              <p className="text-xs text-emerald-400">Interviews</p>
              <p className="mt-1 text-lg font-bold text-white">1,393</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3 text-center">
              <p className="text-xs text-blue-400">Exams</p>
              <p className="mt-1 text-lg font-bold text-white">928</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Time Distribution */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              TIME DISTRIBUTION
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-400">Morning (6AM-12PM)</span>
                <span className="text-white">35%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-full w-[35%] rounded-full bg-purple-400"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-400">Afternoon (12PM-6PM)</span>
                <span className="text-white">45%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-full w-[45%] rounded-full bg-blue-400"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-400">Evening (6PM-12AM)</span>
                <span className="text-white">20%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-full w-[20%] rounded-full bg-emerald-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Target size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              SUCCESS METRICS
            </h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-500/10 p-3">
              <p className="text-xs text-emerald-400">Pass Rate</p>
              <p className="mt-1 text-2xl font-bold text-white">87%</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-3">
              <p className="text-xs text-blue-400">Avg Attempts</p>
              <p className="mt-1 text-2xl font-bold text-white">2.3</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3">
              <p className="text-xs text-amber-400">Improvement Rate</p>
              <p className="mt-1 text-2xl font-bold text-white">+23%</p>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Globe size={18} className="text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              GEOGRAPHIC REACH
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { region: "North India", students: 125, percentage: 37 },
              { region: "South India", students: 98, percentage: 29 },
              { region: "West India", students: 67, percentage: 20 },
              { region: "East India", students: 44, percentage: 14 },
            ].map((region, index) => (
              <div key={index}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-400">{region.region}</span>
                  <span className="text-white">{region.students} ({region.percentage}%)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            RECENT STUDENT ACTIVITY
          </h3>
          <button className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 transition-all hover:bg-emerald-500/20">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
                <th className="pb-3">STUDENT</th>
                <th className="pb-3">BATCH</th>
                <th className="pb-3">ACTION</th>
                <th className="pb-3">TIME</th>
                <th className="pb-3">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {[
                { student: "Rahul Sharma", batch: "CS Batch 2024-A", action: "Completed Interview", time: "2h ago", score: 85 },
                { student: "Priya Patel", batch: "Data Science Cohort", action: "Started Exam", time: "3h ago", score: null },
                { student: "Amit Kumar", batch: "DevOps Engineers", action: "Completed Exam", time: "5h ago", score: 78 },
                { student: "Sneha Reddy", batch: "Mobile Dev Batch", action: "Completed Interview", time: "6h ago", score: 92 },
                { student: "Vikram Singh", batch: "Backend Specialists", action: "Started Interview", time: "8h ago", score: null },
                { student: "Anjali Verma", batch: "Frontend Masters", action: "Completed Exam", time: "10h ago", score: 88 },
              ].map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 text-sm transition-colors hover:bg-white/5"
                >
                  <td className="py-3 font-medium text-white">{activity.student}</td>
                  <td className="py-3 text-gray-400">{activity.batch}</td>
                  <td className="py-3 text-gray-400">{activity.action}</td>
                  <td className="py-3 text-gray-500">{activity.time}</td>
                  <td className="py-3">
                    {activity.score ? (
                      <span className="font-semibold text-emerald-400">{activity.score}%</span>
                    ) : (
                      <span className="text-gray-600">In Progress</span>
                    )}
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
