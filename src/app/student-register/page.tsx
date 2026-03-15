"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Eye, EyeOff, ArrowRight, Mail, Lock, User, GraduationCap, Briefcase, Building2 } from "lucide-react";

const roles = [
  { id: "student", label: "Student / Graduate", icon: GraduationCap },
  { id: "professional", label: "Working Professional", icon: Briefcase },
  { id: "institution", label: "Institution / B2B", icon: Building2 },
];

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative">
        <div className="glass-card rounded-3xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.35)" }}>
              <BrainCircuit size={18} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">AI Interview Coach</p>
              <p className="text-xs text-white/40">Create your account</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={step >= s ? {
                    background: "linear-gradient(135deg,#fb923c,#f59e0b)",
                    color: "#000",
                  } : {
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.3)",
                  }}>
                  {s}
                </div>
                {s < 2 && <div className="flex-1 w-16 h-px" style={{ background: step > s ? "rgba(251,146,60,0.4)" : "rgba(255,255,255,0.08)" }} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-white/30">{step === 1 ? "Your Details" : "Choose Role"}</span>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
              <p className="text-sm text-white/40 mb-8">Start your AI-powered interview prep journey</p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="text" placeholder="Arjun Kumar"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,146,60,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block">Email address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="email" placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,146,60,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type={showPass ? "text" : "password"} placeholder="Create a strong password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,146,60,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02] mt-2"
                  style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.25)" }}>
                  Continue <ArrowRight size={15} />
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-1">What best describes you?</h1>
              <p className="text-sm text-white/40 mb-8">We&apos;ll personalize your experience accordingly</p>

              <div className="space-y-3 mb-6">
                {roles.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setSelectedRole(id)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-left transition-all"
                    style={selectedRole === id ? {
                      background: "linear-gradient(135deg, rgba(251,146,60,0.12), rgba(245,158,11,0.06))",
                      border: "1px solid rgba(251,146,60,0.25)",
                    } : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={selectedRole === id ? { background: "rgba(251,146,60,0.15)" } : { background: "rgba(255,255,255,0.05)" }}>
                      <Icon size={16} className={selectedRole === id ? "text-amber-400" : "text-white/40"} />
                    </div>
                    <span className={selectedRole === id ? "text-white" : "text-white/50"}>{label}</span>
                    {selectedRole === id && (
                      <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Link href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.25)" }}>
                Create Account <ArrowRight size={15} />
              </Link>
            </>
          )}

          <p className="text-center text-xs text-white/30 mt-6">
            Already have an account?{" "}
            <Link href="/student-login" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
