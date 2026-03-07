"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Eye, EyeOff, ArrowRight, Mail, Lock, Building, MapPin, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminRegisterPage() {
    const router = useRouter();
    const { login, isAuthenticated, isLoading } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration logic, then log in
        const ok = await login(email, password);
        if (ok) router.push("/admin");
    };

    if (isAuthenticated) {
        router.replace("/admin");
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-grid">
            {/* Glow */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="w-full max-w-lg relative">
                {/* Card */}
                <div
                    className="glass-card rounded-3xl p-8 lg:p-10"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg,#10b981,#059669)",
                                    boxShadow: "0 0 20px rgba(16,185,129,0.35)",
                                }}
                            >
                                <BrainCircuit size={18} className="text-black" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white leading-none">
                                    AI Interview Coach
                                </p>
                                <p className="text-xs text-emerald-400">Enterprise Registration</p>
                            </div>
                        </div>
                        <ShieldCheck size={28} className="text-emerald-400 opacity-20" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-1">
                        Get Started with B2B
                    </h1>
                    <p className="text-sm text-white/40 mb-8">
                        Create an admin account to manage your institution's batches.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Admin Name"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                    />
                                </div>
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="text-xs font-medium text-white/50 mb-1.5 block">
                                    Institution Name
                                </label>
                                <div className="relative">
                                    <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        value={institution}
                                        onChange={(e) => setInstitution(e.target.value)}
                                        placeholder="University/Company"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                        onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-medium text-white/50 mb-1.5 block">
                                Work Email
                            </label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@college.edu"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-medium text-white/50 mb-1.5 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.4)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02] mt-4 disabled:opacity-70"
                            style={{
                                background: "linear-gradient(135deg,#10b981,#059669)",
                                boxShadow: "0 0 20px rgba(16,185,129,0.25)",
                            }}
                        >
                            {isLoading ? "Creating Account..." : "Register Institution"}{" "}
                            <ArrowRight size={15} />
                        </button>
                    </form>

                    <p className="text-center text-xs text-white/30 mt-6">
                        Already have an institutional account?{" "}
                        <Link
                            href="/admin-login"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                    <p className="text-center text-xs text-white/30 mt-3 pt-3 border-t border-white/10">
                        Are you a student?{" "}
                        <Link
                            href="/register"
                            className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                        >
                            Normal Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
