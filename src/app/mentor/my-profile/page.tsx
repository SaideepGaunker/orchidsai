"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Mail, Building2, GraduationCap, Calendar, Edit2, Users,
  BarChart3, Award, TrendingUp, CheckCircle2, BookOpen,
  Star, Activity, Target, Clock,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const engagementTrend = [
  { month: "Jan", students: 28 }, { month: "Feb", students: 34 },
  { month: "Mar", students: 38 }, { month: "Apr", students: 42 },
  { month: "May", students: 48 }, { month: "Jun", students: 54 },
];

const batchPerformance = [
  { batch: "CS-A", avg: 82 }, { batch: "CS-B", avg: 74 },
  { batch: "DS-A", avg: 78 }, { batch: "DevOps", avg: 68 },
  { batch: "Mobile", avg: 71 },
];

const batches = [
  { name: "CS Batch 2024-A", students: 42, avgCI: 82, status: "Active" },
  { name: "Data Science Cohort", students: 38, avgCI: 78, status: "Active" },
  { name: "DevOps Engineers", students: 24, avgCI: 68, status: "Active" },
  { name: "Mobile Dev Batch", students: 31, avgCI: 71, status: "Active" },
  { name: "CS Batch 2023-B", students: 45, avgCI: 85, status: "Completed" },
];

const achievements = [
  { label: "Top Mentor Q1", icon: "🏆", date: "Mar 2024", desc: "Highest batch avg CI across platform" },
  { label: "100 Students Milestone", icon: "🎯", date: "Feb 2024", desc: "Mentored 100+ enrolled students" },
  { label: "5-Star Rating", icon: "⭐", date: "Apr 2024", desc: "Avg student satisfaction 4.9/5" },
  { label: "Perfect Retention", icon: "🚀", date: "May 2024", desc: "0% dropout rate in CS Batch 2024-A" },
  { label: "Best Improvement", icon: "📈", date: "Jun 2024", desc: "Batch avg CI improved by 28 pts" },
  { label: "Content Creator", icon: "📚", date: "Jan 2024", desc: "Assigned 200+ tasks to students" },
];

const recentActivity = [
  { action: "Assigned System Design interview to Anand Sharma", time: "2h ago", type: "task" },
  { action: "Reviewed Ananya Nate's exam report", time: "5h ago", type: "review" },
  { action: "Invited 3 new students to CS Batch 2024-A", time: "1d ago", type: "invite" },
  { action: "Exported performance report for DevOps batch", time: "2d ago", type: "report" },
  { action: "Updated recommendations for Prachi Gupta", time: "3d ago", type: "recommendation" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs border border-emerald-500/20" style={{ background: "rgba(10,10,15,0.95)" }}>
        <p className="text-white/50">{label}</p>
        <p className="text-emerald-400 font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function MentorProfilePage() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Your mentor profile, batch overview and activity</p>
        </div>
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Edit2 size={14} /> {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Hero Card */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar + basic info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-emerald-500/20">
                {user?.name?.slice(0, 2).toUpperCase() ?? "MT"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle2 size={13} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name ?? "Mentor"}</h2>
              <p className="text-emerald-400 text-sm font-semibold mt-0.5">Senior Mentor · Institution</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><Mail size={12} />{user?.email ?? "mentor@orchids.ai"}</span>
                <span className="flex items-center gap-1.5"><Building2 size={12} />IIT Delhi</span>
                <span className="flex items-center gap-1.5"><GraduationCap size={12} />Computer Science Dept.</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} />Joined Jan 2023</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} className={s <= 5 ? "text-amber-400 fill-amber-400" : "text-white/20"} />
                ))}
                <span className="text-xs text-white/40 ml-1">4.9 / 5 · 128 reviews</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="md:ml-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Students", value: "334", icon: Users, color: "emerald" },
              { label: "Active Batches", value: "4", icon: BookOpen, color: "teal" },
              { label: "Avg Batch CI", value: "76", icon: Target, color: "emerald" },
              { label: "Sessions Assigned", value: "1,248", icon: Activity, color: "teal" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <Icon size={16} className={`mx-auto mb-2 text-${color}-400`} />
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-5 pt-5 border-t border-white/5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Bio</p>
          <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
            Senior faculty member at IIT Delhi with 8+ years of experience in computer science education. 
            Specializing in interview preparation, system design, and data structures. 
            Passionate about bridging the gap between academic learning and industry readiness through AI-powered coaching.
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Student Growth Trend */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Student Enrollment Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly active students</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10">
              <TrendingUp size={11} /> +93%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={engagementTrend}>
              <defs>
                <linearGradient id="mentorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} fill="url(#mentorGrad)" dot={{ fill: "#10b981", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Batch Performance */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Avg CI by Batch</h3>
            <p className="text-xs text-gray-500 mt-0.5">Current semester performance</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={batchPerformance} barSize={28}>
              <XAxis dataKey="batch" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Batches + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Batches */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={15} className="text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">My Batches</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="pb-3">Batch</th>
                  <th className="pb-3">Students</th>
                  <th className="pb-3">Avg CI</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr key={b.name} className="border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
                    <td className="py-3 font-medium text-white">{b.name}</td>
                    <td className="py-3 text-gray-400">{b.students}</td>
                    <td className="py-3">
                      <span className={b.avgCI >= 80 ? "text-emerald-400 font-semibold" : b.avgCI >= 70 ? "text-teal-400 font-semibold" : "text-amber-400 font-semibold"}>
                        {b.avgCI}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${b.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-gray-400"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={15} className="text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.6)" }} />
                <div>
                  <p className="text-xs text-gray-300 leading-relaxed">{a.action}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <Award size={15} className="text-emerald-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Achievements</h3>
          <span className="ml-auto text-xs text-gray-500">{achievements.length} earned</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div key={a.label} className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all">
              <span className="text-2xl flex-shrink-0">{a.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{a.label}</p>
                <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                <p className="text-xs text-gray-600 mt-0.5">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
