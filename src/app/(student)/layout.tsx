"use client";

import { useState } from "react";
import Sidebar from "@/components/StudentSidebar";
import { RequireAuth } from "@/lib/guards";
import { Menu, X } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-[#050510]">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-[60] glass-card border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500" />
            <span className="font-bold text-white text-sm">AI Coach</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-white/60 hover:text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={`flex-1 min-h-screen pt-16 lg:pt-0 lg:ml-64 transition-all duration-300`}>
          {children}
        </main>
      </div>
    </RequireAuth>
  );
}
