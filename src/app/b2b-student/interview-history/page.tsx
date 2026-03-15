"use client";

import { useState } from "react";
import { Mic2, Calendar, Clock, BarChart2, ChevronRight, Search } from "lucide-react";

const sessions = [
  { id: "S-012", date: "Jun 10, 2024", time: "2:30 PM", title: "Behavioral Round", topic: "HR & Behavioral", ci: 80, duration: "30 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "S-011", date: "Jun 5, 2024", time: "11:00 AM", title: "Technical Mock", topic: "Data Structures", ci: 74, duration: "45 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "S-010", date: "May 28, 2024", time: "3:00 PM", title: "Case Interview", topic: "Product Management", ci: 68, duration: "40 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
  { id: "S-009", date: "May 20, 2024", time: "10:00 AM", title: "System Design", topic: "Distributed Systems", ci: 62, duration: "50 min", status: "Completed", assignedBy: "Prof. Rajesh Kumar" },
];

export default function B2BInterviewHistoryPage() {
  const [search, setSearch] = useState("");
  const filtered = sessions.filter((s) =>
    !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Interview History</h1>
        <p className="text-sm text-white/40 mt-1">All mentor-assigned interview sessions you've completed</p>
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
        {filtered.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-2xl transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <Mic2 size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-xs text-white/40">{s.topic} · Assigned by {s.assignedBy}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {s.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {s.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <BarChart2 size={14} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white">CI {s.ci}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium text-emerald-400" style={{ background: "rgba(16,185,129,0.1)" }}>
                  {s.status}
                </span>
                <ChevronRight size={16} className="text-white/30" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-white/40">No sessions found</p>
        </div>
      )}
    </div>
  );
}
