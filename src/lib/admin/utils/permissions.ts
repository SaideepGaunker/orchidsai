// Permission utilities for role-based access control

import type { UserRole } from "@/contexts/AuthContext";

export function canAccessPlatformMonitoring(role?: UserRole): boolean {
  return role === "platform_admin" || role === "super_admin" || role === "admin";
}

export function canAccessLicenseManagement(role?: UserRole): boolean {
  return role === "platform_admin" || role === "super_admin" || role === "admin";
}

export function canAccessSubscriptionManagement(role?: UserRole): boolean {
  return role === "platform_admin" || role === "super_admin" || role === "admin";
}

export function canAccessQuestionValidation(role?: UserRole): boolean {
  return role === "question_validator" || role === "super_admin" || role === "admin";
}
