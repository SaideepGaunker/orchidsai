"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mic2,
  Briefcase,
  Code2,
  LineChart,
  Users,
  ArrowRight,
  Clock,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: Users, desc: "Behavioral, situational, and culture-fit questions", color: "amber" },
  { id: "technical", label: "Technical Interview", icon: Code2, desc: "DSA, system design, and domain-specific questions", color: "teal" },
  { id: "case", label: "Case Interview", icon: LineChart, desc: "Business problem-solving and analytical reasoning", color: "amber" },
  { id: "mock", label: "Full Mock Interview", icon: Briefcase, desc: "Combined HR + Technical simulation (30–45 min)", color: "teal" },
];

const domains: Record<string, string[]> = {
  hr: ["General", "Leadership", "Teamwork & Conflict", "Motivation & Goals", "Company Fit"],
  technical: ["Software Engineering", "Data Science", "DevOps / Cloud", "Product Management", "Frontend / UI", "Backend / APIs", "Machine Learning", "Cybersecurity"],
  case: ["Strategy Consulting", "Product Strategy", "Market Sizing", "Financial Analysis", "Operations"],
  mock: ["Software Engineering", "Data Science", "Finance", "Marketing", "Operations"],
};

const difficulties = [
  { id: "beginner", label: "Beginner", desc: "Entry-level, foundational questions" },
  { id: "intermediate", label: "Intermediate", desc: "2–4 years experience level" },
  { id: "advanced", label: "Advanced", desc: "Senior / expert-level depth" },
];

const durations = [
  { id: "15", label: "15 min", questions: "5–7 questions" },
  { id: "30", label: "30 min", questions: "10–12 questions" },
  { id: "45", label: "45 min", questions: "15–18 questions" },
];

export default function InterviewSetupPage() {
  const [selectedType, setSelectedType] = useState("technical");
  const [selectedDomain, setSelectedDomain] = useState("Software Engineering");
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate");
  const [selectedDuration, setSelectedDuration] = useState("30");

  const currentDomains = domains[selectedType] || [];

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
          <Link href="/dashboard" className="hover:text-white/60 transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">Setup Interview</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Configure Your Interview</h1>
        <p className="text-sm text-white/40">Customize the simulation to match your target role and difficulty level.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interview Type */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-1">Interview Type</h2>
            <p className="text-xs text-white/35 mb-4">Choose the style of interview simulation</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {interviewTypes.map(({ id, label, icon: Icon, desc, color }) => (
                <button key={id} onClick={() => { setSelectedType(id); setSelectedDomain(domains[id][0]); }}
                  className="flex items-start gap-3 p-4 rounded-xl text-left transition-all"
                  style={selectedType === id ? {
                    background: color === "amber" ? "linear-gradient(135deg,rgba(251,146,60,0.12),rgba(245,158,11,0.06))" : "linear-gradient(135deg,rgba(20,184,166,0.12),rgba(6,182,212,0.06))",
                    border: color === "amber" ? "1px solid rgba(251,146,60,0.25)" : "1px solid rgba(20,184,166,0.25)",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={selectedType === id
                      ? color === "amber" ? { background: "rgba(251,146,60,0.15)" } : { background: "rgba(20,184,166,0.15)" }
                      : { background: "rgba(255,255,255,0.05)" }}>
                    <Icon size={16} className={selectedType === id ? (color === "amber" ? "text-amber-400" : "text-teal-400") : "text-white/35"} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${selectedType === id ? "text-white" : "text-white/50"}`}>{label}</p>
                    <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Domain */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-1">Domain / Specialization</h2>
            <p className="text-xs text-white/35 mb-4">Select your target domain for tailored questions</p>
            <div className="flex flex-wrap gap-2">
              {currentDomains.map((d) => (
                <button key={d} onClick={() => setSelectedDomain(d)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={selectedDomain === d ? {
                    background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                    color: "#000",
                    boxShadow: "0 0 10px rgba(251,146,60,0.25)",
                  } : {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-1">Difficulty Level</h2>
            <p className="text-xs text-white/35 mb-4">Adaptive difficulty adjusts question complexity accordingly</p>
            <div className="grid grid-cols-3 gap-3">
              {difficulties.map(({ id, label, desc }) => (
                <button key={id} onClick={() => setSelectedDifficulty(id)}
                  className="p-4 rounded-xl text-center transition-all"
                  style={selectedDifficulty === id ? {
                    background: "linear-gradient(135deg,rgba(251,146,60,0.12),rgba(245,158,11,0.06))",
                    border: "1px solid rgba(251,146,60,0.25)",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                  <Zap size={16} className={`mx-auto mb-2 ${selectedDifficulty === id ? "text-amber-400" : "text-white/25"}`} />
                  <p className={`text-sm font-medium ${selectedDifficulty === id ? "text-white" : "text-white/45"}`}>{label}</p>
                  <p className="text-xs text-white/25 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-1">Session Duration</h2>
            <p className="text-xs text-white/35 mb-4">Choose how long your session will run</p>
            <div className="grid grid-cols-3 gap-3">
              {durations.map(({ id, label, questions }) => (
                <button key={id} onClick={() => setSelectedDuration(id)}
                  className="p-4 rounded-xl text-center transition-all"
                  style={selectedDuration === id ? {
                    background: "linear-gradient(135deg,rgba(20,184,166,0.12),rgba(6,182,212,0.06))",
                    border: "1px solid rgba(20,184,166,0.25)",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                  <Clock size={16} className={`mx-auto mb-2 ${selectedDuration === id ? "text-teal-400" : "text-white/25"}`} />
                  <p className={`text-sm font-semibold ${selectedDuration === id ? "text-white" : "text-white/45"}`}>{label}</p>
                  <p className="text-xs text-white/25 mt-0.5">{questions}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 sticky top-6"
            style={{ border: "1px solid rgba(251,146,60,0.12)" }}>
            <h3 className="text-sm font-semibold text-white mb-4">Session Summary</h3>

            <div className="space-y-3 mb-6">
              {[
                { label: "Type", value: interviewTypes.find(t => t.id === selectedType)?.label },
                { label: "Domain", value: selectedDomain },
                { label: "Difficulty", value: difficulties.find(d => d.id === selectedDifficulty)?.label },
                { label: "Duration", value: `${selectedDuration} minutes` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-white/35">{label}</span>
                  <span className="text-xs font-medium text-white/80">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/6 pt-4 mb-6">
              <p className="text-xs text-white/30 mb-2">This session includes:</p>
              <ul className="space-y-1.5">
                {["AI question generation", "Voice & video recording", "Real-time analysis", "Full performance report"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/45">
                    <CheckCircle2 size={12} className="text-teal-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/interview/session"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 24px rgba(251,146,60,0.3)" }}>
              <Mic2 size={16} /> Start Session <ArrowRight size={14} />
            </Link>

            <p className="text-center text-xs text-white/20 mt-3">
              Camera & microphone access required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
