"use client";

import { useState } from "react";
import B2BStudentSidebar from "@/components/B2BStudentSidebar";
import { useRequireAuth } from "@/lib/guards";
import { Menu, X } from "lucide-react";

export default function B2BStudentLayout({ children }: { children: React.ReactNode }) {
  useRequireAuth(["b2b_student"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "#050f19" }}>
      {/* Mobile Header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-[60]"
        style={{ background: "rgba(5,15,25,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(16,185,129,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }} />
          <span className="font-bold text-white text-sm">AI Coach</span>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white/60 hover:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <B2BStudentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 lg:ml-64 transition-all duration-300 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
