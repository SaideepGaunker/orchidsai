"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

const PUBLIC_PATHS = ["/", "/student-login", "/student-register", "/verify-otp", "/admin-login", "/admin-register", "/mentor-login", "/mentor-register", "/platform-admin-login", "/b2b-student-login"];
const B2B_ONLY_PATHS = ["/admin", "/institution"];
const GUEST_ONLY_PATHS = ["/student-login", "/student-register"];

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

function isB2BPath(path: string) {
  return B2B_ONLY_PATHS.some((p) => path.startsWith(p));
}

function isGuestOnlyPath(path: string) {
  return GUEST_ONLY_PATHS.some((p) => path === p || path.startsWith(p));
}

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (isPublicPath(pathname)) return;

    if (!isAuthenticated || !user) {
      // Redirect to appropriate login based on path
      if (pathname.startsWith("/b2b-student")) {
        router.replace("/b2b-student-login");
      } else if (pathname.startsWith("/mentor")) {
        router.replace("/mentor-login");
      } else if (pathname.startsWith("/admin")) {
        router.replace("/admin-login");
      } else {
        router.replace("/student-login");
      }
      return;
    }

    if (isGuestOnlyPath(pathname)) {
      router.replace("/dashboard");
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to the correct portal based on role
      if (user.role === "b2b_student") {
        router.replace("/b2b-student/dashboard");
      } else if (user.role === "admin") {
        router.replace("/mentor/dashboard");
      } else if (["platform_admin", "question_validator", "super_admin"].includes(user.role)) {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, pathname, router, allowedRoles]);
}

export function useRequireB2B() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isB2BPath(pathname)) return;
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/student-login");
      return;
    }

    if (user?.role !== "institution" && user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [pathname, isAuthenticated, isLoading, user, router]);
}

export function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: UserRole[] }) {
  useRequireAuth(allowedRoles);
  return <>{children}</>;
}

export function RequireGuest({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && isAuthenticated && isGuestOnlyPath(pathname)) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return <>{children}</>;
}