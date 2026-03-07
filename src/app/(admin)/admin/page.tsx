"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    BarChart3,
    TrendingUp,
    UserPlus,
    FileDown,
    ArrowRight,
    Search,
    ChevronRight,
    ChevronDown,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
} from "recharts";

const batchData = [
    { name: "Batch 2024–A", students: 124, avgCI: 72, growth: "+8%" },
    { name: "Batch 2024–B", students: 98, avgCI: 65, growth: "+12%" },
    { name: "Batch 2023–C", students: 112, avgCI: 58, growth: "+5%" },
];

const studentList = [
    { name: "Aarav Sharma", email: "aarav@gmail.com", sessions: 12, ci: 78, status: "Active" },
    { name: "Ananya Patel", email: "ananya.p@gmail.com", sessions: 8, ci: 64, status: "Active" },
    { name: "Ethan Hunt", email: "ethan@mi.com", sessions: 15, ci: 82, status: "Active" },
    { name: "Ishaan Gupta", email: "ishaan.g@gmail.com", sessions: 4, ci: 52, status: "Review" },
    { name: "Meera Reddy", email: "meera.r@gmail.com", sessions: 22, ci: 89, status: "Active" },
];

const skillClusters = [
    { skill: "Data Structures", avgScore: 78 },
    { skill: "System Design", avgScore: 62 },
    { skill: "Behavioral", avgScore: 84 },
    { skill: "Operating Systems", avgScore: 55 },
    { skill: "Networking", avgScore: 68 },
];

const engagementTimeline = [
    { day: "Mon", sessions: 84, active: 42 },
    { day: "Tue", sessions: 92, active: 58 },
    { day: "Wed", sessions: 120, active: 74 },
    { day: "Thu", sessions: 110, active: 68 },
    { day: "Fri", sessions: 140, active: 82 },
];

export default function AdminOverviewPage() {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleExportCSV = () => {
        alert("Exporting CSV...");
    };

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Enterprise Overview</h1>
                    <p className="text-sm text-white/40">Institution performance metrics across all students and batches</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 glass-card glass-card-hover transition-all"
                    >
                        <FileDown size={16} /> Export PDF
                    </button>
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            boxShadow: "0 0 16px rgba(16,185,129,0.3)",
                        }}
                    >
                        <UserPlus size={16} /> Invite Students
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: Users, label: "Total Students", value: "334", trend: "+12 this month", color: "text-emerald-400", bg: "rgba(16,185,129,0.1)" },
                    { icon: TrendingUp, label: "Average Batch CI", value: "68.4", trend: "Steady", color: "text-emerald-400", bg: "rgba(16,185,129,0.1)" },
                    { icon: BarChart3, label: "Total Sessions", value: "1,248", trend: "+24% week-on-week", color: "text-emerald-400", bg: "rgba(16,185,129,0.1)" },
                    { icon: Search, label: "Critical Reviews", value: "24", trend: "Requires attention", color: "text-red-400", bg: "rgba(239,68,68,0.1)" },
                ].map((s) => (
                    <div key={s.label} className="glass-card rounded-2xl p-5 border border-white/5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3`} style={{ background: s.bg }}>
                            <s.icon size={18} className={s.color} />
                        </div>
                        <p className="text-2xl font-black text-white">{s.value}</p>
                        <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-semibold">{s.label}</p>
                        <p className={`text-xs mt-2 ${s.color.includes('red') ? 'text-red-400' : 'text-emerald-400'}`}>{s.trend}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Engagement Chart */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Platform Engagement</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1.5 text-[10px] text-white/40">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" /> Total Sessions
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] text-white/40">
                                <div className="w-2 h-2 rounded-full bg-teal-500" /> Active Students
                            </span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={engagementTimeline}>
                            <defs>
                                <linearGradient id="engSessions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{ background: "rgba(10,12,24,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            />
                            <Area type="monotone" dataKey="sessions" stroke="#10b981" fill="url(#engSessions)" strokeWidth={2} />
                            <Area type="monotone" dataKey="active" stroke="#14b8a6" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Skill Clusters */}
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Performance by Skill</h3>
                    <div className="space-y-4">
                        {skillClusters.sort((a, b) => b.avgScore - a.avgScore).map((s) => (
                            <div key={s.skill}>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-white/40">{s.skill}</span>
                                    <span className={s.avgScore < 60 ? "text-red-400" : "text-emerald-400"}>{s.avgScore}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${s.avgScore < 60 ? "bg-red-500/60" : "bg-emerald-500/60"}`}
                                        style={{ width: `${s.avgScore}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Observation</p>
                        <p className="text-xs text-red-300/70 leading-relaxed">System Design and OS are currently weak areas for Batch 2024–C. Consider scheduling a review session.</p>
                    </div>
                </div>
            </div>

            {/* Student Table */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Activity</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search students..."
                                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-emerald-500/50 transition-all"
                            />
                        </div>
                        <button
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white transition-all glass-card glass-card-hover border border-white/5"
                        >
                            <FileDown size={14} /> Export CSV
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Sessions</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">Avg CI</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {studentList
                                .filter((s) => {
                                    const q = searchQuery.toLowerCase();
                                    return !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
                                })
                                .map((s, i) => (
                                    <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{s.name}</p>
                                                <p className="text-xs text-white/30">{s.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-white/60 font-mono">{s.sessions}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <div className="w-10 h-10 rounded-full border-2 border-white/5 flex items-center justify-center relative">
                                                    <span className="text-xs font-bold text-white">{s.ci}</span>
                                                    <svg className="absolute -inset-[2px] w-11 h-11 -rotate-90">
                                                        <circle cx="22" cy="22" r="20" fill="none" stroke={s.ci > 70 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'} strokeWidth="2" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - s.ci / 100)} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${s.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/students?student=${encodeURIComponent(s.name)}`}
                                                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-emerald-400 inline-flex items-center gap-1.5 text-xs font-semibold"
                                            >
                                                View Profile <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            {studentList.filter((s) => {
                                const q = searchQuery.toLowerCase();
                                return !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
                            }).length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-xs text-white/25">
                                            No students match &quot;{searchQuery}&quot;
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Basic Invite Modal Overlay */}
            {showInviteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <div className="glass-card w-full max-w-md rounded-3xl p-8 border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-white mb-2">Invite Students</h3>
                        <p className="text-sm text-white/40 mb-6">Send an email invitation or share a portal link with your students.</p>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1.5 block">Email Address</label>
                                <input type="text" placeholder="student@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1.5 block">Select Batch</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none appearance-none">
                                        <option>Batch 2024–A</option>
                                        <option>Batch 2024–B</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowInviteModal(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/40 hover:text-white transition-all glass-card glass-card-hover border border-white/5">
                                Cancel
                            </button>
                            <button onClick={() => setShowInviteModal(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                                Send Invitation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
