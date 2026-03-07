"use client";

import { BarChart3, FileDown } from "lucide-react";

export default function AdminAnalyticsPage() {
    return (
        <div className="p-6 lg:p-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Institution Analytics</h1>
                    <p className="text-sm text-white/40">In-depth breakdown of aggregated performance</p>
                </div>
                <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
                    style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 0 16px rgba(16,185,129,0.3)",
                    }}
                >
                    <FileDown size={16} /> Export Analysis
                </button>
            </div>

            <div className="glass-card rounded-2xl p-12 text-center border-white/5">
                <BarChart3 size={48} className="mx-auto text-emerald-500/50 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Deep Dive Analytics</h3>
                <p className="text-white/50 max-w-sm mx-auto">
                    Full organizational skill heatmaps and historic performance tracking will load here.
                </p>
            </div>
        </div>
    );
}
