"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Clear any existing auth data
    logout();
  }, [logout]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e] px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <ShieldAlert size={40} className="text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8">
          You don't have permission to access this page. Please log in with the appropriate credentials.
        </p>

        <div className="space-y-3">
          <Link
            href="/admin-login"
            className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white transition-all hover:from-emerald-600 hover:to-teal-700"
          >
            Mentor Login
          </Link>
          
          <Link
            href="/platform-admin-login"
            className="block w-full rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:from-purple-600 hover:to-violet-700"
          >
            Platform Admin Login
          </Link>

          <Link
            href="/student-login"
            className="block w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
          >
            Student Login
          </Link>

          <Link
            href="/"
            className="block text-sm text-gray-400 hover:text-white transition-colors mt-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
