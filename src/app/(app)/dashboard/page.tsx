"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mic2,
  BookOpen,
  TrendingUp,
  Clock,
  Target,
  Award,
  ArrowRight,
  Play,
  ChevronRight,
  Flame,
  BarChart2,
  Video,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

const ciData = [
  { day: "Mon", ci: 52 },
  { day: "Tue", ci: 58 },
  { day: "Wed", ci: 55 },
  { day: "Thu", ci: 63 },
  { day: "Fri", ci: 70 },
  { day: "Sat", ci: 68 },
  { day: "Sun", ci: 74 },
];

const radarData = [
  { skill: "Content", score: 72 },
  { skill: "Voice", score: 65 },
  { skill: "Visual", score: 58 },
  { skill: "Consistency", score: 70 },
  { skill: "Fluency", score: 62 },
];

const sessions = [
  { role: "Technical Interview", domain: "Software Engineering", date: "Today, 2:30 PM", ci: 74, status: "Completed", duration: "22 min" },
  { role: "HR Interview", domain: "General", date: "Yesterday", ci: 68, status: "Completed", duration: "18 min" },
  { role: "Case Interview", domain: "Product Management", date: "Feb 25", ci: 61, status: "Completed", duration: "25 min" },
  { role: "Technical Interview", domain: "Data Science", date: "Feb 23", ci: 55, status: "Completed", duration: "30 min" },
];

const stats = [
  { label: "Confidence Index", value: "74", unit: "/100", icon: Target, color: "amber", trend: "+6 this week" },
  { label: "Sessions Completed", value: "12", unit: "", icon: Video, color: "teal", trend: "3 this week" },
  { label: "Avg. Duration", value: "22", unit: "min", icon: Clock, color: "amber", trend: "Per session" },
  { label: "Streak", value: "5", unit: "days", icon: Flame, color: "teal", trend: "Keep it up!" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 text-xs">
        <p className="text-white/50">{label}</p>
        <p className="text-amber-400 font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-white/5" />
            <Skeleton className="h-4 w-64 bg-white/5" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl bg-white/5" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <Skeleton className="lg:col-span-2 h-[300px] rounded-2xl bg-white/5" />
          <Skeleton className="h-[300px] rounded-2xl bg-white/5" />
        </div>
        <Skeleton className="h-48 rounded-2xl bg-white/5" />
      </div>
    );
  }

  const ciScore = 74;
  const ciPercent = ciScore;

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-white/40 text-sm mb-1">Good afternoon,</p>
          <h1 className="text-2xl font-bold text-white">Arjun Kumar 👋</h1>
          <p className="text-sm text-white/30 mt-1">You&apos;ve completed 12 sessions. Keep pushing!</p>
        </div>
        <div className="flex gap-3">
          <Link href="/exam"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white glass-card glass-card-hover transition-all">
            <BookOpen size={15} /> Practice Exam
          </Link>
          <Link href="/interview"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.3)" }}>
            <Play size={15} /> Start Interview
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, unit, icon: Icon, color, trend }) => (
          <div key={label} className="glass-card glass-card-hover rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={color === "amber"
                  ? { background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.2)" }
                  : { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.2)" }}>
                <Icon size={16} className={color === "amber" ? "text-amber-400" : "text-teal-400"} />
              </div>
              <TrendingUp size={13} className="text-white/20" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${color === "amber" ? "text-gradient-amber" : "text-gradient-teal"}`}>{value}</span>
              <span className="text-xs text-white/30">{unit}</span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">{label}</p>
            <p className="text-xs text-white/25 mt-0.5">{trend}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* CI trend */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Confidence Index Trend</h3>
              <p className="text-xs text-white/30">Last 7 days</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-400"
              style={{ background: "rgba(251,146,60,0.1)" }}>
              <TrendingUp size={11} /> +22 pts
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ciData}>
              <defs>
                <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 80]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ci" stroke="#fb923c" strokeWidth={2} fill="url(#ciGrad)" dot={{ fill: "#fb923c", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Radar */}
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-white">Skill Breakdown</h3>
            <p className="text-xs text-white/30">Performance radar</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
              <Radar dataKey="score" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CI Score Card + Recent Sessions */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* CI Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
          <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-widest">Confidence Index</p>
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ciCircle)" strokeWidth="10"
                strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - ciPercent / 100)}`} />
              <defs>
                <linearGradient id="ciCircle" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{ciScore}</span>
              <span className="text-xs text-white/40">/ 100</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-amber-400 mb-1">Good Performance</p>
          <p className="text-xs text-white/30 leading-relaxed">
            Content 72% · Voice 65%<br />Visual 58% · Consistency 70%
          </p>
          <Link href="/reports"
            className="mt-4 flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors">
            View full report <ChevronRight size={12} />
          </Link>
        </div>

        {/* Recent Sessions */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Sessions</h3>
            <Link href="/reports" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl glass-card-hover transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.15)" }}>
                  <Mic2 size={16} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{s.role}</p>
                  <p className="text-xs text-white/35 truncate">{s.domain} · {s.duration}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1.5 justify-end">
                    <BarChart2 size={12} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">{s.ci}</span>
                  </div>
                  <p className="text-xs text-white/30">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-4 glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Award size={15} className="text-amber-400" /> AI Recommendations
            </h3>
            <p className="text-xs text-white/30">Based on your last 4 sessions</p>
          </div>
          <Link href="/recommendations" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { title: "Reduce Filler Words", desc: "You used 'um' and 'uh' 14 times in your last session. Practice structured pauses.", tag: "Voice", href: "/interview" },
            { title: "Improve Eye Contact", desc: "Eye contact was at 58%. Look directly at the camera when answering questions.", tag: "Visual", href: "/interview/session" },
            { title: "Use STAR Structure", desc: "Your content score improves 18% when you follow the Situation-Task-Action-Result format.", tag: "Content", href: "/interview" },
          ].map((r) => (
            <div key={r.title} className="rounded-xl p-4 flex flex-col gap-2"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold w-fit text-amber-400"
                style={{ background: "rgba(251,146,60,0.1)" }}>
                {r.tag}
              </div>
              <p className="text-sm font-medium text-white">{r.title}</p>
              <p className="text-xs text-white/35 leading-relaxed flex-1">{r.desc}</p>
              <div className="flex items-center gap-2 pt-1">
                <Link href={r.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", color: "#000" }}>
                  Practice Now
                </Link>
                <Link href="/recommendations"
                  className="flex items-center gap-1 text-xs text-white/35 hover:text-white/60 transition-colors">
                  Details <ChevronRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
