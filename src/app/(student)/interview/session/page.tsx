"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
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
  Timer,
  TrendingUp,
  Shield,
  Camera,
  X,
} from "lucide-react";
import { CameraPermissionGate } from "@/components/CameraPermissionGate";
import { VideoFeed } from "@/components/VideoRecorder";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

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
  const router = useRouter();
  const QUESTION_TIME = 90; // seconds per question
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentRec, setConsentRec] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [qTimer, setQTimer] = useState(QUESTION_TIME);
  const [showTip, setShowTip] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const interimTranscriptRef = useRef("");

  // Adaptive difficulty: beginner for first 1/3, intermediate for middle, advanced for last 1/3
  const difficultyLevel = currentQ < Math.floor(questions.length / 3)
    ? { label: "Beginner", color: "rgba(20,184,166,0.15)", text: "text-teal-400" }
    : currentQ < Math.floor((questions.length * 2) / 3)
      ? { label: "Intermediate", color: "rgba(251,146,60,0.15)", text: "text-amber-400" }
      : { label: "Advanced", color: "rgba(239,68,68,0.15)", text: "text-red-400" };

  const handleTranscript = useCallback((transcript: string, isFinal: boolean) => {
    setAnswer((prev) => {
      // Remove previous interim from prev to get base
      const base = interimTranscriptRef.current
        ? prev.slice(0, -interimTranscriptRef.current.length).trimEnd()
        : prev;
      const sep = base ? " " : "";

      if (isFinal) {
        interimTranscriptRef.current = "";
        return base + sep + transcript;
      }
      interimTranscriptRef.current = transcript;
      return base + sep + transcript;
    });
  }, []);

  const { isListening, isSupported, start: startTranscription, stop: stopTranscription } = useSpeechRecognition({
    onTranscript: handleTranscript,
    continuous: true,
    interimResults: true,
  });

  // Sync transcription with micOn: when mic is on, start transcribing; when off, stop
  useEffect(() => {
    if (micOn && isSupported) {
      startTranscription();
    } else {
      stopTranscription();
      interimTranscriptRef.current = "";
    }
  }, [micOn, isSupported, startTranscription, stopTranscription]);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Per-question timer — resets whenever currentQ changes
  useEffect(() => {
    setQTimer(QUESTION_TIME);
    const interval = setInterval(() => {
      setQTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQ]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleEndSession = () => {
    setIsNavigating(true);
    router.push("/interview/end-session?sessionId=S-012");
  };

  const handleSubmit = () => {
    if (!answer.trim() || isNavigating) return;

    // Use functional state update with closure prevention to ensure we never have duplicates
    setSubmitted(prev => {
      if (!prev.includes(currentQ)) return [...prev, currentQ];
      return prev;
    });

    setAnswer("");
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleEndSession();
    }
  };

  const q = questions[currentQ];

  // ── Consent Modal ─────────────────────────────────────────────────────────
  if (!consentGiven) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div
          className="glass-card rounded-3xl p-8 max-w-lg w-full"
          style={{ border: "1px solid rgba(251,146,60,0.2)", boxShadow: "0 0 40px rgba(251,146,60,0.05)" }}
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg,rgba(251,146,60,0.15),rgba(245,158,11,0.08))", border: "1px solid rgba(251,146,60,0.2)" }}>
            <Shield size={24} className="text-amber-400" />
          </div>

          <h2 className="text-xl font-bold text-white text-center mb-1">Before We Begin</h2>
          <p className="text-sm text-white/40 text-center mb-6 leading-relaxed">
            This session uses your camera and microphone for AI-driven behavioral analysis.
            Please read and accept the following before proceeding.
          </p>

          {/* Consent items */}
          <div className="space-y-3 mb-8">
            {[
              {
                id: "rec", state: consentRec, setter: setConsentRec,
                icon: Camera,
                title: "I consent to video & audio recording",
                desc: "Your session will be recorded for AI analysis including voice, facial expressions, and posture.",
              },
              {
                id: "priv", state: consentPrivacy, setter: setConsentPrivacy,
                icon: Shield,
                title: "I understand my data is used only for evaluation",
                desc: "Recordings are processed by AI for performance metrics and are not stored permanently or shared.",
              },
            ].map(({ id, state, setter, icon: Icon, title, desc }) => (
              <button
                key={id}
                onClick={() => setter(!state)}
                className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all"
                style={state ? {
                  background: "rgba(251,146,60,0.08)",
                  border: "1px solid rgba(251,146,60,0.25)",
                } : {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Checkbox */}
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                  style={state
                    ? { background: "linear-gradient(135deg,#fb923c,#f59e0b)" }
                    : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {state && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className={state ? "text-amber-400" : "text-white/30"} />
                    <p className={`text-sm font-semibold ${state ? "text-white" : "text-white/60"}`}>{title}</p>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setConsentGiven(true)}
              disabled={!consentRec || !consentPrivacy}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: consentRec && consentPrivacy ? "0 0 20px rgba(251,146,60,0.3)" : "none" }}
            >
              Allow & Begin Session
            </button>
            <button
              onClick={() => router.push("/interview")}
              className="w-full py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/60 transition-colors"
            >
              Cancel — Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Per-question countdown */}
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold glass-card"
            style={qTimer <= 15
              ? { color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" }
              : { color: "rgba(255,255,255,0.6)" }}
          >
            <Timer size={12} className={qTimer <= 15 ? "text-red-400" : "text-white/40"} />
            {fmt(qTimer)}
          </div>
          {/* Adaptive difficulty badge */}
          <div
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${difficultyLevel.text}`}
            style={{ background: difficultyLevel.color }}
          >
            <TrendingUp size={12} />
            {difficultyLevel.label}
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
          <button onClick={handleEndSession} disabled={isNavigating}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <StopCircle size={14} /> {isNavigating ? "Ending..." : "End Session"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-5">
        {/* Left: Camera + metrics */}
        <div className="space-y-4">
          {/* Camera feed - real video or permission gate */}
          <CameraPermissionGate>
            {(mediaStream) => (
              <div className="glass-card rounded-2xl overflow-hidden aspect-video relative"
                style={{ border: "1px solid rgba(251,146,60,0.15)" }}>
                {camOn ? (
                  <VideoFeed stream={mediaStream} muted className="w-full h-full" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(20,20,40,0.9), rgba(10,12,24,0.95))" }}>
                    <VideoOff size={24} className="text-white/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
                  style={{ background: "rgba(0,0,0,0.6)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white/50">REC</span>
                </div>
              </div>
            )}
          </CameraPermissionGate>

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
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${submitted.includes(i) ? "bg-teal-400 text-black" : i === currentQ ? "bg-amber-400 text-black" : "bg-white/8 text-white/30"
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
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${typeTextColors[q.type]}`}
                    style={{ background: typeColors[q.type], color: "currentColor" }}>
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
              <div className="flex items-center gap-2">
                {micOn && isSupported && (
                  <span className="flex items-center gap-1.5 text-xs text-amber-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${isListening ? "bg-amber-400 animate-pulse" : "bg-white/30"}`} />
                    {isListening ? "Listening..." : "Voice ready"}
                  </span>
                )}
                <p className="text-xs text-white/20">{answer.length} chars</p>
              </div>
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
              <button
                onClick={() => { if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1); }}
                disabled={isNavigating}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/40 hover:text-white/60 glass-card glass-card-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <SkipForward size={13} /> Skip Question
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-white/25">
                  <ChevronRight size={12} />
                  {Math.max(0, questions.length - submitted.length)} remaining
                </div>
                <button onClick={handleSubmit} disabled={isNavigating || !answer.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.3)" }}>
                  <Send size={14} />
                  {isNavigating ? "Submitting..." : currentQ === questions.length - 1 ? "Submit Final" : "Submit & Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
