"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Calendar, Award, TrendingUp, Activity } from "lucide-react";

export default function BatchDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.id;

  // Mock batch data
  const batches: Record<string, any> = {
    "1": {
      name: "CS Batch 2024-A",
      domain: "Full Stack Development",
      students: 45,
      activeStudents: 42,
      avgScore: 78.5,
      startDate: "Jan 2024",
      status: "active",
      students_list: [
        { id: 1, name: "Anand Sharma", email: "anand@example.com", avgCI: 98, sessions: 12, status: "active" },
        { id: 2, name: "Ananya Nate", email: "ananya@example.com", avgCI: 94, sessions: 10, status: "active" },
        { id: 3, name: "Ethan Hunt", email: "ethan@example.com", avgCI: 92, sessions: 11, status: "active" },
        { id: 4, name: "Prachi Gupta", email: "prachi@example.com", avgCI: 52, sessions: 5, status: "inactive" },
        { id: 5, name: "Neha Reddy", email: "neha@example.com", avgCI: 88, sessions: 9, status: "active" },
      ]
    },
    "2": {
      name: "Data Science Cohort",
      domain: "Data Science & ML",
      students: 32,
      activeStudents: 28,
      avgScore: 82.3,
      startDate: "Feb 2024",
      status: "active",
      students_list: [
        { id: 6, name: "Rahul Sharma", email: "rahul@example.com", avgCI: 85, sessions: 8, status: "active" },
        { id: 7, name: "Priya Patel", email: "priya@example.com", avgCI: 90, sessions: 10, status: "active" },
      ]
    }
  };

  const batch = batches[batchId as string] || batches["1"];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Batches
      </button>

      {/* Batch Header */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{batch.name}</h1>
            <p className="mt-1 text-sm text-gray-400">{batch.domain}</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
            {batch.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Total Students</p>
            <p className="mt-1 text-2xl font-bold text-white">{batch.students}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Students</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">{batch.activeStudents}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg Score</p>
            <p className="mt-1 text-2xl font-bold text-white">{batch.avgScore}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Started</p>
            <p className="mt-1 text-2xl font-bold text-white">{batch.startDate}</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <h2 className="mb-4 text-lg font-bold text-white">Students in this Batch</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="pb-3">Student</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Avg CI</th>
                <th className="pb-3">Sessions</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batch.students_list.map((student: any) => (
                <tr
                  key={student.id}
                  className="border-b border-white/5 text-sm transition-colors hover:bg-white/5"
                >
                  <td className="py-4 font-medium text-white">{student.name}</td>
                  <td className="py-4 text-gray-400">{student.email}</td>
                  <td className="py-4 font-semibold text-emerald-400">{student.avgCI}</td>
                  <td className="py-4 text-gray-400">{student.sessions}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => router.push(`/mentor/profile/${student.id}`)}
                      className="text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
