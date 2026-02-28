"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic2,
  BookOpen,
  BarChart3,
  User,
  Settings,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mic2, label: "Interview", href: "/interview" },
  { icon: BookOpen, label: "Exam Practice", href: "/exam" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: User, label: "Profile", href: "/profile" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: LogOut, label: "Sign Out", href: "/" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50"
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
          AK
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">Arjun Kumar</p>
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
        {bottomItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
