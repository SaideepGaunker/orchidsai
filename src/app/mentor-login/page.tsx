"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BrainCircuit, AlertCircle } from "lucide-react";

export default function MentorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Clear any existing auth on mount
  useEffect(() => {
    logout();
  }, [logout]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/mentor");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.replace("/mentor");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e] p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-gray-950/90 p-10 backdrop-blur-xl shadow-2xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
            <BrainCircuit size={40} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">Mentor Portal</h1>
          <p className="text-base text-gray-400">
            Access for educational institutions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </Label>
            <input
              id="email"
              type="email"
              placeholder="mentor@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white/10 outline-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </Label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-14 rounded-2xl border-2 border-emerald-500/30 bg-white/5 px-5 text-base text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-white/10 outline-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-lg font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Mock credentials hint */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-sm font-medium text-gray-400">Mock Mentor Accounts:</p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>• <span className="text-gray-400">mentor@college.edu</span> (Mentor)</p>
            <p>• <span className="text-gray-400">admin@institution.edu</span> (Mentor)</p>
            <p className="text-xs text-gray-600 mt-3">Use any password to login</p>
          </div>
        </div>
      </div>
    </div>
  );
}
