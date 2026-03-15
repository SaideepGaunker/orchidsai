"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200)); // Simulated request
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-grid">
            {/* Glow */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="w-full max-w-md relative">
                <div
                    className="glass-card rounded-3xl p-8"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                                boxShadow: "0 0 20px rgba(251,146,60,0.35)",
                            }}
                        >
                            <BrainCircuit size={18} className="text-black" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-none">
                                AI Interview Coach
                            </p>
                            <p className="text-xs text-white/40">Account recovery</p>
                        </div>
                    </div>

                    {!submitted ? (
                        <>
                            <h1 className="text-2xl font-bold text-white mb-1">
                                Forgot your password?
                            </h1>
                            <p className="text-sm text-white/40 mb-8">
                                Enter your email and we&apos;ll send you a reset link.
                            </p>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="text-xs font-medium text-white/50 mb-1.5 block">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail
                                            size={15}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                        />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                            }}
                                            onFocus={(e) =>
                                                (e.target.style.borderColor = "rgba(251,146,60,0.4)")
                                            }
                                            onBlur={(e) =>
                                            (e.target.style.borderColor =
                                                "rgba(255,255,255,0.08)")
                                            }
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02] mt-2 disabled:opacity-70"
                                    style={{
                                        background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                                        boxShadow: "0 0 20px rgba(251,146,60,0.25)",
                                    }}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                    {!loading && <ArrowRight size={15} />}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{
                                    background: "rgba(20,184,166,0.12)",
                                    border: "1px solid rgba(20,184,166,0.25)",
                                }}
                            >
                                <CheckCircle2 size={28} className="text-teal-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">
                                Check your inbox
                            </h2>
                            <p className="text-sm text-white/40 leading-relaxed mb-6">
                                We&apos;ve sent a password reset link to{" "}
                                <span className="text-amber-400">{email}</span>. It expires in
                                15 minutes.
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false);
                                    setEmail("");
                                }}
                                className="text-xs text-white/40 hover:text-white/60 transition-colors"
                            >
                                Didn&apos;t receive it? Try again
                            </button>
                        </div>
                    )}

                    <p className="text-center text-xs text-white/30 mt-6">
                        Remember your password?{" "}
                        <Link
                            href="/student-login"
                            className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
