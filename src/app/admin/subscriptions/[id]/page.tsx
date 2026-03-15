"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Calendar, Shield } from "lucide-react";
import { GlassCard } from "@/components/admin/shared/GlassCard";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { LoadingSpinner } from "@/components/admin/shared/LoadingSpinner";
import { SubscriptionEditor } from "@/components/admin/subscriptions/SubscriptionEditor";
import { PaymentManager } from "@/components/admin/subscriptions/PaymentManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessSubscriptionManagement } from "@/lib/admin/utils/permissions";
import {
  getB2CAccountDetails,
  getB2CSubscriptionPlans,
  getB2CPayments,
  updateB2CSubscription,
  grantPromotionalAccess,
  suspendB2CAccount,
  reactivateB2CAccount,
  processRefund,
  logAdminAction,
} from "@/lib/admin/mock/mockApi";
import { mockB2CSubscriptions } from "@/lib/admin/mock/mockData";
import type { B2CAccount, B2CSubscription, B2CSubscriptionPlan, B2CPayment } from "@/lib/admin/mock/mockData";

export default function SubscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const accountId = params.id as string;

  const [account, setAccount] = useState<B2CAccount | null>(null);
  const [subscription, setSubscription] = useState<B2CSubscription | null>(null);
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
  }, [accountId, user, router]);

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
        resourceId: `/admin/subscriptions/${accountId}`,
        timestamp: new Date(),
      });

      const [accountData, plansData, paymentsData] = await Promise.all([
        getB2CAccountDetails(accountId),
        getB2CSubscriptionPlans(),
        getB2CPayments(accountId),
      ]);

      if (!accountData) {
        setError("Account not found");
        return;
      }

      // Find subscription for this account
      const subscriptionData = mockB2CSubscriptions.find((s) => s.accountId === accountId);

      setAccount(accountData);
      setSubscription(subscriptionData || null);
      setPlans(plansData);
      setPayments(paymentsData);
    } catch (err) {
      console.error("Failed to load account details:", err);
      setError("Failed to load account details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscriptionUpdate = async (updates: Partial<B2CSubscription>) => {
    if (!subscription) return;

    try {
      if (updates.planId) {
        await updateB2CSubscription(accountId, updates.planId);
      }

      if (updates.isPromotional !== undefined && updates.promotionalEndDate) {
        await grantPromotionalAccess(accountId, updates.promotionalEndDate);
      }

      // Log the action
      await logAdminAction({
        adminId: "admin-001",
        adminEmail: "admin@orchids.ai",
        actionType: "b2c_subscription_changed",
        resourceType: "b2c_subscription",
        resourceId: subscription.id,
        details: JSON.stringify(updates),
        timestamp: new Date(),
      });

      // Update local state
      setSubscription({ ...subscription, ...updates, updatedAt: new Date() });
      toast.success("Subscription updated successfully");
    } catch (error) {
      toast.error("Failed to update subscription");
      throw error;
    }
  };

  const handleRefund = async (paymentId: string, amount: number, reason: string, notes?: string) => {
    try {
      await processRefund(paymentId, reason, "admin-001");

      // Log the action
      await logAdminAction({
        adminId: "admin-001",
        adminEmail: "admin@orchids.ai",
        actionType: "b2c_refund_processed",
        resourceType: "b2c_payment",
        resourceId: paymentId,
        details: JSON.stringify({ amount, reason, notes }),
        timestamp: new Date(),
      });

      // Reload payments
      const updatedPayments = await getB2CPayments(accountId);
      setPayments(updatedPayments);
      toast.success("Refund processed successfully");
    } catch (error) {
      toast.error("Failed to process refund");
      throw error;
    }
  };

  const handleSuspendAccount = async () => {
    if (!account) return;

    try {
      await suspendB2CAccount(accountId);

      // Log the action
      await logAdminAction({
        adminId: "admin-001",
        adminEmail: "admin@orchids.ai",
        actionType: "b2c_account_suspended",
        resourceType: "b2c_account",
        resourceId: accountId,
        timestamp: new Date(),
      });

      setAccount({ ...account, subscriptionStatus: "cancelled" });
      toast.success("Account suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend account");
      console.error(error);
    }
  };

  const handleReactivateAccount = async () => {
    if (!account) return;

    try {
      await reactivateB2CAccount(accountId);

      // Log the action
      await logAdminAction({
        adminId: "admin-001",
        adminEmail: "admin@orchids.ai",
        actionType: "b2c_account_reactivated",
        resourceType: "b2c_account",
        resourceId: accountId,
        timestamp: new Date(),
      });

      setAccount({ ...account, subscriptionStatus: "active" });
      toast.success("Account reactivated successfully");
    } catch (error) {
      toast.error("Failed to reactivate account");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !account || !subscription) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <GlassCard className="text-center max-w-md">
          <div className="text-red-500 mb-4">Error</div>
          <p className="text-gray-400 mb-4">{error || "Account not found"}</p>
          <Button
            onClick={() => router.push("/admin/subscriptions")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            Back to Subscriptions
          </Button>
        </GlassCard>
      </div>
    );
  }

  const currentPlan = plans.find((p) => p.id === account.subscriptionPlanId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/subscriptions")}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{account.name}</h1>
            <p className="text-gray-400">Account Details & Subscription Management</p>
          </div>
        </div>
        <StatusBadge status={account.subscriptionStatus as "active" | "suspended"} size="md" />
      </div>

      {/* Account Information */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Full Name</div>
                <div className="text-sm font-medium text-white">{account.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Email Address</div>
                <div className="text-sm font-medium text-white">{account.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Registration Date</div>
                <div className="text-sm font-medium text-white">
                  {new Date(account.startDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Current Plan</div>
                <div className="text-sm font-medium text-white">{currentPlan?.name}</div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="pt-4 border-t border-white/10 flex gap-3">
            {account.subscriptionStatus === "active" ? (
              <Button
                variant="outline"
                onClick={handleSuspendAccount}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                Suspend Account
              </Button>
            ) : (
              <Button
                onClick={handleReactivateAccount}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Reactivate Account
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Tabs for Subscription and Payments */}
      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payments">Payments & Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <SubscriptionEditor
            subscription={subscription}
            plans={plans}
            onUpdate={handleSubscriptionUpdate}
          />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentManager payments={payments} userId={accountId} onRefund={handleRefund} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
