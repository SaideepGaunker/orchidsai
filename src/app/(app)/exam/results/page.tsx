"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import {
    Trophy,
    CheckCircle2,
    XCircle,
    BarChart2,
    RotateCcw,
    ArrowRight,
    ChevronRight,
    Clock,
    Target,
} from "lucide-react";

// Mock questions for the review (should ideally come from a shared constant or state)
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

function ResultsInner() {
    const searchParams = useSearchParams();
    const score = parseInt(searchParams.get("score") || "0");
    const total = parseInt(searchParams.get("total") || "6");
    const percent = Math.round((score / total) * 100);
    const passed = percent >= 70;

    return (
        <div className="p-6 lg:p-10 min-h-screen bg-[#060812]">
            <div className="max-w-4xl mx-auto">
                {/* Header with breadcrumb */}
                <div className="flex items-center gap-2 text-white/30 text-xs mb-8">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight size={12} />
                    <Link href="/exam" className="hover:text-white transition-colors">Exam Practice</Link>
                    <ChevronRight size={12} />
                    <span className="text-amber-400 font-medium">Exam Results</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Main Results Column */}
                    <div className="lg:col-span-12 space-y-8">
                        {/* Score Summary Card */}
                        <div className="glass-card rounded-[2.5rem] p-10 text-center relative overflow-hidden"
                            style={{ border: "1px solid rgba(251,146,60,0.2)", background: "rgba(255,255,255,0.02)" }}>
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px]"
                                style={{ background: passed ? "rgba(20,184,166,0.15)" : "rgba(251,146,60,0.15)" }} />

                            <div className="relative z-10">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${passed ? "bg-teal-500/10 text-teal-400" : "bg-amber-500/10 text-amber-400"}`}
                                    style={{ border: passed ? "1px solid rgba(20,184,166,0.2)" : "1px solid rgba(251,146,60,0.2)" }}>
                                    <Trophy size={36} />
                                </div>

                                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                                    {passed ? "Congratulations! You Passed" : "Good Effort!"}
                                </h2>
                                <p className="text-white/40 text-sm mb-10 max-w-md mx-auto">
                                    {passed
                                        ? "Excellent work! You've demonstrated a strong grasp of these concepts."
                                        : "You're close! Review the explanations below and try again to improve your score."}
                                </p>

                                <div className="flex items-center justify-center gap-12 mb-10">
                                    <div className="text-center">
                                        <div className={`text-6xl font-black mb-1 ${passed ? "text-teal-400" : "text-amber-400"}`}>
                                            {percent}%
                                        </div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Final Score</p>
                                    </div>
                                    <div className="w-[1px] h-12 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-white mb-2">{score} / {total}</div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Questions Correct</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Link href="/exam"
                                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
                                        style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.3)" }}>
                                        <RotateCcw size={16} /> Retake Exam
                                    </Link>
                                    <Link href="/reports"
                                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 glass-card"
                                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                                        <BarChart2 size={16} /> Analysis Report
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Answer Review */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-lg font-bold text-white tracking-tight">Detailed Review</h3>
                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5 text-teal-400">
                                        <div className="w-2 h-2 rounded-full bg-teal-400" /> Correct
                                    </span>
                                    <span className="flex items-center gap-1.5 text-red-400">
                                        <div className="w-2 h-2 rounded-full bg-red-400" /> Incorrect
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {examQuestions.map((q, i) => {
                                    const isCorrect = i < score; // Mocking correct/incorrect for demo
                                    return (
                                        <div key={q.id} className="glass-card rounded-3xl p-6 border transition-all hover:bg-white/[0.03]"
                                            style={{ border: isCorrect ? "1px solid rgba(20,184,166,0.15)" : "1px solid rgba(239,68,68,0.15)" }}>
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${isCorrect ? "bg-teal-500/10 text-teal-400" : "bg-red-500/10 text-red-400"}`}>
                                                    {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/5 text-white/40 tracking-widest">
                                                            Question {q.id}
                                                        </span>
                                                        <span className="text-xs text-white/30">{q.topic}</span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-white mb-4 leading-relaxed">{q.question}</h4>

                                                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                                            <p className="text-[10px] text-white/30 uppercase font-black mb-1">Your Answer</p>
                                                            <p className={`text-xs font-bold ${isCorrect ? "text-teal-400" : "text-red-400"}`}>
                                                                {q.options[isCorrect ? q.correct : (q.correct + 1) % 4]}
                                                            </p>
                                                        </div>
                                                        <div className="p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
                                                            <p className="text-[10px] text-teal-400/50 uppercase font-black mb-1">Correct Answer</p>
                                                            <p className="text-xs font-bold text-teal-400">{q.options[q.correct]}</p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                                        <p className="text-[10px] text-amber-400/50 uppercase font-black mb-2 flex items-center gap-1.5">
                                                            <Target size={12} /> AI Explanation
                                                        </p>
                                                        <p className="text-xs text-white/50 leading-relaxed italic">&quot;{q.explanation}&quot;</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="pt-8 text-center pb-20">
                            <Link href="/dashboard"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-all">
                                Back to Student Dashboard <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ExamResultsPage() {
    return (
        <Suspense fallback={
            <div className="p-10 text-center text-white/40 font-medium">Loading exam results...</div>
        }>
            <ResultsInner />
        </Suspense>
    );
}
