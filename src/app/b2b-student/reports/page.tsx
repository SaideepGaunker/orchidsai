"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Target, Award, Download } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const ciHistory = [
  { month: "Jan", ci: 52 }, { month: "Feb", ci: 58 }, { month: "Mar", ci: 61 },
  { month: "Apr", ci: 67 }, { month: "May", ci: 74 }, { month: "Jun", ci: 80 },
];

const componentBreakdown = [
  { name: "Content", score: 82, weight: "35%" },
  { name: "Voice", score: 76, weight: "25%" },
  { name: "Visual", score: 78, weight: "25%" },
  { name: "Consistency", score: 84, weight: "15%" },
];

const radarData = [
  { skill: "Technical", score: 78 }, { skill: "Communication", score: 65 },
  { skill: "Problem Solving", score: 72 }, { skill: "Consistency", score: 84 },
  { skill: "Fluency", score: 60 }, { skill: "Confidence", score: 80 },
];

const sessionScores = [
  { session: "S1", score: 55 }, { session: "S2", score: 62 }, { session: "S3", score: 60 },
  { session: "S4", score: 70 }, { session: "S5", score: 74 }, { session: "S6", score: 80 },
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

export default function B2BReportsPage() {
  const [tab, setTab] = useState<"overview" | "sessions">("overview");

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Reports</h1>
          <p className="text-sm text-white/40 mt-1">Detailed performance analytics assigned by your mentor</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Download size={15} /> Export PDF
        </button>
      </div>

      {/* CI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Current CI", value: "80", sub: "+28 from start", icon: Target, color: "emerald" },
          { label: "Best Session", value: "84", sub: "Jun 10, 2024", icon: Award, color: "teal" },
          { label: "Sessions Done", value: "12", sub: "This semester", icon: BarChart3, color: "emerald" },
          { label: "Improvement", value: "+28", sub: "Since Jan 2024", icon: TrendingUp, color: "teal" },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={color === "emerald"
                ? { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }
                : { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.2)" }}>
              <Icon size={16} className={color === "emerald" ? "text-emerald-400" : "text-teal-400"} />
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-white/50 mt-0.5">{label}</p>
            <p className="text-xs text-white/25 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "sessions"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
            style={tab === t
              ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }
              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* CI Trend */}
            <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-semibold text-white mb-1">CI Progress Over Time</h3>
              <p className="text-xs text-white/30 mb-4">Monthly confidence index</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={ciHistory}>
                  <defs>
                    <linearGradient id="repCiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="ci" stroke="#10b981" strokeWidth={2} fill="url(#repCiGrad)" dot={{ fill: "#10b981", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Radar */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-semibold text-white mb-1">Skill Radar</h3>
              <p className="text-xs text-white/30 mb-3">Competency breakdown</p>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
                  <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CI Component Breakdown */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold text-white mb-4">CI Component Breakdown</h3>
            <div className="space-y-4">
              {componentBreakdown.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/70">{c.name}</span>
                      <span className="text-xs text-white/30">({c.weight})</span>
                    </div>
                    <span className="text-sm font-bold text-white">{c.score}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: "linear-gradient(90deg,#10b981,#059669)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "sessions" && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-sm font-semibold text-white mb-1">Session-by-Session Scores</h3>
          <p className="text-xs text-white/30 mb-4">CI score per completed session</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sessionScores} barSize={28}>
              <XAxis dataKey="session" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
