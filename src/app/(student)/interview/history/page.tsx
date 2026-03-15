"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mic2,
  ChevronRight,
  Calendar,
  Clock,
  BarChart2,
  Filter,
  Search,
} from "lucide-react";

const mockSessions = [
  { id: "S-012", date: "Feb 28, 2026", time: "2:30 PM", role: "Technical Interview", domain: "Software Engineering", ci: 74, duration: "22 min", status: "Completed" },
  { id: "S-011", date: "Feb 26, 2026", time: "11:15 AM", role: "HR Interview", domain: "General", ci: 68, duration: "18 min", status: "Completed" },
  { id: "S-010", date: "Feb 25, 2026", time: "4:00 PM", role: "Case Interview", domain: "Product Management", ci: 61, duration: "25 min", status: "Completed" },
  { id: "S-009", date: "Feb 23, 2026", time: "10:00 AM", role: "Technical Interview", domain: "Data Science", ci: 55, duration: "30 min", status: "Completed" },
  { id: "S-008", date: "Feb 20, 2026", time: "3:45 PM", role: "HR Interview", domain: "Leadership", ci: 72, duration: "20 min", status: "Completed" },
];

export default function InterviewHistoryPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);

  const filtered = mockSessions.filter((s) => {
    const matchSearch = !search || s.role.toLowerCase().includes(search.toLowerCase()) || s.domain.toLowerCase().includes(search.toLowerCase());
    const matchRole = !filterRole || s.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
          <Link href="/dashboard" className="hover:text-white/60 transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href="/interview" className="hover:text-white/60 transition-colors">Interview</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">History</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Interview History</h1>
        <p className="text-sm text-white/40">View and analyze your past interview sessions</p>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by role or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
        <div className="flex gap-2">
          {["Technical", "HR", "Case"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(filterRole === r ? null : r)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={filterRole === r
                ? { background: "linear-gradient(135deg,#fb923c,#f59e0b)", color: "#000" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Session list */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/reports?session=${s.id}`}
            className="block p-4 rounded-2xl glass-card glass-card-hover transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
                  <Mic2 size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{s.role}</p>
                  <p className="text-xs text-white/40">{s.domain}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/35">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {s.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {s.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <BarChart2 size={14} className="text-amber-400" />
                  <span className="text-sm font-bold text-white">CI {s.ci}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium text-teal-400"
                  style={{ background: "rgba(20,184,166,0.1)" }}>
                  {s.status}
                </span>
                <ChevronRight size={16} className="text-white/30" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <Filter size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No sessions found</p>
        </div>
      )}
    </div>
  );
}
