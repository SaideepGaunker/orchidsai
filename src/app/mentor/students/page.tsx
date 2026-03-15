"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Search, Filter, Plus, Download, TrendingUp, Award, Calendar } from "lucide-react";

export default function StudentBatchesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  const batches = [
    {
      id: 1,
      name: "CS Batch 2024-A",
      students: 45,
      activeStudents: 42,
      avgScore: 78.5,
      startDate: "Jan 2024",
      status: "active",
      domain: "Full Stack Development"
    },
    {
      id: 2,
      name: "Data Science Cohort",
      students: 32,
      activeStudents: 28,
      avgScore: 82.3,
      startDate: "Feb 2024",
      status: "active",
      domain: "Data Science & ML"
    },
    {
      id: 3,
      name: "DevOps Engineers 2024",
      students: 28,
      activeStudents: 25,
      avgScore: 75.8,
      startDate: "Jan 2024",
      status: "active",
      domain: "DevOps & Cloud"
    },
    {
      id: 4,
      name: "Mobile Dev Batch",
      students: 38,
      activeStudents: 35,
      avgScore: 71.2,
      startDate: "Mar 2024",
      status: "active",
      domain: "Mobile Development"
    },
    {
      id: 5,
      name: "Backend Specialists",
      students: 41,
      activeStudents: 39,
      avgScore: 85.6,
      startDate: "Feb 2024",
      status: "active",
      domain: "Backend Development"
    },
    {
      id: 6,
      name: "Frontend Masters",
      students: 35,
      activeStudents: 32,
      avgScore: 79.4,
      startDate: "Jan 2024",
      status: "active",
      domain: "Frontend Development"
    },
    {
      id: 7,
      name: "System Design 2023",
      students: 22,
      activeStudents: 18,
      avgScore: 68.9,
      startDate: "Nov 2023",
      status: "completed",
      domain: "System Design"
    },
    {
      id: 8,
      name: "AI/ML Engineers",
      students: 29,
      activeStudents: 27,
      avgScore: 88.2,
      startDate: "Mar 2024",
      status: "active",
      domain: "AI & Machine Learning"
    },
    {
      id: 9,
      name: "Cybersecurity Batch",
      students: 25,
      activeStudents: 23,
      avgScore: 76.5,
      startDate: "Feb 2024",
      status: "active",
      domain: "Cybersecurity"
    }
  ];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || batch.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Student Batches</h1>
          <p className="mt-2 text-gray-400">Manage and monitor your student cohorts</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white transition-all hover:from-emerald-600 hover:to-teal-700 hover:scale-105">
          <Plus size={18} />
          Create Batch
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-medium text-gray-400">Total Batches</p>
          <p className="mt-2 text-2xl font-bold text-white">{batches.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-medium text-gray-400">Total Students</p>
          <p className="mt-2 text-2xl font-bold text-white">{batches.reduce((sum, b) => sum + b.students, 0)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-medium text-gray-400">Active Students</p>
          <p className="mt-2 text-2xl font-bold text-emerald-400">{batches.reduce((sum, b) => sum + b.activeStudents, 0)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-xs font-medium text-gray-400">Avg Score</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {(batches.reduce((sum, b) => sum + b.avgScore, 0) / batches.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter batches by status"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all hover:bg-white/10">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBatches.map((batch) => (
          <div
            key={batch.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:bg-white/10"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{batch.name}</h3>
                <p className="mt-1 text-xs text-gray-400">{batch.domain}</p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  batch.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-500/10 text-gray-400"
                }`}
              >
                {batch.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-400">Students</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {batch.activeStudents}/{batch.students}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-400">Avg Score</span>
                </div>
                <span className="text-sm font-semibold text-emerald-400">{batch.avgScore}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-400">Started</span>
                </div>
                <span className="text-sm font-semibold text-white">{batch.startDate}</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/mentor/students/${batch.id}`)}
              className="mt-4 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
