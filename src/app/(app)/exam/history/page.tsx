"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Calendar,
  Clock,
  Trophy,
  Filter,
  Search,
} from "lucide-react";

const mockExams = [
  { id: "E-008", date: "Feb 28, 2026", topic: "Software Engineering", difficulty: "Intermediate", score: 83, total: 6, duration: "8 min", status: "Completed" },
  { id: "E-007", date: "Feb 25, 2026", topic: "Data Structures & Algorithms", difficulty: "Intermediate", score: 67, total: 6, duration: "10 min", status: "Completed" },
  { id: "E-006", date: "Feb 22, 2026", topic: "System Design", difficulty: "Advanced", score: 50, total: 6, duration: "12 min", status: "Completed" },
  { id: "E-005", date: "Feb 18, 2026", topic: "Software Engineering", difficulty: "Beginner", score: 100, total: 6, duration: "6 min", status: "Completed" },
  { id: "E-004", date: "Feb 15, 2026", topic: "Operating Systems", difficulty: "Intermediate", score: 67, total: 6, duration: "9 min", status: "Completed" },
];

export default function ExamHistoryPage() {
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState<string | null>(null);

  const topics = [...new Set(mockExams.map((e) => e.topic))];

  const filtered = mockExams.filter((e) => {
    const matchSearch = !search || e.topic.toLowerCase().includes(search.toLowerCase());
    const matchTopic = !filterTopic || e.topic === filterTopic;
    return matchSearch && matchTopic;
  });

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
          <Link href="/dashboard" className="hover:text-white/60 transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href="/exam" className="hover:text-white/60 transition-colors">Exam Practice</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">History</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Exam History</h1>
        <p className="text-sm text-white/40">View your past exam attempts and scores</p>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTopic(filterTopic === t ? null : t)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={filterTopic === t
                ? { background: "linear-gradient(135deg,#fb923c,#f59e0b)", color: "#000" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Exam list */}
      <div className="space-y-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="block p-4 rounded-2xl glass-card glass-card-hover transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <BookOpen size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{e.topic}</p>
                  <p className="text-xs text-white/40">{e.difficulty}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/35">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {e.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {e.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-amber-400" />
                  <span className="text-sm font-bold text-white">{e.score}%</span>
                </div>
                <span className="text-xs text-white/40">{e.score}/{e.total} correct</span>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium text-teal-400"
                  style={{ background: "rgba(20,184,166,0.1)" }}>
                  {e.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <Filter size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No exam attempts found</p>
        </div>
      )}
    </div>
  );
}
