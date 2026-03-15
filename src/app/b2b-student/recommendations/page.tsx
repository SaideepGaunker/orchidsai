"use client";

import { Lightbulb, BookOpen, Mic2, TrendingUp, CheckCircle2, Clock } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Improve Communication Clarity",
    desc: "Your verbal fluency score is 60/100. Practice structuring answers using the STAR method — Situation, Task, Action, Result.",
    type: "Communication",
    priority: "High",
    icon: Mic2,
    color: "emerald",
    from: "Prof. Rajesh Kumar",
    date: "Jun 14, 2024",
    status: "active",
    resources: ["STAR Method Guide", "Mock Interview Practice"],
  },
  {
    id: 2,
    title: "Strengthen System Design Fundamentals",
    desc: "You have a System Design interview assigned. Review scalability concepts, load balancing, and database sharding before the session.",
    type: "Technical",
    priority: "High",
    icon: BookOpen,
    color: "teal",
    from: "Prof. Rajesh Kumar",
    date: "Jun 12, 2024",
    status: "active",
    resources: ["System Design Primer", "Grokking the System Design Interview"],
  },
  {
    id: 3,
    title: "Work on Consistency Score",
    desc: "Your consistency across sessions varies. Try to maintain a steady pace and avoid rushing through answers in the final minutes.",
    type: "Behavioral",
    priority: "Medium",
    icon: TrendingUp,
    color: "emerald",
    from: "Prof. Rajesh Kumar",
    date: "Jun 8, 2024",
    status: "active",
    resources: ["Time Management Tips"],
  },
  {
    id: 4,
    title: "Review SQL Normalization",
    desc: "Your DBMS exam showed gaps in 3NF and BCNF normalization. Revisit these concepts before the next assessment.",
    type: "Technical",
    priority: "Medium",
    icon: BookOpen,
    color: "teal",
    from: "Prof. Rajesh Kumar",
    date: "May 25, 2024",
    status: "completed",
    resources: ["Database Normalization Guide"],
  },
];

const priorityStyle: Record<string, { bg: string; text: string }> = {
  High: { bg: "rgba(239,68,68,0.1)", text: "#ef4444" },
  Medium: { bg: "rgba(251,146,60,0.1)", text: "#fb923c" },
  Low: { bg: "rgba(16,185,129,0.1)", text: "#10b981" },
};

export default function B2BRecommendationsPage() {
  const active = recommendations.filter((r) => r.status === "active");
  const completed = recommendations.filter((r) => r.status === "completed");

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Recommendations</h1>
        <p className="text-sm text-white/40 mt-1">Personalized guidance from your mentor</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", value: active.length, color: "emerald" },
          { label: "Completed", value: completed.length, color: "teal" },
          { label: "Total", value: recommendations.length, color: "emerald" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-4 text-center"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Active */}
      <div>
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Active Recommendations</p>
        <div className="space-y-4">
          {active.map((r) => (
            <div key={r.id} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={r.color === "emerald"
                    ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }
                    : { background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <r.icon size={18} className={r.color === "emerald" ? "text-emerald-400" : "text-teal-400"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-white">{r.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                      style={{ background: priorityStyle[r.priority].bg, color: priorityStyle[r.priority].text }}>
                      {r.priority}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-3">{r.desc}</p>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {r.resources.map((res) => (
                      <span key={res} className="text-xs px-2.5 py-1 rounded-lg text-emerald-400"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                        {res}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/25">
                    <span className="flex items-center gap-1"><Lightbulb size={11} /> {r.from}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {r.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(16,185,129,0.08)", color: "rgba(16,185,129,0.6)" }}>
                      {r.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Completed</p>
          <div className="space-y-3">
            {completed.map((r) => (
              <div key={r.id} className="rounded-2xl p-4 flex items-center gap-4 opacity-60"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{r.title}</p>
                  <p className="text-xs text-white/30">{r.type} · {r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
