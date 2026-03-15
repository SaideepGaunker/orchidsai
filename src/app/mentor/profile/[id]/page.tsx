"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Calendar, Award, TrendingUp, Activity, Target, Download } from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  // Mock student data
  const students: Record<string, any> = {
    "1": {
      name: "Anand Sharma",
      email: "anand.sharma@example.com",
      batch: "CS Batch 2024-A",
      joinDate: "Jan 15, 2024",
      avgCI: 98,
      totalSessions: 12,
      status: "active",
      improvement: "+15%",
      lastActive: "2 hours ago"
    },
    "2": {
      name: "Ananya Nate",
      email: "ananya.nate@example.com",
      batch: "Data Science Cohort",
      joinDate: "Feb 10, 2024",
      avgCI: 94,
      totalSessions: 10,
      status: "active",
      improvement: "+12%",
      lastActive: "1 day ago"
    },
    "3": {
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      batch: "DevOps Engineers",
      joinDate: "Mar 5, 2024",
      avgCI: 92,
      totalSessions: 11,
      status: "active",
      improvement: "+18%",
      lastActive: "3 hours ago"
    },
    "4": {
      name: "Prachi Gupta",
      email: "prachi.gupta@example.com",
      batch: "CS Batch 2024-A",
      joinDate: "Jan 20, 2024",
      avgCI: 52,
      totalSessions: 5,
      status: "inactive",
      improvement: "-5%",
      lastActive: "1 week ago"
    },
    "5": {
      name: "Neha Reddy",
      email: "neha.reddy@example.com",
      batch: "Mobile Dev Batch",
      joinDate: "Apr 1, 2024",
      avgCI: 88,
      totalSessions: 9,
      status: "active",
      improvement: "+10%",
      lastActive: "5 hours ago"
    }
  };

  const student = students[studentId as string] || students["1"];

  const ciProgressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 85 },
    { month: "May", score: 92 },
    { month: "Jun", score: 98 },
  ];

  const skillsRadar = [
    { skill: "Technical", score: 95 },
    { skill: "Communication", score: 88 },
    { skill: "Problem Solving", score: 92 },
    { skill: "System Design", score: 85 },
    { skill: "Coding Speed", score: 90 },
  ];

  const skillBreakdown = [
    { skill: "Technical Knowledge", score: 95, color: "emerald" },
    { skill: "Problem Solving", score: 92, color: "blue" },
    { skill: "Communication", score: 88, color: "purple" },
    { skill: "System Design", score: 85, color: "amber" },
    { skill: "Coding Speed", score: 90, color: "teal" },
    { skill: "Debugging", score: 87, color: "cyan" },
  ];

  const weakAreas = [
    { area: "Dynamic Programming", score: 65, color: "red" },
    { area: "Graph Algorithms", score: 68, color: "orange" },
    { area: "System Scalability", score: 72, color: "amber" },
  ];

  const sessionHistory = [
    { date: "Jun 10, 2024 14:30", type: "Interview", topic: "System Design", score: 96, duration: "45 min", status: "completed", feedback: "Excellent" },
    { date: "Jun 8, 2024 10:00", type: "Interview", topic: "Behavioral", score: 94, duration: "40 min", status: "completed", feedback: "Very Good" },
    { date: "Jun 5, 2024 16:15", type: "Exam", topic: "Data Structures", score: 98, duration: "60 min", status: "completed", feedback: "Outstanding" },
    { date: "Jun 3, 2024 11:30", type: "Interview", topic: "Coding", score: 92, duration: "50 min", status: "completed", feedback: "Good" },
    { date: "May 30, 2024 15:00", type: "Exam", topic: "Algorithms", score: 90, duration: "55 min", status: "completed", feedback: "Very Good" },
    { date: "May 28, 2024 09:00", type: "Interview", topic: "Technical", score: 88, duration: "45 min", status: "completed", feedback: "Good" },
    { date: "May 25, 2024 13:00", type: "Exam", topic: "Databases", score: 95, duration: "50 min", status: "completed", feedback: "Excellent" },
  ];

  const recentAchievements = [
    { title: "Top Performer", description: "Ranked #1 in batch for 3 consecutive weeks", icon: "🏆", color: "amber" },
    { title: "Perfect Score", description: "Achieved 100% in Data Structures exam", icon: "⭐", color: "emerald" },
    { title: "Consistency Award", description: "Maintained 90+ CI for 2 months", icon: "🎯", color: "blue" },
  ];

  const upcomingSessions = [
    { date: "Jun 15, 2024", time: "10:00 AM", type: "Interview", topic: "System Design Advanced" },
    { date: "Jun 18, 2024", time: "02:00 PM", type: "Exam", topic: "Full Stack Assessment" },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Student Profile</h1>
            <p className="text-sm text-gray-400">Detailed performance and session history</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10 hover:border-white/20">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
            <Mail size={16} />
            Send Message
          </button>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-3xl font-bold text-white shadow-lg shadow-emerald-500/20">
                {student.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white shadow-lg">
                ✓
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{student.name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} />
                {student.email}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined {student.joinDate}
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-400">{student.batch}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Activity size={12} />
                  Last active {student.lastActive}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 p-4 text-center shadow-lg">
              <p className="text-xs font-semibold text-emerald-400">Avg CI Score</p>
              <p className="mt-1 text-3xl font-bold text-white">{student.avgCI}</p>
              <p className="mt-1 text-xs text-emerald-400">{student.improvement}</p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg ${
                student.status === "active"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {student.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Sessions Completed</p>
          <p className="mt-2 text-2xl font-bold text-white">{student.totalSessions}</p>
          <p className="mt-1 text-xs text-gray-400">100% completion rate</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Avg Score</p>
          <p className="mt-2 text-2xl font-bold text-white">{student.avgCI}%</p>
          <p className="mt-1 text-xs text-gray-400">Above batch average</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Growth Rate</p>
          <p className="mt-2 text-2xl font-bold text-white">{student.improvement}</p>
          <p className="mt-1 text-xs text-gray-400">Last 30 days</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Rank in Batch</p>
          <p className="mt-2 text-2xl font-bold text-white">#1</p>
          <p className="mt-1 text-xs text-gray-400">Top performer</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* CI Progress Over Months */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-5 backdrop-blur-xl shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              CI PROGRESS OVER MONTHS
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
              <span>Confidence Index</span>
            </div>
          </div>
          <div className="relative h-56">
            <svg className="h-full w-full" viewBox="0 0 600 200">
              {/* Grid */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <line
                    x1="0"
                    y1={33 * i + 10}
                    x2="600"
                    y2={33 * i + 10}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  <text
                    x="-5"
                    y={33 * i + 14}
                    className="fill-gray-600 text-xs"
                    textAnchor="end"
                  >
                    {100 - i * 20}
                  </text>
                </g>
              ))}
              
              {/* Line chart with glow effect */}
              <polyline
                points="0,145 100,125 200,105 300,80 400,55 500,25"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                filter="url(#glow)"
              />
              
              {/* Data points with labels */}
              {ciProgressData.map((point, i) => {
                const x = i * 100;
                const y = 190 - (point.score * 1.8);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                    <text
                      x={x}
                      y={y - 12}
                      className="fill-emerald-400 text-xs font-semibold"
                      textAnchor="middle"
                    >
                      {point.score}
                    </text>
                  </g>
                );
              })}
              
              {/* Area fill */}
              <polygon
                points="0,145 100,125 200,105 300,80 400,55 500,25 500,190 0,190"
                fill="url(#ciGradient)"
                opacity="0.3"
              />
              
              <defs>
                <linearGradient id="ciGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            {/* X-axis labels */}
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              {ciProgressData.map((point, i) => (
                <span key={i} className="font-semibold">{point.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-3">
                <Award className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Total Sessions</p>
                <p className="mt-1 text-3xl font-bold text-white">{student.totalSessions}</p>
                <p className="mt-1 text-xs text-gray-400">Completed successfully</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/20 p-3">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Improvement</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{student.improvement}</p>
                <p className="mt-1 text-xs text-gray-400">Last 30 days</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/20 p-3">
                <Activity className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">Avg CI Score</p>
                <p className="mt-1 text-3xl font-bold text-white">{student.avgCI}</p>
                <p className="mt-1 text-xs text-gray-400">Across all sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills Radar Chart */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-5 backdrop-blur-xl shadow-lg">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            SKILLS RADAR
          </h3>
          <div className="flex items-center justify-center py-8">
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* Pentagon grid */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                <polygon
                  key={i}
                  points="150,50 238,112 213,213 87,213 62,112"
                  fill="none"
                  stroke={i === 4 ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.1)"}
                  strokeWidth={i === 4 ? "2" : "1"}
                  transform={`scale(${scale}) translate(${150 * (1 - scale)}, ${150 * (1 - scale)})`}
                />
              ))}
              
              {/* Grid lines */}
              {skillsRadar.map((_, i) => {
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const x = 150 + 100 * Math.cos(angle);
                const y = 150 + 100 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Data polygon with glow */}
              <polygon
                points={skillsRadar
                  .map((skill, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const radius = (skill.score / 100) * 100;
                    const x = 150 + radius * Math.cos(angle);
                    const y = 150 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="rgba(16, 185, 129, 0.3)"
                stroke="#10b981"
                strokeWidth="3"
                filter="url(#radarGlow)"
              />
              
              {/* Data points with scores */}
              {skillsRadar.map((skill, i) => {
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const radius = (skill.score / 100) * 100;
                const x = 150 + radius * Math.cos(angle);
                const y = 150 + radius * Math.sin(angle);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                    <text
                      x={x}
                      y={y - 10}
                      className="fill-emerald-400 text-xs font-bold"
                      textAnchor="middle"
                    >
                      {skill.score}
                    </text>
                  </g>
                );
              })}
              
              {/* Labels */}
              {skillsRadar.map((skill, i) => {
                const angle = (i * 72 - 90) * (Math.PI / 180);
                const x = 150 + 120 * Math.cos(angle);
                const y = 150 + 120 * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="fill-white text-xs font-semibold"
                  >
                    {skill.skill}
                  </text>
                );
              })}
              
              <defs>
                <filter id="radarGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-5 backdrop-blur-xl shadow-lg">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            SKILL BREAKDOWN
          </h3>
          <div className="space-y-4">
            {skillBreakdown.map((skill, i) => (
              <div key={i} className="group transition-all hover:translate-x-1">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-300">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{skill.score}%</span>
                    <span className={`text-xs ${
                      skill.score >= 90 ? "text-emerald-400" :
                      skill.score >= 80 ? "text-blue-400" : "text-amber-400"
                    }`}>
                      {skill.score >= 90 ? "Excellent" : skill.score >= 80 ? "Good" : "Fair"}
                    </span>
                  </div>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-400 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-${skill.color}-500/50`}
                    style={{ width: `${skill.score}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="text-xs font-semibold text-emerald-400">Overall Performance: Excellent</p>
            <p className="mt-1 text-xs text-gray-400">Student is performing above average in all key areas</p>
          </div>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              AREAS NEEDING IMPROVEMENT
            </h3>
            <p className="mt-1 text-xs text-gray-500">Focus areas for skill development</p>
          </div>
          <Target className="text-amber-400" size={20} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {weakAreas.map((area, i) => (
            <div key={i} className="group rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 transition-all hover:border-amber-500/30 hover:bg-white/10">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-sm font-semibold text-white">{area.area}</p>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400">
                  Priority
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-gray-400">Current Score</span>
                <span className={`font-bold text-${area.color}-400`}>{area.score}%</span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-${area.color}-500 to-${area.color}-400 transition-all`}
                  style={{ width: `${area.score}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-500">Target: 85%</span>
                <span className="font-semibold text-emerald-400">+{85 - area.score}% needed</span>
              </div>
              <button className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-semibold text-gray-400 transition-all hover:bg-white/10 hover:text-white">
                View Resources
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Upcoming Sessions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Achievements */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            RECENT ACHIEVEMENTS
          </h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement, i) => (
              <div key={i} className={`rounded-lg border border-${achievement.color}-500/20 bg-${achievement.color}-500/5 p-4 transition-all hover:bg-${achievement.color}-500/10`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className={`text-sm font-semibold text-${achievement.color}-400`}>{achievement.title}</p>
                    <p className="mt-1 text-xs text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            UPCOMING SESSIONS
          </h3>
          <div className="space-y-3">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{session.topic}</p>
                    <p className="mt-1 text-xs text-gray-400">{session.date} at {session.time}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    session.type === "Interview"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-purple-500/10 text-purple-400"
                  }`}>
                    {session.type}
                  </span>
                </div>
              </div>
            ))}
            <button className="w-full rounded-lg border border-emerald-500/20 bg-emerald-500/5 py-3 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/10">
              Schedule New Session
            </button>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            SESSION HISTORY
          </h3>
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-all hover:bg-white/10">
            View All Sessions
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-gray-400">
                <th className="pb-3 font-semibold">DATE & TIME</th>
                <th className="pb-3 font-semibold">TYPE</th>
                <th className="pb-3 font-semibold">TOPIC</th>
                <th className="pb-3 font-semibold">SCORE</th>
                <th className="pb-3 font-semibold">DURATION</th>
                <th className="pb-3 font-semibold">FEEDBACK</th>
                <th className="pb-3 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sessionHistory.map((session, i) => (
                <tr key={i} className="border-b border-white/5 text-sm transition-colors hover:bg-white/5">
                  <td className="py-3 text-gray-300">{session.date}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        session.type === "Interview"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {session.type}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{session.topic}</td>
                  <td className="py-3">
                    <span className={`font-semibold ${
                      session.score >= 90 ? "text-emerald-400" : 
                      session.score >= 70 ? "text-blue-400" : "text-amber-400"
                    }`}>
                      {session.score}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">{session.duration}</td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold ${
                      session.feedback === "Outstanding" || session.feedback === "Excellent" ? "text-emerald-400" :
                      session.feedback === "Very Good" ? "text-blue-400" : "text-gray-400"
                    }`}>
                      {session.feedback}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentor Notes */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              MENTOR NOTES & FEEDBACK
            </h3>
            <p className="mt-1 text-xs text-gray-500">Private notes visible only to mentors</p>
          </div>
          <button className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20">
            Add Note
          </button>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">Mentor: Sarah Johnson</span>
              <span className="text-xs text-gray-500">Jun 10, 2024</span>
            </div>
            <p className="text-sm text-gray-300">
              Excellent progress in system design. Student shows strong understanding of scalability concepts. 
              Recommend focusing on distributed systems next.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">Mentor: David Chen</span>
              <span className="text-xs text-gray-500">Jun 5, 2024</span>
            </div>
            <p className="text-sm text-gray-300">
              Great communication skills during mock interviews. Needs more practice with dynamic programming problems.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <textarea
            placeholder="Add a new note or feedback..."
            className="w-full resize-none bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            rows={3}
          />
          <div className="mt-3 flex justify-end gap-2">
            <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-400 transition-all hover:bg-white/10">
              Cancel
            </button>
            <button className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
