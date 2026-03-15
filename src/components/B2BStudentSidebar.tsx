"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Mic2,
  BookOpen,
  BarChart3,
  Lightbulb,
  LogOut,
  BrainCircuit,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/b2b-student/dashboard" },
  { icon: ClipboardList, label: "Assigned Tasks", href: "/b2b-student/tasks" },
  { icon: Mic2, label: "Interview History", href: "/b2b-student/interview-history" },
  { icon: BookOpen, label: "Exam History", href: "/b2b-student/exam-history" },
  { icon: BarChart3, label: "My Reports", href: "/b2b-student/reports" },
  { icon: Lightbulb, label: "Recommendations", href: "/b2b-student/recommendations" },
  { icon: User, label: "Profile", href: "/b2b-student/profile" },
];

export default function B2BStudentSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/b2b-student-login");
    onClose?.();
  };

  return (
    <>
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
          background: "rgba(5, 15, 25, 0.97)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(16,185,129,0.12)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 0 20px rgba(16,185,129,0.4)",
            }}
          >
            <BrainCircuit size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">AI Coach</p>
            <p className="text-xs font-semibold text-emerald-400">Student Portal</p>
          </div>
        </div>

        {/* User pill */}
        <div
          className="mx-4 mb-6 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {user?.name?.slice(0, 2).toUpperCase() ?? "BS"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name ?? "Student"}</p>
            <p className="text-xs text-emerald-400/70 truncate">Enrolled via Mentor</p>
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
                  active ? "text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))",
                        border: "1px solid rgba(16,185,129,0.2)",
                        boxShadow: "0 0 12px rgba(16,185,129,0.1)",
                      }
                    : {}
                }
              >
                <Icon size={18} className={active ? "text-emerald-400" : "text-current"} />
                {label}
                {active && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 6px rgba(16,185,129,0.8)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 border-t border-white/5 pt-4">
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
