"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ChevronRight,
  Send,
  SkipForward,
  StopCircle,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

const questions = [
  {
    id: 1,
    text: "Tell me about yourself and why you're interested in this software engineering role.",
    type: "Behavioral",
    tip: "Use the Present-Past-Future structure: who you are now, what led you here, what you're aiming for.",
  },
  {
    id: 2,
    text: "Explain the difference between a stack and a queue. When would you use each?",
    type: "Technical",
    tip: "Mention real-world use cases—browser history for stack, print queue or BFS for queue.",
  },
  {
    id: 3,
    text: "Describe a situation where you had to work under pressure to meet a deadline.",
    type: "STAR",
    tip: "Follow Situation → Task → Action → Result format with specific metrics if possible.",
  },
  {
    id: 4,
    text: "How would you design a URL shortening service like bit.ly?",
    type: "System Design",
    tip: "Discuss hashing strategy, database choice, scalability, and edge cases like collision handling.",
  },
];

const typeColors: Record<string, string> = {
  Behavioral: "rgba(251,146,60,0.15)",
  Technical: "rgba(20,184,166,0.15)",
  STAR: "rgba(139,92,246,0.15)",
  "System Design": "rgba(59,130,246,0.15)",
};
const typeTextColors: Record<string, string> = {
  Behavioral: "text-amber-400",
  Technical: "text-teal-400",
  STAR: "text-purple-400",
  "System Design": "text-blue-400",
};

export default function InterviewSessionPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setSubmitted([...submitted, currentQ]);
    setAnswer("");
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const q = questions[currentQ];

  return (
    <div className="p-6 lg:p-8 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white/60">Recording</span>
          </div>
          <div className="glass-card rounded-lg px-3 py-1.5 text-xs text-white/60 font-mono">
            {fmt(elapsed)}
          </div>
          <div className="glass-card rounded-lg px-3 py-1.5 text-xs text-white/60">
            Q {currentQ + 1} / {questions.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMicOn(!micOn)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all glass-card glass-card-hover"
            style={!micOn ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" } : {}}>
            {micOn ? <Mic size={15} className="text-white/60" /> : <MicOff size={15} className="text-red-400" />}
          </button>
          <button onClick={() => setCamOn(!camOn)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all glass-card glass-card-hover"
            style={!camOn ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" } : {}}>
            {camOn ? <Video size={15} className="text-white/60" /> : <VideoOff size={15} className="text-red-400" />}
          </button>
          <Link href="/reports"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 transition-all"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <StopCircle size={14} /> End Session
          </Link>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-5">
        {/* Left: Camera + metrics */}
        <div className="space-y-4">
          {/* Camera feed */}
          <div className="glass-card rounded-2xl overflow-hidden aspect-video relative"
            style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(20,20,40,0.9), rgba(10,12,24,0.95))" }}>
              {camOn ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-2 text-xl font-black text-black">
                    AK
                  </div>
                  <p className="text-xs text-white/30">Camera Active</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff size={24} className="text-white/20 mx-auto mb-2" />
                  <p className="text-xs text-white/20">Camera Off</p>
                </div>
              )}
            </div>
            {/* Recording indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
              style={{ background: "rgba(0,0,0,0.6)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/50">REC</span>
            </div>
          </div>

          {/* Live metrics */}
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">Live Analysis</p>
            <div className="space-y-3">
              {[
                { label: "Confidence", value: 72, color: "amber" },
                { label: "Eye Contact", value: 65, color: "teal" },
                { label: "Voice Clarity", value: 80, color: "amber" },
                { label: "Engagement", value: 58, color: "teal" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">{label}</span>
                    <span className={color === "amber" ? "text-amber-400" : "text-teal-400"}>{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className={`h-full rounded-full transition-all ${color === "amber" ? "progress-amber" : "progress-teal"}`}
                      style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question list */}
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">Questions</p>
            <div className="space-y-2">
              {questions.map((q2, i) => (
                <button key={i} onClick={() => setCurrentQ(i)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-all"
                  style={i === currentQ ? { background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.15)" } : {}}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    submitted.includes(i) ? "bg-teal-400 text-black" : i === currentQ ? "bg-amber-400 text-black" : "bg-white/8 text-white/30"
                  }`}>
                    {submitted.includes(i) ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs truncate ${i === currentQ ? "text-white" : "text-white/35"}`}>{q2.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Question + answer */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Question card */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold"
                    style={{ background: typeColors[q.type], color: "currentColor" }}
                    className={typeTextColors[q.type]}>
                    {q.type}
                  </span>
                  <span className="text-xs text-white/25">Question {currentQ + 1} of {questions.length}</span>
                </div>
                <h2 className="text-lg font-semibold text-white leading-relaxed">{q.text}</h2>
              </div>
              <button onClick={() => setShowTip(!showTip)}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={showTip ? { background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.2)" } : { background: "rgba(255,255,255,0.05)" }}>
                <Lightbulb size={14} className={showTip ? "text-amber-400" : "text-white/30"} />
              </button>
            </div>

            {showTip && (
              <div className="rounded-xl p-3 mb-2 flex items-start gap-2"
                style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.15)" }}>
                <AlertCircle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/80 leading-relaxed">{q.tip}</p>
              </div>
            )}
          </div>

          {/* Answer area */}
          <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-white/40">Your Answer</p>
              <p className="text-xs text-white/20">{answer.length} chars</p>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here, or speak and it will be transcribed automatically..."
              className="flex-1 w-full resize-none rounded-xl p-4 text-sm text-white placeholder:text-white/20 outline-none transition-all leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                minHeight: "180px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(251,146,60,0.3)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
            />
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => { if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/40 hover:text-white/60 glass-card glass-card-hover transition-all">
                <SkipForward size={13} /> Skip Question
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-white/25">
                  <ChevronRight size={12} />
                  {questions.length - submitted.length - (submitted.includes(currentQ) ? 0 : 0)} remaining
                </div>
                <button onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.3)" }}>
                  <Send size={14} />
                  {currentQ === questions.length - 1 ? "Submit Final" : "Submit & Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
