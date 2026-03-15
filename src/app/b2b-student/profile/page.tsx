"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  User, Mail, BookOpen, Calendar, Edit2, TrendingUp, Target,
  Mic2, Award, Clock, Activity, CheckCircle2, AlertCircle,
  BarChart3, MessageCircle, GraduationCap, Building2,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip,
} from "recharts";

const radarData = [
  { skill: "Technical", score: 78 },
  { skill: "Communication", score: 65 },
  { skill: "Problem Solving", score: 72 },
  { skill: "Consistency", score: 84 },
  { skill: "Fluency", score: 60 },
  { skill: "Confidence", score: 80 },
];

const ciTrend = [
  { month: "Jan", ci: 52 }, { month: "Feb", ci: 58 }, { month: "Mar", ci: 61 },
  { month: "Apr", ci: 67 }, { month: "May", ci: 74 }, { month: "Jun", ci: 80 },
];

const achievements = [
  { label: "First Interview", icon: "🎯", date: "Jan 15, 2024", desc: "Completed your first mock interview" },
  { label: "CI Above 70", icon: "🚀", date: "Apr 22, 2024", desc: "Confidence Index crossed 70 points" },
  { label: "5 Sessions Done", icon: "⭐", date: "Mar 10, 2024", desc: "Completed 5 mentor-assigned sessions" },
  { label: "Top 10 in Batch", icon: "🏆", date: "Jun 1, 2024", desc: "Ranked #9 out of 42 students" },
  { label: "Perfect Consistency", icon: "🎖️", date: "May 18, 2024", desc: "Scored 90+ on consistency metric" },
  { label: "SQL Master", icon: "💾", date: "May 22, 2024", desc: "Scored 90% on DBMS assessment" },
];

const ciComponents = [
  { label: "Content Quality", score: 82, weight: "35%", color: "#10b981" },
  { label: "Voice & Tone", score: 76, weight: "25%", color: "#14b8a6" },
  { label: "Visual Presence", score: 78, weight: "25%", color: "#10b981" },
  { label: "Consistency", score: 84, weight: "15%", color: "#14b8a6" },
];

const recentSessions = [
  { title: "System Design Mock", type: "Interview", date: "Jun 12, 2024", ci: 80, status: "completed" },
  { title: "OS Concepts Exam", type: "Exam", date: "Jun 10, 2024", ci: 83, status: "completed" },
  { title: "Behavioral Round", type: "Interview", date: "Jun 5, 2024", ci: 74, status: "completed" },
  { title: "Networking Basics", type: "Exam", date: "Jun 1, 2024", ci: 70, status: "completed" },
];

