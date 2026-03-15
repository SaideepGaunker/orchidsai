"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BrainCircuit, AlertCircle, Shield } from "lucide-react";
import { SecureInput } from "@/components/admin/shared/SecureInput";
import { SecureForm } from "@/components/admin/shared/SecureForm";
import { loginRateLimiter, validateEmail } from "@/lib/admin/utils/security";
import { adminToast } from "@/lib/admin/utils/toast";

export default function PlatformAdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Clear any existing auth on mount
  useEffect(() => {
    logout();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/platform-admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent, csrfToken: string) => {
    e.preventDefault();
    setError("");

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check login rate limit
    if (!loginRateLimiter(email)) {
      setError("Too many login attempts. Please try again later.");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        adminToast.success("Login successful");
        // Small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        // Use window.location for a full page navigation to ensure auth state is loaded
        window.location.href = "/platform-admin";
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Platform Admin</h1>
          <p className="mt-2 text-sm text-gray-400">
            System administration access
          </p>
        </div>

        <SecureForm
          onSecureSubmit={handleSubmit}
          rateLimitKey={`platform-admin-login-${email}`}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </Label>
            <SecureInput
              id="email"
              type="email"
              placeholder="admin@orchids.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sanitize={true}
              validate={false}
              className="rounded-xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </Label>
            <SecureInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sanitize={false}
              validate={false}
              className="rounded-xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:from-purple-600 hover:to-violet-700 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </SecureForm>

        {/* Mock credentials hint */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="mb-2 text-xs font-medium text-gray-400">Platform Admin Accounts:</p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>• admin@orchids.ai (Platform Admin)</p>
            <p>• validator@orchids.ai (Question Validator)</p>
            <p>• superadmin@orchids.ai (Super Admin)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
