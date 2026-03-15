"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic2, BookOpen, Clock, CheckCircle2, AlertCircle, Play, Filter } from "lucide-react";

const tasks = [
  { id: 1, title: "System Design Interview", type: "Interview", topic: "Distributed Systems", due: "Jun 18, 2024", duration: "45 min", difficulty: "Advanced", status: "pending", assignedBy: "Prof. Rajesh Kumar", instructions: "Focus on scalability and fault tolerance. Use STAR format for behavioral parts." },
  { id: 2, title: "Data Structures Exam", type: "Exam", topic: "Arrays, Trees, Graphs", due: "Jun 20, 2024", duration: "60 min", difficulty: "Intermediate", status: "pending", assignedBy: "Prof. Rajesh Kumar", instructions: "Cover all topics from module 3. Time management is key." },
  { id: 3, title: "Behavioral Round", type: "Interview", topic: "HR & Behavioral", due: "Jun 15, 2024", duration: "30 min", difficulty: "Beginner", status: "completed", assignedBy: "Prof. Rajesh Kumar", instructions: "Use STAR method. Prepare 3 examples of teamwork and conflict resolution." },
  { id: 4, title: "Algorithms Assessment", type: "Exam", topic: "Sorting, DP, Greedy", due: "Jun 25, 2024", duration: "50 min", difficulty: "Advanced", status: "pending", assignedBy: "Prof. Rajesh Kumar", instructions: "Focus on time complexity analysis for each solution." },
  { id: 5, title: "Technical Mock Interview", type: "Interview", topic: "Full Stack Development", due: "Jun 22, 2024", duration: "40 min", difficulty: "Intermediate", status: "pending", assignedBy: "Prof. Rajesh Kumar", instructions: "Prepare for React, Node.js, and database design questions." },
  { id: 6, title: "OS Concepts Exam", type: "Exam", topic: "Processes, Memory, I/O", due: "Jun 12, 2024", duration: "45 min", difficulty: "Intermediate", status: "completed", assignedBy: "Prof. Rajesh Kumar", instructions: "Review scheduling algorithms and memory management." },
];

const difficultyColor: Record<string, string> = {
  Beginner: "text-teal-400",
  Intermediate: "text-amber-400",
  Advanced: "text-red-400",
};

export default function AssignedTasksPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "Interview" | "Exam">("all");

  const filtered = tasks.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter;
    const matchType = typeFilter === "all" || t.type === typeFilter;
    return matchStatus && matchType;
  });

  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Assigned Tasks</h1>
        <p className="text-sm text-white/40 mt-1">Tasks assigned by your mentor — complete them before the due date</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Tasks", value: tasks.length, color: "white" },
          { label: "Pending", value: pending, color: "text-amber-400" },
          { label: "Completed", value: completed, color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className={`text-3xl font-black ${s.color === "white" ? "text-white" : s.color}`}>{s.value}</p>
            <p className="text-xs text-white/40 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "completed"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
            style={filter === f
              ? { background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            {f}
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        {(["all", "Interview", "Exam"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setTypeFilter(f)}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={typeFilter === f
              ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {filtered.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl p-5 transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: task.status === "completed" ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={task.type === "Interview"
                    ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }
                    : { background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}
                >
                  {task.type === "Interview" ? <Mic2 size={20} className="text-emerald-400" /> : <BookOpen size={20} className="text-teal-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-bold text-white">{task.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      {task.type}
                    </span>
                    <span className={`text-xs font-semibold ${difficultyColor[task.difficulty]}`}>{task.difficulty}</span>
                  </div>
                  <p className="text-xs text-white/40 mb-2">{task.topic}</p>
                  <div className="flex items-center gap-4 text-xs text-white/30 flex-wrap">
                    <span className="flex items-center gap-1"><Clock size={11} /> {task.duration}</span>
                    <span className="flex items-center gap-1">
                      {task.status === "pending" ? <AlertCircle size={11} className="text-amber-400" /> : <CheckCircle2 size={11} className="text-emerald-400" />}
                      Due: {task.due}
                    </span>
                    <span>By: {task.assignedBy}</span>
                  </div>
                  <div
                    className="mt-3 p-3 rounded-xl text-xs text-white/50 leading-relaxed"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-white/30 font-semibold">Instructions: </span>{task.instructions}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                {task.status === "completed" ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400" style={{ background: "rgba(16,185,129,0.1)" }}>
                    <CheckCircle2 size={13} /> Completed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => router.push(task.type === "Interview" ? "/b2b-student/interview-history" : "/b2b-student/exam-history")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 12px rgba(16,185,129,0.2)" }}
                  >
                    <Play size={13} /> Start
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Filter size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No tasks found for this filter</p>
        </div>
      )}
    </div>
  );
}
