"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type UserRole = "student" | "professional" | "institution" | "admin" | "platform_admin" | "question_validator" | "super_admin" | "b2b_student";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "auth_jwt";
const USER_STORAGE_KEY = "auth_user";

const mockUser: User = {
  id: "u-1",
  email: "arjun.kumar@email.com",
  name: "Arjun Kumar",
  role: "student",
};

const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1LTEiLCJlbWFpbCI6ImFyanVuLmt1bWFyQGVtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50In0.mock";
const AUTH_COOKIE = "auth_token";

function setAuthCookie(token: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${AUTH_COOKIE}=${token};path=/;max-age=604800;SameSite=Lax`;
  }
}

function clearAuthCookie() {
  if (typeof document !== "undefined") {
    document.cookie = `${AUTH_COOKIE}=;path=/;max-age=0`;
  }
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithToken: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
    const userStr = typeof window !== "undefined" ? localStorage.getItem(USER_STORAGE_KEY) : null;
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setAuthCookie(token);
        setState({ user, token, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
        clearAuthCookie();
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState((s) => ({ ...s, isLoading: true }));
    await new Promise((r) => setTimeout(r, 500));
    
    // Determine role based on email
    let role: UserRole = "student";
    let name = "User";
    
    // Platform admin roles
    if (email === "admin@orchids.ai") {
      role = "platform_admin";
      name = "Platform Admin";
    } else if (email === "validator@orchids.ai") {
      role = "question_validator";
      name = "Question Validator";
    } else if (email === "superadmin@orchids.ai") {
      role = "super_admin";
      name = "Super Admin";
    } 
    // Mentor/Institution roles
    else if (email.includes("mentor") || email.includes("institution")) {
      role = "admin";
      name = "Mentor";
    }
    // B2B Student (enrolled via institution/mentor)
    else if (email.includes("b2bstudent") || email.includes("b2b.student")) {
      role = "b2b_student";
      name = "B2B Student";
    } 
    // Other roles
    else if (email.includes("professional")) {
      role = "professional";
      name = "Professional User";
    }
    
    const user: User = { 
      id: "u-" + Math.random().toString(36).substr(2, 9),
      email, 
      name,
      role 
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, mockToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setAuthCookie(mockToken);
    setState({ user, token: mockToken, isAuthenticated: true, isLoading: false });
    
    return true;
  }, []);

  const loginWithToken = useCallback((token: string, user: User) => {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setAuthCookie(token);
    setState({ user, token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    clearAuthCookie();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  const setUser = useCallback((user: User) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setState((s) => (s.user ? { ...s, user } : s));
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    loginWithToken,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
