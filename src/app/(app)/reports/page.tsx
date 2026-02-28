"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Mic2,
  Eye,
  FileText,
  BarChart2,
  Calendar,
  ChevronRight,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Cell,
} from "recharts";

const sessions = [
  { id: "S-012", date: "Feb 28, 2026", role: "Technical Interview", domain: "Software Engineering", ci: 74, content: 72, voice: 65, visual: 58, duration: "22 min" },
  { id: "S-011", date: "Feb 26, 2026", role: "HR Interview", domain: "General", ci: 68, content: 64, voice: 71, visual: 62, duration: "18 min" },
  { id: "S-010", date: "Feb 25, 2026", role: "Case Interview", domain: "Product Management", ci: 61, content: 58, voice: 60, visual: 55, duration: "25 min" },
  { id: "S-009", date: "Feb 23, 2026", role: "Technical Interview", domain: "Data Science", ci: 55, content: 52, voice: 54, visual: 48, duration: "30 min" },
];

const ciTrend = [
  { week: "W1", ci: 48 },
  { week: "W2", ci: 53 },
  { week: "W3", ci: 55 },
  { week: "W4", ci: 61 },
  { week: "W5", ci: 68 },
  { week: "W6", ci: 74 },
];

const scoreBreakdown = [
  { session: "S-009", content: 52, voice: 54, visual: 48 },
  { session: "S-010", content: 58, voice: 60, visual: 55 },
  { session: "S-011", content: 64, voice: 71, visual: 62 },
  { session: "S-012", content: 72, voice: 65, visual: 58 },
];

const radarSkills = [
  { skill: "Technical Accuracy", score: 72 },
  { skill: "Communication", score: 65 },
  { skill: "Body Language", score: 58 },
  { skill: "Confidence", score: 70 },
  { skill: "Structure", score: 68 },
  { skill: "Fluency", score: 62 },
];

const voiceMetrics = [
  { label: "Words Per Minute", value: "118 WPM", status: "good", note: "Ideal range: 100–130 WPM" },
  { label: "Filler Words", value: "14 uses", status: "warn", note: "'um', 'uh', 'like' detected" },
  { label: "Silence Duration", value: "8.2 sec", status: "good", note: "Avg. pause per question" },
  { label: "Loudness Variance", value: "±12 dB", status: "good", note: "Well-modulated voice" },
  { label: "Sentiment Score", value: "Positive", status: "good", note: "Confident tone detected" },
];

