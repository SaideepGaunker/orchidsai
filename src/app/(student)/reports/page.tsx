"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Printer,
  Info,
  Brain,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
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
  { id: "S-012", date: "Feb 28, 2026", role: "Technical Interview", domain: "Software Engineering", ci: 74, content: 72, voice: 65, visual: 58, star: 78, duration: "22 min" },
  { id: "S-011", date: "Feb 26, 2026", role: "HR Interview", domain: "General", ci: 68, content: 64, voice: 71, visual: 62, star: 65, duration: "18 min" },
  { id: "S-010", date: "Feb 25, 2026", role: "Case Interview", domain: "Product Management", ci: 61, content: 58, voice: 60, visual: 55, star: 52, duration: "25 min" },
  { id: "S-009", date: "Feb 23, 2026", role: "Technical Interview", domain: "Data Science", ci: 55, content: 52, voice: 54, visual: 48, star: 44, duration: "30 min" },
];

const ciTrendAll = [
  { week: "W1", ci: 48 },
  { week: "W2", ci: 53 },
  { week: "W3", ci: 55 },
  { week: "W4", ci: 61 },
  { week: "W5", ci: 68 },
  { week: "W6", ci: 74 },
];

const ciTrendMonth = [
  { week: "Jan 1", ci: 42 },
  { week: "Jan 15", ci: 49 },
  { week: "Feb 1", ci: 56 },
  { week: "Feb 15", ci: 63 },
  { week: "Feb 28", ci: 74 },
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

// Skill gap: anything below 65 is flagged as a gap
const skillGaps = [
  { skill: "Eye Contact", score: 58, target: 70, category: "Visual" },
  { skill: "Filler Word Usage", score: 45, target: 80, category: "Voice" },
  { skill: "STAR Structure Adherence", score: 62, target: 75, category: "Content" },
  { skill: "Engagement Level", score: 68, target: 80, category: "Visual" },
  { skill: "Body Language", score: 58, target: 70, category: "Visual" },
];

const perQuestionFeedback = [
  {
    q: 1,
    question: "Tell me about yourself and why you're interested in this role.",
    type: "Behavioral",
    score: 78,
    star: 82,
    content: 76,
    voice: 80,
    feedback: "Good structure using Present-Past-Future. Eye contact was slightly low during the first 15 seconds.",
  },
  {
    q: 2,
    question: "Explain the difference between a stack and a queue.",
    type: "Technical",
    score: 72,
    star: null,
    content: 70,
    voice: 74,
    feedback: "Correct explanation but lacked real-world examples. Response was on the shorter side at 45 seconds.",
  },
  {
    q: 3,
    question: "Describe a situation where you worked under pressure to meet a deadline.",
    type: "STAR",
    score: 65,
    star: 60,
    content: 62,
    voice: 68,
    feedback: "STAR structure partially followed. Result was vague — try to include specific metrics or outcomes.",
  },
  {
    q: 4,
    question: "How would you design a URL shortening service like bit.ly?",
    type: "System Design",
    score: 74,
    star: null,
    content: 78,
    voice: 70,
    feedback: "Good coverage of hashing and database choice. Scaling considerations were mentioned but collision handling was skipped.",
  },
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
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [trendRange, setTrendRange] = useState<"weekly" | "monthly">("weekly");
  const [isLoading, setIsLoading] = useState(true);
  const [showCIExplainer, setShowCIExplainer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const session = sessions.find((s) => s.id === selectedSession) || sessions[0];

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-white/5" />
            <Skeleton className="h-4 w-96 bg-white/5" />
          </div>
          <Skeleton className="h-10 w-40 rounded-xl bg-white/5" />
        </div>
        <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
        <Skeleton className="h-12 w-64 rounded-xl bg-white/5" />
        <div className="grid lg:grid-cols-3 gap-6">
          <Skeleton className="h-[400px] rounded-2xl bg-white/5" />
          <Skeleton className="h-[400px] rounded-2xl bg-white/5" />
          <Skeleton className="h-[400px] rounded-2xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="p-6 lg:p-8 min-h-screen flex items-center justify-center">
        <Empty className="glass-card max-w-md border-white/5 p-12">
          <EmptyMedia variant="icon">
            <FileText className="size-6" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle className="text-white">No Reports Found</EmptyTitle>
            <EmptyDescription className="text-white/40">
              You haven't completed any interview sessions yet. Start your first session to see your performance analysis.
            </EmptyDescription>
          </EmptyHeader>
          <Link
            href="/interview"
            className="mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}
          >
            Start Your First Session
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Performance Reports</h1>
          <p className="text-sm text-white/40">Detailed multimodal analysis of your interview sessions</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 glass-card glass-card-hover transition-all"
        >
          <Printer size={15} /> Download PDF
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
      <div className="flex gap-1 mb-6 glass-card rounded-xl p-1 w-fit overflow-x-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "breakdown", label: "Breakdown" },
          { id: "voice", label: "Voice" },
          { id: "visual", label: "Visual" },
          { id: "skill-gap", label: "Skill Gap" },
          { id: "questions", label: "Per-Question" },
          { id: "progress", label: "Progress" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all"
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
              {/* CI Explainer button */}
              <button
                onClick={() => setShowCIExplainer(!showCIExplainer)}
                className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition-colors mb-2"
              >
                <Info size={12} /> How is CI calculated?
              </button>
              {showCIExplainer && (
                <div className="w-full rounded-xl p-3 text-left mb-2" style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)" }}>
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2">CI Formula</p>
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    CI = (0.35 × Content) + (0.25 × Voice) + (0.25 × Visual) + (0.15 × Consistency)
                  </p>
                  <div className="border-t border-white/5 mt-2 pt-2 space-y-1">
                    {[
                      { label: "Content (35%)", val: session.content },
                      { label: "Voice (25%)", val: session.voice },
                      { label: "Visual (25%)", val: session.visual },
                      { label: "Consistency (15%)", val: Math.round((session.content + session.voice) / 2) },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-white/40">{label}</span>
                        <span className="text-amber-400 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-full space-y-2">
                {[
                  { label: "Content (35%)", value: session.content },
                  { label: "Voice (25%)", value: session.voice },
                  { label: "Visual (25%)", value: session.visual },
                  { label: "STAR Structure", value: session.star },
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

      {/* Breakdown Tab — Voice + Visual + Content in one view */}
      {activeTab === "breakdown" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-amber-400" />
            <p className="text-xs text-white/40 uppercase tracking-widest font-black">Multimodal Score Breakdown</p>
          </div>

          {/* Three score pillars */}
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Voice Analysis */}
            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Mic2 size={15} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Voice Analysis</p>
                  <p className="text-xs text-teal-400 font-semibold">{session.voice} / 100 <span className="text-white/30 font-normal">(25% weight)</span></p>
                </div>
              </div>
              <div className="space-y-3">
                {voiceMetrics.map(({ label, value, status, note }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-medium text-white/70">{label}</p>
                      <p className="text-xs text-white/30">{note}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-white">{value}</span>
                      {status === "good"
                        ? <CheckCircle2 size={13} className="text-teal-400" />
                        : <AlertTriangle size={13} className="text-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Analysis */}
            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Eye size={15} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Visual Analysis</p>
                  <p className="text-xs text-purple-400 font-semibold">{session.visual} / 100 <span className="text-white/30 font-normal">(25% weight)</span></p>
                </div>
              </div>
              <div className="space-y-3">
                {visualMetrics.map(({ label, value, status, note }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-medium text-white/70">{label}</p>
                      <p className="text-xs text-white/30">{note}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-white">{value}</span>
                      {status === "good"
                        ? <CheckCircle2 size={13} className="text-teal-400" />
                        : <AlertTriangle size={13} className="text-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Analysis */}
            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Brain size={15} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Content Analysis</p>
                  <p className="text-xs text-amber-400 font-semibold">{session.content} / 100 <span className="text-white/30 font-normal">(35% weight)</span></p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Technical Accuracy", value: `${session.content}%`, note: "Domain correctness score", status: session.content >= 65 ? "good" : "warn" },
                  { label: "STAR Structure", value: `${session.star}%`, note: "Situation-Task-Action-Result", status: session.star >= 65 ? "good" : "warn" },
                  { label: "Completeness", value: `${Math.round((session.content + session.star) / 2)}%`, note: "Answer coverage depth", status: (session.content + session.star) / 2 >= 65 ? "good" : "warn" },
                  { label: "Skill Gap Match", value: "JD: 78%", note: "RAG-based JD alignment", status: "good" },
                  { label: "Response Clarity", value: session.content >= 70 ? "High" : "Medium", note: "Structure & coherence", status: session.content >= 70 ? "good" : "warn" },
                ].map(({ label, value, status, note }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-medium text-white/70">{label}</p>
                      <p className="text-xs text-white/30">{note}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-white">{value}</span>
                      {status === "good"
                        ? <CheckCircle2 size={13} className="text-teal-400" />
                        : <AlertTriangle size={13} className="text-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Consistency score */}
          <div className="glass-card rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-white">Consistency Score</p>
                <p className="text-xs text-white/35">15% of CI — performance stability across questions</p>
              </div>
              <span className="text-2xl font-black text-amber-400">{Math.round((session.content + session.voice) / 2)}</span>
            </div>
            <div className="h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round((session.content + session.voice) / 2)}%`, background: "linear-gradient(90deg, #fb923c, #f59e0b)" }} />
            </div>
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

      {/* Skill Gap Tab */}
      {activeTab === "skill-gap" && (
        <div className="space-y-5">
          <div className="glass-card rounded-2xl p-5"
            style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-amber-400" />
              <h3 className="text-sm font-semibold text-white">Skill Gap Analysis</h3>
            </div>
            <p className="text-xs text-white/35 mb-5">Skills below target threshold — focus your practice here</p>
            <div className="space-y-5">
              {skillGaps.map(({ skill, score, target, category }) => {
                const gap = target - score;
                const catColor = category === "Voice"
                  ? { bg: "rgba(20,184,166,0.12)", text: "text-teal-400" }
                  : category === "Visual"
                    ? { bg: "rgba(139,92,246,0.12)", text: "text-purple-400" }
                    : { bg: "rgba(251,146,60,0.12)", text: "text-amber-400" };
                return (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${catColor.text}`}
                          style={{ background: catColor.bg }}>
                          {category}
                        </span>
                        <span className="text-sm text-white/80">{skill}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-red-400 font-semibold">{score}%</span>
                        <span className="text-white/25">→</span>
                        <span className="text-teal-400 font-semibold">{target}% target</span>
                        <span className="text-white/35">({gap > 0 ? `+${gap}` : gap} pts gap)</span>
                      </div>
                    </div>
                    <div className="relative h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full bg-red-500/60 transition-all" style={{ width: `${score}%` }} />
                      {/* Target marker */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-teal-400/70"
                        style={{ left: `${target}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations from gaps */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Suggested Focus Areas</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: "Eye Contact Drills", desc: "Practice looking directly at the camera for 70% of your response time.", tag: "Visual", link: "/interview" },
                { title: "Filler Word Reduction", desc: "Record yourself and count filler words. Aim for structured pauses instead.", tag: "Voice", link: "/interview" },
                { title: "STAR Format Practice", desc: "Use the STAR template for every behavioral question you answer.", tag: "Content", link: "/exam" },
              ].map((r) => (
                <div key={r.title} className="rounded-xl p-4 flex flex-col gap-2"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold text-amber-400 w-fit"
                    style={{ background: "rgba(251,146,60,0.1)" }}>
                    {r.tag}
                  </span>
                  <p className="text-sm font-medium text-white">{r.title}</p>
                  <p className="text-xs text-white/35 leading-relaxed flex-1">{r.desc}</p>
                  <Link href={r.link}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors w-fit">
                    Practice Now <ChevronRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Per-Question Tab */}
      {activeTab === "questions" && (
        <div className="space-y-3">
          <p className="text-xs text-white/35 mb-2">
            Click any question card to expand detailed AI feedback.
          </p>
          {perQuestionFeedback.map((item) => {
            const isExpanded = expandedQ === item.q;
            const scoreColor = item.score >= 75 ? "text-teal-400" : item.score >= 60 ? "text-amber-400" : "text-red-400";
            const typeColors: Record<string, string> = {
              Behavioral: "rgba(251,146,60,0.15)",
              Technical: "rgba(20,184,166,0.15)",
              STAR: "rgba(139,92,246,0.15)",
              "System Design": "rgba(59,130,246,0.15)",
            };
            const typeText: Record<string, string> = {
              Behavioral: "text-amber-400",
              Technical: "text-teal-400",
              STAR: "text-purple-400",
              "System Design": "text-blue-400",
            };
            return (
              <div key={item.q}
                className="glass-card rounded-2xl overflow-hidden transition-all"
                style={{ border: isExpanded ? "1px solid rgba(251,146,60,0.2)" : "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => setExpandedQ(isExpanded ? null : item.q)}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <span className="text-white/50">Q{item.q}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${typeText[item.type]}`}
                        style={{ background: typeColors[item.type] }}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-1">{item.question}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className={`text-lg font-black ${scoreColor}`}>{item.score}</p>
                      <p className="text-xs text-white/25">Score</p>
                    </div>
                    {isExpanded
                      ? <ChevronUp size={16} className="text-white/40" />
                      : <ChevronDown size={16} className="text-white/40" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/5">
                    <div className="grid grid-cols-3 gap-3 mt-4 mb-4">
                      {[
                        { label: "Content", value: item.content },
                        { label: "Voice", value: item.voice },
                        { label: "STAR", value: item.star ?? "N/A" },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl p-3 text-center"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <p className="text-base font-bold text-white">{value}{typeof value === "number" ? "%" : ""}</p>
                          <p className="text-xs text-white/35 mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4"
                      style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.12)" }}>
                      <p className="text-xs font-semibold text-amber-400 mb-1">AI Feedback</p>
                      <p className="text-xs text-white/65 leading-relaxed">{item.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === "progress" && (
        <div className="space-y-5">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-semibold text-white">Confidence Index Growth</h3>
                <p className="text-xs text-white/30 mt-0.5">+26 points improvement</p>
              </div>
              {/* Date range picker */}
              <div className="flex gap-1 glass-card rounded-lg p-1">
                {(["weekly", "monthly"] as const).map((r) => (
                  <button key={r} onClick={() => setTrendRange(r)}
                    className="px-3 py-1 rounded-md text-xs font-medium transition-all capitalize"
                    style={trendRange === r
                      ? { background: "linear-gradient(135deg,#fb923c,#f59e0b)", color: "#000" }
                      : { color: "rgba(255,255,255,0.4)" }}>
                    {r === "weekly" ? "6-Week" : "Monthly"}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200} className="mt-4">
              <AreaChart data={trendRange === "weekly" ? ciTrendAll : ciTrendMonth}>
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
