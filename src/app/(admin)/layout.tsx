"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { RequireAuth } from "@/lib/guards";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RequireAuth>
            <div className="flex min-h-screen">
                <AdminSidebar />
                <main className="flex-1 ml-64 min-h-screen">
                    {children}
                </main>
            </div>
        </RequireAuth>
    );
}
