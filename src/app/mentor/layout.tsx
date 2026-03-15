"use client";

import MentorSidebar from "@/components/mentor/MentorSidebar";
import { SkipNavigation } from "@/components/admin/shared/SkipNavigation";
import { LiveRegionProvider } from "@/components/admin/shared/LiveRegion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-mentor users to login
    if (!isLoading && !user) {
      router.push("/mentor-login");
    } else if (
      !isLoading &&
      user &&
      user.role !== "admin" &&
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
        aria-label="Loading mentor portal"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
        <span className="sr-only">Loading mentor portal...</span>
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
        <MentorSidebar />
        <main 
          id="main-content" 
          className="ml-[280px] min-h-screen w-full min-w-[1000px] p-8"
          role="main"
          aria-label="Mentor portal main content"
        >
          {children}
        </main>
      </div>
    </LiveRegionProvider>
  );
}
