"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Eye, EyeOff, ArrowRight, Mail, Lock, Building, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e] p-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-gray-950/90 p-10 backdrop-blur-xl shadow-2xl">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                        <BrainCircuit size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-3">Create Mentor Account</h1>
                    <p className="text-base text-gray-400">
                        Register your institution to get started
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Mentor Name"
                                    required
                                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-white/10 bg-white/5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/10 outline-none"
                                />
                            </div>
                        </div>

                        {/* Institution */}
                        <div className="space-y-2">
                            <label htmlFor="institution" className="text-sm font-medium text-gray-300">
                                Institution
                            </label>
                            <div className="relative">
                                <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    id="institution"
                                    type="text"
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    placeholder="University/Company"
                                    required
                                    className="w-full h-14 pl-12 pr-5 rounded-2xl border-white/10 bg-white/5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/10 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Work Email
                        </label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@college.edu"
                                required
                                className="w-full h-14 pl-12 pr-5 rounded-2xl border-white/10 bg-white/5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/10 outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full h-14 pl-12 pr-14 rounded-2xl border-2 border-amber-500/30 bg-white/5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 focus:bg-white/10 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                aria-label={showPass ? "Hide password" : "Show password"}
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 text-lg font-bold text-white shadow-[0_0_30px_rgba(251,146,60,0.4)] transition-all duration-300 hover:from-amber-600 hover:to-orange-700 hover:shadow-[0_0_40px_rgba(251,146,60,0.6)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Register Admin
                                <ArrowRight size={20} />
                            </>
                        )}
                    </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 space-y-3 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an admin account?{" "}
                        <Link
                            href="/admin-login"
                            className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                    <div className="pt-3 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Are you a mentor?{" "}
                            <Link
                                href="/mentor-register"
                                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                            >
                                Mentor Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
