"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { SkipNavigation } from "@/components/admin/shared/SkipNavigation";
import { LiveRegionProvider } from "@/components/admin/shared/LiveRegion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-admin users to login
    if (!isLoading && !user) {
      router.push("/admin-login");
    } else if (
      !isLoading &&
      user &&
      user.role !== "platform_admin" &&
      user.role !== "question_validator" &&
      user.role !== "super_admin"
    ) {
      router.push("/unauthorized");
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div 
        className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e]"
        role="status"
        aria-live="polite"
        aria-label="Loading admin portal"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
        <span className="sr-only">Loading admin portal...</span>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  return (
    <LiveRegionProvider>
      <SkipNavigation />
      <div className="flex min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1f2e]">
        <AdminSidebar />
        <main 
          id="main-content" 
          className="ml-[280px] min-h-screen w-full min-w-[1000px] p-8"
          role="main"
          aria-label="Admin portal main content"
        >
          {children}
        </main>
      </div>
    </LiveRegionProvider>
  );
}
