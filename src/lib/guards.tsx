"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

const PUBLIC_PATHS = ["/", "/login", "/register", "/verify-otp"];
const B2B_ONLY_PATHS = ["/admin", "/institution"]; // B2B routes - require institution role
const GUEST_ONLY_PATHS = ["/login", "/register"];

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
      router.replace("/login");
      return;
    }

    if (isGuestOnlyPath(pathname)) {
      router.replace("/dashboard");
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
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
      router.replace("/login");
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