const weakAreas = [
  { area: "Verbal Fluency", note: "Pace and filler words need improvement", severity: "high" },
  { area: "System Design Depth", note: "Scalability concepts need more practice", severity: "medium" },
  { area: "Communication Structure", note: "Use STAR method more consistently", severity: "medium" },
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

export default function B2BProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-sm text-white/40 mt-1">Academic profile, performance analytics and session history</p>
        </div>
        <button type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Edit2 size={14} /> Edit Profile
        </button>
      </div>

      {/* Row 1: Profile card + CI Trend + Radar */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-1 rounded-2xl p-6 flex flex-col items-center text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.18)" }}>
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl font-black text-white">
              {user?.name?.slice(0, 2).toUpperCase() ?? "BS"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center"
              style={{ boxShadow: "0 0 8px rgba(16,185,129,0.8)" }}>
              <CheckCircle2 size={13} className="text-white" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-white">{user?.name ?? "B2B Student"}</h2>
          <p className="text-sm text-emerald-400 mt-0.5 mb-4">Enrolled Student</p>

          <div className="w-full space-y-2.5 text-left">
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <Mail size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="truncate text-xs">{user?.email ?? "student@example.com"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <GraduationCap size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs">CS Batch 2024-A</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <Building2 size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs">IIT Delhi</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <User size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs">Prof. Rajesh Kumar</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <Calendar size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs">Enrolled Jan 2024</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <MessageCircle size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs">b2bstudent@gmail.com</span>
            </div>
          </div>

          <div className="w-full mt-5 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
            {[{ v: "80", l: "CI Score" }, { v: "12", l: "Sessions" }, { v: "#9", l: "Rank" }].map(({ v, l }) => (
              <div key={l}>
                <p className="text-xl font-black text-white">{v}</p>
                <p className="text-xs text-white/30">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CI Trend */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-semibold text-white">Confidence Index Trend</h3>
              <p className="text-xs text-white/30">6-month progress</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400"
              style={{ background: "rgba(16,185,129,0.1)" }}>
              <TrendingUp size={11} /> +28 pts
            </div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={ciTrend}>
              <defs>
                <linearGradient id="profCiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ci" stroke="#10b981" strokeWidth={2} fill="url(#profCiGrad)" dot={{ fill: "#10b981", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>

          {/* CI Component mini bars */}
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {ciComponents.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/40">{c.label} <span className="text-white/20">({c.weight})</span></span>
                  <span className="text-xs font-bold text-white">{c.score}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: `linear-gradient(90deg,${c.color},${c.color}99)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Radar */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-sm font-semibold text-white mb-1">Skill Radar</h3>
          <p className="text-xs text-white/30 mb-2">Competency overview</p>
          <ResponsiveContainer width="100%" height={190}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
              <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {radarData.map((r) => (
              <div key={r.skill} className="flex items-center justify-between px-2 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xs text-white/40">{r.skill}</span>
                <span className="text-xs font-bold text-emerald-400">{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: "12", sub: "6 interviews · 6 exams", icon: Activity, color: "emerald" },
          { label: "Avg CI Score", value: "71", sub: "Across all sessions", icon: Target, color: "teal" },
          { label: "Tasks Completed", value: "7 / 10", sub: "3 pending", icon: CheckCircle2, color: "emerald" },
          { label: "Avg Duration", value: "28 min", sub: "Per session", icon: Clock, color: "teal" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={color === "emerald"
                ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }
                : { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.2)" }}>
              <Icon size={15} className={color === "emerald" ? "text-emerald-400" : "text-teal-400"} />
            </div>
            <p className="text-lg font-black text-white">{value}</p>
            <p className="text-xs text-white/50 mt-0.5">{label}</p>
            <p className="text-xs text-white/25 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Row 3: Recent Sessions + Weak Areas */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Sessions */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={15} className="text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Recent Sessions</h3>
          </div>
          <div className="space-y-3">
            {recentSessions.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={s.type === "Interview"
                    ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }
                    : { background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.15)" }}>
                  {s.type === "Interview"
                    ? <Mic2 size={15} className="text-emerald-400" />
                    : <BookOpen size={15} className="text-teal-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{s.title}</p>
                  <p className="text-xs text-white/30">{s.type} · {s.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">{s.ci}</p>
                  <p className="text-xs text-white/30">CI</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas + Achievements */}
        <div className="space-y-4">
          {/* Weak Areas */}
          <div className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={15} className="text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {weakAreas.map((w, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: w.severity === "high" ? "#ef4444" : "#fb923c", boxShadow: `0 0 6px ${w.severity === "high" ? "#ef4444" : "#fb923c"}` }} />
                  <div>
                    <p className="text-sm font-medium text-white">{w.area}</p>
                    <p className="text-xs text-white/35 mt-0.5">{w.note}</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={w.severity === "high"
                      ? { background: "rgba(239,68,68,0.1)", color: "#ef4444" }
                      : { background: "rgba(251,146,60,0.1)", color: "#fb923c" }}>
                    {w.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Achievements full grid */}
      <div className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Award size={15} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Achievements</h3>
          <span className="ml-auto text-xs text-white/30">{achievements.length} earned</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div key={a.label} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}>
              <span className="text-2xl flex-shrink-0">{a.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{a.label}</p>
                <p className="text-xs text-white/35 truncate">{a.desc}</p>
                <p className="text-xs text-white/20 mt-0.5">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
