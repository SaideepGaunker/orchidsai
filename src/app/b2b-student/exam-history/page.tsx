"use client";

import { useState } from "react";
import { BookOpen, Calendar, Clock, Trophy, Search } from "lucide-react";

const exams = [
  { id: "E-006", date: "Jun 12, 2024", title: "OS Concepts Exam", topic: "Processes, Memory, I/O", score: 83, total: 10, duration: "45 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "E-005", date: "Jun 1, 2024", title: "Networking Basics", topic: "TCP/IP, DNS, HTTP", score: 70, total: 10, duration: "40 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "E-004", date: "May 22, 2024", title: "DBMS Assessment", topic: "SQL, Normalization", score: 90, total: 10, duration: "50 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "E-003", date: "May 15, 2024", title: "OOP Concepts", topic: "Inheritance, Polymorphism", score: 60, total: 10, duration: "35 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
];

export default function B2BExamHistoryPage() {
  const [search, setSearch] = useState("");
  const filtered = exams.filter((e) =>
    !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Exam History</h1>
        <p className="text-sm text-white/40 mt-1">All mentor-assigned exams you've completed</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search by title or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="p-4 rounded-2xl transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <BookOpen size={20} className="text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{e.title}</p>
                  <p className="text-xs text-white/40">{e.topic} · Assigned by {e.assignedBy}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {e.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {e.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-amber-400" />
                  <span className="text-sm font-bold text-white">{e.score}%</span>
                </div>
                <span className="text-xs text-white/40">{e.score}/{e.total} correct</span>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium text-emerald-400" style={{ background: "rgba(16,185,129,0.1)" }}>
                  {e.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
