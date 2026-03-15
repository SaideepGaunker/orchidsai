"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Users, CreditCard, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/admin/shared/GlassCard";
import { LoadingSpinner } from "@/components/admin/shared/LoadingSpinner";
import { SkeletonTable } from "@/components/admin/shared/SkeletonLoader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessSubscriptionManagement } from "@/lib/admin/utils/permissions";
import {
  getB2CAccounts,
  getB2CSubscriptionPlans,
  getB2CPayments,
} from "@/lib/admin/mock/mockApi";
import { logAdminAction } from "@/lib/admin/mock/mockApi";
import type { B2CAccount, B2CSubscription, B2CSubscriptionPlan, B2CPayment } from "@/lib/admin/mock/mockData";
import { mockB2CSubscriptions } from "@/lib/admin/mock/mockData";

// Lazy load the B2CAccountTable component
const B2CAccountTable = dynamic(
  () => import("@/components/admin/subscriptions/B2CAccountTable").then((mod) => ({ default: mod.B2CAccountTable })),
  {
    loading: () => <SkeletonTable />,
    ssr: false,
  }
);

export default function SubscriptionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<B2CAccount[]>([]);
  const [subscriptions, setSubscriptions] = useState<B2CSubscription[]>([]);
  const [plans, setPlans] = useState<B2CSubscriptionPlan[]>([]);
  const [payments, setPayments] = useState<B2CPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check permissions
    if (user && !canAccessSubscriptionManagement(user.role)) {
      router.push("/unauthorized");
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Log page access
      await logAdminAction({
        adminId: "admin-001",
        adminEmail: "admin@orchids.ai",
        actionType: "auth_success",
        resourceType: "route",
        resourceId: "/admin/subscriptions",
        timestamp: new Date(),
      });

      // Load all data
      const [accountsData, plansData] = await Promise.all([
        getB2CAccounts(),
        getB2CSubscriptionPlans(),
      ]);

      // Load all payments for statistics
      const allPayments: B2CPayment[] = [];
      for (const account of accountsData) {
        const accountPayments = await getB2CPayments(account.id);
        allPayments.push(...accountPayments);
      }

      setAccounts(accountsData);
      setSubscriptions(mockB2CSubscriptions);
      setPlans(plansData);
      setPayments(allPayments);
    } catch (err) {
      console.error("Failed to load subscription data:", err);
      setError("Failed to load subscription data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountClick = (account: B2CAccount) => {
    router.push(`/admin/subscriptions/${account.id}`);
  };

  // Calculate statistics
  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter((a) => a.subscriptionStatus === "active").length;
  const proAccounts = accounts.filter((a) => a.subscriptionPlanId === plans.find((p) => p.name === "Pro")?.id).length;
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <GlassCard className="text-center max-w-md">
          <div className="text-red-500 mb-4">Error</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Retry
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
        <p className="text-gray-400">Manage B2C student accounts and subscriptions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard hover>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Accounts</div>
              <div className="text-2xl font-bold text-white">{totalAccounts}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Active Accounts</div>
              <div className="text-2xl font-bold text-white">{activeAccounts}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Pro Subscribers</div>
              <div className="text-2xl font-bold text-white">{proAccounts}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Revenue</div>
              <div className="text-2xl font-bold text-white">
                ${totalRevenue.toFixed(2)}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Account Table */}
      <B2CAccountTable
        accounts={accounts}
        subscriptions={subscriptions}
        plans={plans}
        onAccountClick={handleAccountClick}
      />
    </div>
  );
}
