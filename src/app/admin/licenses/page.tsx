"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type B2BAccount } from "@/lib/admin/mock/mockData";
import { logAdminAction } from "@/lib/admin/utils/logging";
import { SkeletonTable, SkeletonCardGrid } from "@/components/admin/shared/SkeletonLoader";

// Lazy load heavy components for better performance
const B2BAccountTable = dynamic(
  () => import("@/components/admin/licenses/B2BAccountTable"),
  {
    loading: () => <SkeletonTable />,
    ssr: false,
  }
);

const AccountDetailModal = dynamic(
  () => import("@/components/admin/licenses/AccountDetailModal").then((mod) => ({ default: mod.AccountDetailModal })),
  {
    loading: () => null,
    ssr: false,
  }
);

const SubscriptionPlanManager = dynamic(
  () => import("@/components/admin/licenses/SubscriptionPlanManager"),
  {
    loading: () => <SkeletonCardGrid count={3} />,
    ssr: false,
  }
);

const PaymentTracker = dynamic(
  () => import("@/components/admin/licenses/PaymentTracker"),
  {
    loading: () => <SkeletonTable />,
    ssr: false,
  }
);

const RenewalManager = dynamic(
  () => import("@/components/admin/licenses/RenewalManager"),
  {
    loading: () => <SkeletonTable />,
    ssr: false,
  }
);

export default function LicensesPage() {
  const { user } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<B2BAccount | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // Log page access
    if (user) {
      logAdminAction({
        actionType: "auth_success",
        resourceType: "page",
        resourceId: "/admin/licenses",
        details: JSON.stringify({ page: "License Management" }),
      });
    }
  }, [user]);

  const handleAccountSelect = (account: B2BAccount) => {
    setSelectedAccount(account);
    setIsDetailModalOpen(true);
  };

  const handleAccountUpdate = (updatedAccount: B2BAccount) => {
    // In a real app, this would update the backend
    // For now, the modal handles local state updates
    setSelectedAccount(updatedAccount);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">License Management</h1>
        <p className="mt-2 text-gray-400">Manage B2B institutional accounts and subscriptions</p>
      </div>

      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger 
            value="accounts"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10 data-[state=active]:text-white data-[state=active]:border-l-4 data-[state=active]:border-amber-500"
          >
            Accounts
          </TabsTrigger>
          <TabsTrigger 
            value="plans"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10 data-[state=active]:text-white data-[state=active]:border-l-4 data-[state=active]:border-amber-500"
          >
            Plans
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10 data-[state=active]:text-white data-[state=active]:border-l-4 data-[state=active]:border-amber-500"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger 
            value="renewals"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10 data-[state=active]:text-white data-[state=active]:border-l-4 data-[state=active]:border-amber-500"
          >
            Renewals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          <B2BAccountTable onAccountSelect={handleAccountSelect} />
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <SubscriptionPlanManager />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentTracker />
        </TabsContent>

        <TabsContent value="renewals" className="space-y-6">
          <RenewalManager />
        </TabsContent>
      </Tabs>

      {/* Account Detail Modal */}
      <AccountDetailModal
        account={selectedAccount}
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAccount(null);
        }}
        onUpdate={handleAccountUpdate}
      />
    </div>
  );
}