const visualMetrics = [
  { label: "Eye Contact", value: "58%", status: "warn", note: "Target: >70%" },
  { label: "Dominant Emotion", value: "Neutral", status: "good", note: "Calm demeanor" },
  { label: "Posture Score", value: "76%", status: "good", note: "Upright and stable" },
  { label: "Stress Indicator", value: "Low", status: "good", note: "Minimal stress signals" },
  { label: "Engagement Level", value: "68%", status: "warn", note: "Improve active engagement" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-xs space-y-1">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const [selectedSession, setSelectedSession] = useState("S-012");
  const [activeTab, setActiveTab] = useState("overview");

  const session = sessions.find((s) => s.id === selectedSession) || sessions[0];

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Performance Reports</h1>
          <p className="text-sm text-white/40">Detailed multimodal analysis of your interview sessions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 glass-card glass-card-hover transition-all">
          <Download size={15} /> Download PDF
        </button>
      </div>

      {/* Session Selector */}
      <div className="glass-card rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {sessions.map((s) => (
            <button key={s.id} onClick={() => setSelectedSession(s.id)}
              className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={selectedSession === s.id ? {
                background: "linear-gradient(135deg,rgba(251,146,60,0.12),rgba(245,158,11,0.06))",
                border: "1px solid rgba(251,146,60,0.25)",
              } : {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
              <div>
                <p className={`text-xs font-semibold ${selectedSession === s.id ? "text-white" : "text-white/50"}`}>{s.role}</p>
                <p className="text-xs text-white/25">{s.date}</p>
              </div>
              <div className="ml-2 text-right">
                <p className={`text-sm font-black ${selectedSession === s.id ? "text-amber-400" : "text-white/30"}`}>{s.ci}</p>
                <p className="text-xs text-white/20">CI</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 glass-card rounded-xl p-1 w-fit">
        {[
          { id: "overview", label: "Overview" },
          { id: "voice", label: "Voice Analysis" },
          { id: "visual", label: "Visual Analysis" },
          { id: "progress", label: "Progress" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={activeTab === id ? {
              background: "linear-gradient(135deg,#fb923c,#f59e0b)",
              color: "#000",
            } : { color: "rgba(255,255,255,0.4)" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* CI + Score breakdown */}
          <div className="grid lg:grid-cols-3 gap-5">
            {/* CI Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
              <p className="text-xs text-white/40 mb-4 uppercase tracking-widest font-medium">Confidence Index</p>
              <div className="relative w-28 h-28 mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ciG2)" strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - session.ci / 100)}`} />
                  <defs>
                    <linearGradient id="ciG2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{session.ci}</span>
                  <span className="text-xs text-white/40">/ 100</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                {[
                  { label: "Content (35%)", value: session.content },
                  { label: "Voice (25%)", value: session.voice },
                  { label: "Visual (25%)", value: session.visual },
                  { label: "Consistency (15%)", value: Math.round((session.content + session.voice) / 2) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-white/35">{label}</span>
                    <span className="text-white/70 font-medium">{value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-1">Skill Radar</h3>
              <p className="text-xs text-white/30 mb-3">Multimodal skill breakdown</p>
              <ResponsiveContainer width="100%" height={190}>
                <RadarChart data={radarSkills}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} />
                  <Radar dataKey="score" stroke="#fb923c" fill="#fb923c" fillOpacity={0.15} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Session info */}
            <div className="glass-card rounded-2xl p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-white mb-4">Session Details</h3>
              <div className="space-y-3 flex-1">
                {[
                  { icon: BarChart2, label: "Session ID", value: session.id },
                  { icon: Calendar, label: "Date", value: session.date },
                  { icon: Mic2, label: "Interview Type", value: session.role },
                  { icon: Activity, label: "Domain", value: session.domain },
                  { icon: FileText, label: "Duration", value: session.duration },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-white/4">
                    <Icon size={14} className="text-white/25 flex-shrink-0" />
                    <div className="flex justify-between flex-1">
                      <span className="text-xs text-white/35">{label}</span>
                      <span className="text-xs font-medium text-white/70">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/interview"
                className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
                Start New Session <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Score breakdown bar chart */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Score Breakdown Across Sessions</h3>
            <p className="text-xs text-white/30 mb-4">Content vs Voice vs Visual performance</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={scoreBreakdown} barGap={4}>
                <XAxis dataKey="session" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="content" name="Content" fill="#fb923c" radius={[4, 4, 0, 0]}>
                  {scoreBreakdown.map((_, i) => <Cell key={i} fill="#fb923c" fillOpacity={0.8} />)}
                </Bar>
                <Bar dataKey="voice" name="Voice" fill="#14b8a6" radius={[4, 4, 0, 0]}>
                  {scoreBreakdown.map((_, i) => <Cell key={i} fill="#14b8a6" fillOpacity={0.8} />)}
                </Bar>
                <Bar dataKey="visual" name="Visual" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                  {scoreBreakdown.map((_, i) => <Cell key={i} fill="#8b5cf6" fillOpacity={0.8} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Voice Tab */}
      {activeTab === "voice" && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voiceMetrics.map(({ label, value, status, note }) => (
              <div key={label} className="glass-card rounded-2xl p-5"
                style={status === "warn" ? { border: "1px solid rgba(251,146,60,0.2)" } : {}}>
                <div className="flex items-start justify-between mb-3">
                  <Mic2 size={16} className="text-white/25" />
                  {status === "good"
                    ? <TrendingUp size={14} className="text-teal-400" />
                    : <TrendingDown size={14} className="text-amber-400" />}
                </div>
                <p className="text-xl font-black text-white mb-0.5">{value}</p>
                <p className="text-xs font-medium text-white/50 mb-1">{label}</p>
                <p className="text-xs text-white/25">{note}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Filler Word Breakdown</h3>
            <div className="space-y-3">
              {[{ word: '"um"', count: 7 }, { word: '"uh"', count: 5 }, { word: '"like"', count: 2 }].map(({ word, count }) => (
                <div key={word} className="flex items-center gap-3">
                  <span className="text-xs text-amber-400 font-mono w-12">{word}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full progress-amber" style={{ width: `${(count / 14) * 100}%` }} />
                  </div>
                  <span className="text-xs text-white/35 w-8 text-right">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visual Tab */}
      {activeTab === "visual" && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visualMetrics.map(({ label, value, status, note }) => (
              <div key={label} className="glass-card rounded-2xl p-5"
                style={status === "warn" ? { border: "1px solid rgba(251,146,60,0.2)" } : {}}>
                <div className="flex items-start justify-between mb-3">
                  <Eye size={16} className="text-white/25" />
                  {status === "good"
                    ? <TrendingUp size={14} className="text-teal-400" />
                    : <TrendingDown size={14} className="text-amber-400" />}
                </div>
                <p className="text-xl font-black text-white mb-0.5">{value}</p>
                <p className="text-xs font-medium text-white/50 mb-1">{label}</p>
                <p className="text-xs text-white/25">{note}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Emotion Timeline</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {["Neutral", "Confident", "Neutral", "Thoughtful", "Neutral", "Confident", "Neutral", "Attentive"].map((e, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: e === "Confident" ? "rgba(20,184,166,0.12)" : e === "Thoughtful" ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.06)",
                    color: e === "Confident" ? "#2dd4bf" : e === "Thoughtful" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  }}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <div className="space-y-5">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Confidence Index Growth</h3>
            <p className="text-xs text-white/30 mb-4">6-week trajectory — +26 points improvement</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ciTrend}>
                <defs>
                  <linearGradient id="ciProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ci" stroke="#fb923c" strokeWidth={2.5} fill="url(#ciProg)" dot={{ fill: "#fb923c", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Sessions Completed", value: "12", icon: Mic2, trend: "+3 this week" },
              { label: "Average CI", value: "64.5", icon: BarChart2, trend: "Improving weekly" },
              { label: "Best CI Score", value: "74", icon: TrendingUp, trend: "Latest session" },
            ].map(({ label, value, icon: Icon, trend }) => (
              <div key={label} className="glass-card rounded-2xl p-5">
                <Icon size={18} className="text-amber-400 mb-3" />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-white/45 mt-0.5">{label}</p>
                <p className="text-xs text-teal-400 mt-1">{trend}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
