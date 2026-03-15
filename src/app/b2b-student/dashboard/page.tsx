"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  ClipboardList, Mic2, BookOpen, TrendingUp,
  ChevronRight, Target, Activity, CheckCircle2, Clock, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const ciTrend = [
  { week: "W1", ci: 55 }, { week: "W2", ci: 62 }, { week: "W3", ci: 60 },
  { week: "W4", ci: 70 }, { week: "W5", ci: 74 }, { week: "W6", ci: 80 },
];

const radarData = [
  { skill: "Technical", score: 78 }, { skill: "Communication", score: 65 },
  { skill: "Problem Solving", score: 72 }, { skill: "Consistency", score: 68 },
  { skill: "Fluency", score: 60 },
];

const assignedTasks = [
  { id: 1, title: "System Design Interview", type: "Interview", due: "Jun 18, 2024", status: "pending" },
  { id: 2, title: "Data Structures Exam", type: "Exam", due: "Jun 20, 2024", status: "pending" },
  { id: 3, title: "Behavioral Round", type: "Interview", due: "Jun 15, 2024", status: "completed" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs" style={{ background: "rgba(5,15,25,0.95)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <p className="text-white/50">{label}</p>
        <p className="text-emerald-400 font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function B2BStudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/40 text-sm mb-1">Good morning,</p>
          <h1 className="text-2xl font-bold text-white">{user?.name ?? "Student"} 👋</h1>
          <p className="text-sm text-white/30 mt-1">Here's your learning progress and upcoming tasks.</p>
        </div>
      </div>

      {/* Mentor Info Banner */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,150,105,0.05))", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg font-bold text-white">
            R
          </div>
          <div>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Your Mentor</p>
            <p className="text-white font-bold">Prof. Rajesh Kumar</p>
            <p className="text-xs text-white/40">CS Batch 2024-A · IIT Delhi</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-white">9</p>
            <p className="text-xs text-white/40">Batch Rank</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-xl font-bold text-emerald-400">80</p>
            <p className="text-xs text-white/40">Current CI</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-xl font-bold text-white">3</p>
            <p className="text-xs text-white/40">Pending Tasks</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Confidence Index", value: "80", unit: "/100", icon: Target, color: "emerald", trend: "+10 this month" },
          { label: "Tasks Completed", value: "7", unit: "", icon: CheckCircle2, color: "teal", trend: "3 pending" },
          { label: "Sessions Done", value: "12", unit: "", icon: Activity, color: "emerald", trend: "This semester" },
          { label: "Avg Duration", value: "28", unit: "min", icon: Clock, color: "teal", trend: "Per session" },
        ].map(({ label, value, unit, icon: Icon, color, trend }) => (
          <div
            key={label}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={color === "emerald"
                  ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }
                  : { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.2)" }}
              >
                <Icon size={16} className={color === "emerald" ? "text-emerald-400" : "text-teal-400"} />
              </div>
              <TrendingUp size={13} className="text-white/20" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">{value}</span>
              <span className="text-xs text-white/30">{unit}</span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">{label}</p>
            <p className="text-xs text-white/25 mt-0.5">{trend}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* CI Trend */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Confidence Index Trend</h3>
              <p className="text-xs text-white/30">Last 6 weeks</p>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400"
              style={{ background: "rgba(16,185,129,0.1)" }}
            >
              <TrendingUp size={11} /> +25 pts
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ciTrend}>
              <defs>
                <linearGradient id="b2bCiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ci" stroke="#10b981" strokeWidth={2} fill="url(#b2bCiGrad)" dot={{ fill: "#10b981", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Radar */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="text-sm font-semibold text-white mb-1">Skill Breakdown</h3>
          <p className="text-xs text-white/30 mb-3">Performance radar</p>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
              <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assigned Tasks + CI Card */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* CI Score Card */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-widest">Confidence Index</p>
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#b2bCircle)" strokeWidth="10"
                strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - 80 / 100)}`} />
              <defs>
                <linearGradient id="b2bCircle" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">80</span>
              <span className="text-xs text-white/40">/ 100</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-emerald-400 mb-1">Good Performance</p>
          <p className="text-xs text-white/30">Rank #9 in your batch</p>
          <button
            type="button"
            onClick={() => router.push("/b2b-student/reports")}
            className="mt-4 flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View full report <ChevronRight size={12} />
          </button>
        </div>

        {/* Assigned Tasks */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Assigned Tasks</h3>
            <button
              type="button"
              onClick={() => router.push("/b2b-student/tasks")}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View all <ArrowRight size={11} />
            </button>
          </div>
          <div className="space-y-3">
            {assignedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={task.type === "Interview"
                    ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }
                    : { background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.15)" }}
                >
                  {task.type === "Interview" ? <Mic2 size={16} className="text-emerald-400" /> : <BookOpen size={16} className="text-teal-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{task.title}</p>
                  <p className="text-xs text-white/35">Due: {task.due}</p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                  style={task.status === "completed"
                    ? { background: "rgba(16,185,129,0.1)", color: "#10b981" }
                    : { background: "rgba(251,146,60,0.1)", color: "#fb923c" }}
                >
                  {task.status === "completed" ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
