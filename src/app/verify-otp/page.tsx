"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { BrainCircuit, ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [email] = useState("arjun.kumar@email.com"); // In real flow, pass via query/state
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH).split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIdx]?.focus();
      return;
    }
    const digit = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
    const newOtp = [...otp];
    pasted.forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    // Mock verification - in real flow, call API
    if (code === "123456") {
      router.push("/dashboard");
    }
  };

  const otpComplete = otp.join("").length === OTP_LENGTH;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative">
        <div className="glass-card rounded-3xl p-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.35)" }}>
              <BrainCircuit size={18} className="text-black" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">AI Interview Coach</p>
              <p className="text-xs text-white/40">Verify your email</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Enter verification code</h1>
          <p className="text-sm text-white/40 mb-2">
            We&apos;ve sent a 6-digit code to
          </p>
          <p className="text-sm text-amber-400 mb-8 flex items-center gap-2">
            <Mail size={14} /> {email}
          </p>

          <form onSubmit={handleSubmit} onPaste={handlePaste} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 rounded-xl text-center text-lg font-bold text-white outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!otpComplete}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 20px rgba(251,146,60,0.25)" }}
            >
              Verify <ArrowRight size={15} />
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-6">
            Didn&apos;t receive the code?{" "}
            <button type="button" className="text-amber-400 hover:text-amber-300 transition-colors">
              Resend
            </button>
          </p>

          <p className="text-center text-xs text-white/25 mt-4">
            <Link href="/student-login" className="text-white/40 hover:text-white/60 transition-colors">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
