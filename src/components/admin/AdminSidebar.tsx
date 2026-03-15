"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  CheckCircle2,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  canAccessPlatformMonitoring,
  canAccessLicenseManagement,
  canAccessSubscriptionManagement,
  canAccessQuestionValidation,
} from "@/lib/admin/utils/permissions";

const adminNavItems = [
  {
    icon: LayoutDashboard,
    label: "Platform Monitor",
    href: "/admin",
    permission: canAccessPlatformMonitoring,
  },
  {
    icon: Building2,
    label: "License Management",
    href: "/admin/licenses",
    permission: canAccessLicenseManagement,
  },
  {
    icon: CreditCard,
    label: "Subscriptions",
    href: "/admin/subscriptions",
    permission: canAccessSubscriptionManagement,
  },
  {
    icon: CheckCircle2,
    label: "Question Validation",
    href: "/admin/questions",
    permission: canAccessQuestionValidation,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/admin-login");
  };

  // Filter navigation items based on user role
  const visibleNavItems = adminNavItems.filter((item) =>
    user?.role ? item.permission(user.role) : false
  );

  return (
    <aside 
      id="navigation"
      className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl"
      role="navigation"
      aria-label="Admin portal navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div 
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(251,146,60,0.4)]"
          aria-hidden="true"
        >
          <BrainCircuit size={22} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none text-white">Admin Portal</p>
          <p className="text-xs font-semibold text-amber-400">Management</p>
        </div>
      </div>

      {/* Admin Info */}
      <div 
        className="mx-4 mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
        role="region"
        aria-label="Current user information"
      >
        <div 
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white"
          aria-hidden="true"
        >
          {user?.name?.substring(0, 2).toUpperCase() ?? "AD"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {user?.name ?? "Admin"}
          </p>
          <p className="truncate text-xs text-white/40">
            {user?.role === "platform_admin"
              ? "Platform Admin"
              : user?.role === "question_validator"
              ? "Question Validator"
              : user?.role === "super_admin"
              ? "Super Admin"
              : "Admin"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Main navigation">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[2px] text-white/20">
          Navigation
        </p>
        {visibleNavItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-4 focus:ring-amber-500/50",
                active
                  ? "border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-white shadow-[0_0_20px_rgba(251,146,60,0.1)]"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
              aria-current={active ? "page" : undefined}
              aria-label={`Navigate to ${label}`}
            >
              <Icon
                size={18}
                className={active ? "text-amber-400" : "text-current"}
                aria-hidden="true"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom - Logout */}
      <div className="space-y-1 border-t border-white/5 px-3 pb-6 pt-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/70 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Sign out of admin portal"
        >
          <LogOut size={18} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
