"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    LogOut,
    BrainCircuit,
    UserPlus,
    FileDown,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
    { icon: LayoutDashboard, label: "Mentor Overview", href: "/admin" },
    { icon: Users, label: "Student Batches", href: "/admin/students" },
    { icon: BarChart3, label: "Institution Analytics", href: "/admin/analytics" },
    { icon: UserPlus, label: "Invite Students", href: "/admin/invite" },
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
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        boxShadow: "0 0 20px rgba(16,185,129,0.4)",
                    }}
                >
                    <BrainCircuit size={20} className="text-black" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-none">Mentor Portal</p>
                    <p className="text-xs font-semibold text-emerald-400">Institution</p>
                </div>
            </div>

            {/* Mentor Info */}
            <div className="mx-4 mb-6 p-3 rounded-xl glass-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-black flex-shrink-0">
                    AD
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user?.name ?? "Admin"}</p>
                    <p className="text-xs text-white/40 truncate">Enterprise Plan</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[2px] px-3 mb-2">Management</p>
                {adminNavItems.map(({ icon: Icon, label, href }) => {
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
                                            "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))",
                                        border: "1px solid rgba(16,185,129,0.2)",
                                        boxShadow: "0 0 12px rgba(16,185,129,0.1)",
                                    }
                                    : {}
                            }
                        >
                            <Icon
                                size={18}
                                className={active ? "text-emerald-400" : "text-current"}
                            />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 pb-6 space-y-1 border-t border-white/5 pt-4">
                <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200">
                    <Settings size={18} />
                    Portal Settings
                </Link>
                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 text-left">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
