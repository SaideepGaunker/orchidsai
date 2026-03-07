"use client";

import { Mail, Shield } from "lucide-react";

export default function AdminInvitePage() {
    return (
        <div className="p-6 lg:p-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Invite Access</h1>
                    <p className="text-sm text-white/40">Securely onboard students and faculty</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-12 text-center border-white/5 max-w-2xl mx-auto mt-12">
                <div className="flex justify-center mb-6 relative">
                    <Mail size={48} className="text-emerald-500/50 absolute -translate-x-4 -translate-y-2 opacity-50" />
                    <Shield size={56} className="text-teal-400 z-10 drop-shadow-lg" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Invite Management Module</h3>
                <p className="text-white/50 mb-8 max-w-sm mx-auto">
                    Generate secure sign-up links or upload CSV rosters to grant access under your institution's licensing.
                </p>

                <button
                    className="flex items-center justify-center gap-2 px-8 py-3.5 mx-auto rounded-xl font-semibold text-black transition-all hover:scale-105"
                    style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 0 20px rgba(16,185,129,0.3)",
                    }}
                >
                    Setup Identity Provider
                </button>
            </div>
        </div>
    );
}
