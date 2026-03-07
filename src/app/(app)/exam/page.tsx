"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart2,
  Trophy,
  RotateCcw,
} from "lucide-react";

const examQuestions = [
  {
    id: 1,
    topic: "Data Structures",
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correct: 1,
    explanation: "A Stack follows the LIFO principle. The last element inserted is the first one to be removed, like a stack of plates.",
  },
  {
    id: 2,
    topic: "Algorithms",
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    correct: 2,
    explanation: "Binary Search has O(log n) time complexity because it halves the search space at each step.",
  },
  {
    id: 3,
    topic: "Operating Systems",
    question: "What does CPU scheduling algorithm 'Round Robin' use to switch between processes?",
    options: ["Priority value", "Memory size", "Time quantum", "I/O burst"],
    correct: 2,
    explanation: "Round Robin scheduling uses a fixed time quantum to cycle through processes in a circular queue.",
  },
  {
    id: 4,
    topic: "Databases",
    question: "Which SQL clause is used to filter groups after a GROUP BY statement?",
    options: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
    correct: 1,
    explanation: "HAVING is used to filter groups after aggregation, while WHERE filters rows before aggregation.",
  },
  {
    id: 5,
    topic: "Networking",
    question: "Which protocol is responsible for resolving domain names to IP addresses?",
    options: ["HTTP", "FTP", "DNS", "SMTP"],
    correct: 2,
    explanation: "DNS (Domain Name System) translates human-readable domain names into IP addresses.",
  },
  {
    id: 6,
    topic: "OOP Concepts",
    question: "Which OOP principle allows a class to take multiple forms?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    correct: 3,
    explanation: "Polymorphism allows objects to take many forms—method overloading and overriding are common examples.",
  },
];

export default function ExamPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) { setSubmitted(true); setShowResult(true); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const isUrgent = timeLeft < 120;

  const handleSelect = (optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: optIdx });
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    const score = examQuestions.filter((q, i) => selectedAnswers[i] === q.correct).length;
    router.push(`/exam/results?score=${score}&total=${examQuestions.length}`);
  };

  const score = examQuestions.filter((q, i) => selectedAnswers[i] === q.correct).length;
  const percent = Math.round((score / examQuestions.length) * 100);


  const q = examQuestions[currentQ];
  const answered = selectedAnswers[currentQ] !== undefined;

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-white/40 text-xs mb-0.5">Software Engineering · Intermediate</p>
          <h1 className="text-lg font-bold text-white">Practice Exam</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-sm font-mono font-bold"
            style={isUrgent ? { color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" } : { color: "rgba(255,255,255,0.7)" }}>
            <Clock size={14} className={isUrgent ? "text-red-400" : "text-white/40"} />
            {fmt(timeLeft)}
          </div>
          <button onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
            Submit Exam
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full transition-all progress-amber"
          style={{ width: `${((currentQ + 1) / examQuestions.length) * 100}%` }} />
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Question Nav */}
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">Questions</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {examQuestions.map((_, i) => (
              <button key={i} onClick={() => setCurrentQ(i)}
                className="w-full aspect-square rounded-lg text-xs font-bold transition-all"
                style={i === currentQ ? {
                  background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                  color: "#000",
                } : selectedAnswers[i] !== undefined ? {
                  background: selectedAnswers[i] === examQuestions[i].correct ? "rgba(20,184,166,0.2)" : "rgba(255,255,255,0.08)",
                  color: selectedAnswers[i] === examQuestions[i].correct ? "#2dd4bf" : "rgba(255,255,255,0.6)",
                  border: selectedAnswers[i] === examQuestions[i].correct ? "1px solid rgba(20,184,166,0.2)" : "1px solid rgba(255,255,255,0.08)",
                } : {
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="space-y-2 text-xs text-white/35">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }} />
              Current
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
              Answered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }} />
              Not visited
            </div>
          </div>
        </div>

        {/* Question + Options */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold text-teal-400"
                style={{ background: "rgba(20,184,166,0.12)" }}>
                {q.topic}
              </span>
              <span className="text-xs text-white/25">Question {currentQ + 1}</span>
            </div>
            <h2 className="text-base font-semibold text-white mb-6 leading-relaxed">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => handleSelect(i)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-sm text-left transition-all"
                  style={selectedAnswers[currentQ] === i ? {
                    background: "linear-gradient(135deg,rgba(251,146,60,0.12),rgba(245,158,11,0.06))",
                    border: "1px solid rgba(251,146,60,0.3)",
                    color: "white",
                  } : {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                  }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={selectedAnswers[currentQ] === i ? {
                      background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                      color: "#000",
                    } : {
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.4)",
                    }}>
                    {["A", "B", "C", "D"][i]}
                  </div>
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <button onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 mt-4 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                <AlertCircle size={13} />
                {showExplanation ? "Hide" : "Show"} Explanation
              </button>
            )}

            {showExplanation && answered && (
              <div className="mt-3 rounded-xl p-4"
                style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.15)" }}>
                <p className="text-xs text-amber-300/80 leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button onClick={() => { if (currentQ > 0) setCurrentQ(currentQ - 1); }}
              disabled={currentQ === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 glass-card glass-card-hover transition-all disabled:opacity-30">
              ← Previous
            </button>
            <span className="text-xs text-white/25">{Object.keys(selectedAnswers).length} / {examQuestions.length} answered</span>
            <button onClick={() => { if (currentQ < examQuestions.length - 1) setCurrentQ(currentQ + 1); }}
              disabled={currentQ === examQuestions.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105 disabled:opacity-30"
              style={{ background: "linear-gradient(135deg,rgba(251,146,60,0.15),rgba(245,158,11,0.08))", color: "rgba(251,146,60,0.9)", border: "1px solid rgba(251,146,60,0.2)" }}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
