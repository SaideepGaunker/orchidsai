"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mic2,
  BookOpen,
  BarChart3,
  User,
  Settings,
  LogOut,
  BrainCircuit,
  History,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mic2, label: "Interview", href: "/interview" },
  { icon: History, label: "Interview History", href: "/interview/history" },
  { icon: BookOpen, label: "Exam Practice", href: "/exam" },
  { icon: History, label: "Exam History", href: "/exam/history" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Lightbulb, label: "Recommendations", href: "/recommendations" },
  { icon: User, label: "Profile", href: "/profile" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/student-login");
    onClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "rgba(10, 12, 24, 0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #fb923c, #f59e0b)",
              boxShadow: "0 0 20px rgba(251,146,60,0.4)",
            }}
          >
            <BrainCircuit size={20} className="text-black" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">AI Interview</p>
            <p className="text-xs font-semibold text-gradient-amber">Coach</p>
          </div>
        </div>

        {/* User pill */}
        <div className="mx-4 mb-6 p-3 rounded-xl glass-card flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black flex-shrink-0">
            {user?.name?.slice(0, 2).toUpperCase() ?? "AK"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name ?? "Guest"}</p>
            <p className="text-xs text-white/40 truncate">Free Plan</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => onClose?.()}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
                style={
                  active
                    ? {
                      background:
                        "linear-gradient(135deg, rgba(251,146,60,0.15), rgba(245,158,11,0.08))",
                      border: "1px solid rgba(251,146,60,0.2)",
                      boxShadow: "0 0 12px rgba(251,146,60,0.1)",
                    }
                    : {}
                }
              >
                <Icon
                  size={18}
                  className={active ? "text-amber-400" : "text-current"}
                />
                {label}
                {active && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
                    style={{ boxShadow: "0 0 6px rgba(251,146,60,0.8)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 space-y-1 border-t border-white/5 pt-4">
          <Link
            href="/settings"
            onClick={() => onClose?.()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 text-left"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
