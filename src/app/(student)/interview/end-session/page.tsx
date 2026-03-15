"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  BarChart2,
  Target,
  Mic2,
  Eye,
  FileText,
  Home,
  ChevronRight,
  Trophy,
} from "lucide-react";

// Mock session summary - in real flow, pass via state or fetch by sessionId
const defaultSummary = {
  sessionId: "S-012",
  duration: "22:15",
  questionsAnswered: 4,
  totalQuestions: 4,
  ci: 74,
  content: 72,
  voice: 65,
  visual: 58,
  consistency: 70,
};

function EndSessionContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? defaultSummary.sessionId;
  const summary = defaultSummary;

  return (
    <div className="w-full max-w-2xl">
      <div className="glass-card rounded-3xl p-8 text-center mb-6"
        style={{ border: "1px solid rgba(251,146,60,0.2)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 30px rgba(251,146,60,0.3)" }}>
          <CheckCircle2 size={32} className="text-black" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Session Ended</h1>
        <p className="text-white/40 text-sm mb-2">Great job! Here&apos;s your session summary</p>
        <p className="text-xs text-white/25 mb-6">Session ID: {sessionId}</p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Target size={20} className="text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{summary.ci}</p>
            <p className="text-xs text-white/40">CI Score</p>
          </div>
          <div className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <FileText size={20} className="text-teal-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{summary.content}%</p>
            <p className="text-xs text-white/40">Content</p>
          </div>
          <div className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Mic2 size={20} className="text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{summary.voice}%</p>
            <p className="text-xs text-white/40">Voice</p>
          </div>
          <div className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Eye size={20} className="text-teal-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{summary.visual}%</p>
            <p className="text-xs text-white/40">Visual</p>
          </div>
        </div>

        <p className="text-xs text-white/35 mb-6">
          Duration: {summary.duration} · {summary.questionsAnswered}/{summary.totalQuestions} questions answered
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 glass-card glass-card-hover transition-all">
            <Home size={14} /> Dashboard
          </Link>
          <Link href={`/reports?session=${sessionId}`}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
            <BarChart2 size={14} /> Full Report <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick tip */}
      <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
        <Trophy size={24} className="text-amber-400 flex-shrink-0" />
        <div className="text-left">
          <p className="text-sm font-medium text-white">Keep practicing!</p>
          <p className="text-xs text-white/40">Your full AI analysis and recommendations are available in the report.</p>
        </div>
      </div>
    </div>
  );
}

export default function EndSessionPage() {
  return (
    <div className="p-6 lg:p-8 min-h-screen flex items-center justify-center">
      <Suspense fallback={<div className="text-white/50">Loading summary...</div>}>
        <EndSessionContent />
      </Suspense>
    </div>
  );
}
