"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserPlus,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const mentorNavItems = [
  { icon: LayoutDashboard, label: "Mentor Overview", href: "/admin" },
  { icon: Users, label: "Student Batches", href: "/admin/students" },
  { icon: BarChart3, label: "Institution Analytics", href: "/admin/analytics" },
  { icon: UserPlus, label: "Invite Students", href: "/admin/invite" },
];

export default function MentorSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/admin-login");
  };

  return (
    <aside 
      id="navigation"
      className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl"
      role="navigation"
      aria-label="Mentor portal navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div 
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          aria-hidden="true"
        >
          <BrainCircuit size={22} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none text-white">Mentor Portal</p>
          <p className="text-xs font-semibold text-emerald-400">Institution</p>
        </div>
      </div>

      {/* Mentor Info */}
      <div 
        className="mx-4 mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
        role="region"
        aria-label="Current user information"
      >
        <div 
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-white"
          aria-hidden="true"
        >
          {user?.name?.substring(0, 2).toUpperCase() ?? "MT"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name ?? "Mentor"}
          </p>
          <p className="truncate text-xs text-gray-400">
            {user?.email ?? "mentor@orchids.ai"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {mentorNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-4 focus:ring-emerald-500/50",
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              )}
            >
              <item.icon 
                size={18} 
                className={isActive ? "text-emerald-400" : ""}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
          aria-label="Sign out of mentor portal"
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
