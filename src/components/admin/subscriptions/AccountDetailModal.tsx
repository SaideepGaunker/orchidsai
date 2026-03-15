"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Calendar, Shield, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "../shared/GlassCard";
import { SubscriptionEditor } from "./SubscriptionEditor";
import { PaymentManager } from "./PaymentManager";
import { toast } from "sonner";
import {
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

interface AccountDetailModalProps {
  account: B2CAccount | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (account: B2CAccount) => void;
}

export function AccountDetailModal({ account, open, onClose, onUpdate }: AccountDetailModalProps) {
  const [subscription, setSubscription] = useState<B2CSubscription | null>(null);
  const [plans, setPlans] = useState<B2CSubscriptionPlan[]>([]);
  const [payments, setPayments] = useState<B2CPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account && open) {
      loadAccountData();
    }
  }, [account, open]);

  const loadAccountData = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      const [plansData, paymentsData] = await Promise.all([
        getB2CSubscriptionPlans(),
        getB2CPayments(account.id),
      ]);

      // Find subscription for this account
      const subscriptionData = mockB2CSubscriptions.find((s) => s.accountId === account.id);

      setPlans(plansData);
      setPayments(paymentsData);
      setSubscription(subscriptionData || null);
    } catch (error) {
      console.error("Failed to load account data:", error);
      toast.error("Failed to load account details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscriptionUpdate = async (updates: Partial<B2CSubscription>) => {
    if (!subscription || !account) return;

    try {
      if (updates.planId) {
        await updateB2CSubscription(account.id, updates.planId);
      }

      setSubscription({ ...subscription, ...updates });
      toast.success("Subscription updated successfully");
    } catch (error) {
      toast.error("Failed to update subscription");
      throw error;
    }
  };

  const handleRefund = async (paymentId: string, amount: number, reason: string, notes?: string) => {
    if (!account) return;

    try {
      await processRefund(paymentId, amount, reason);

      // Reload payments
      const updatedPayments = await getB2CPayments(account.id);
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
      await suspendB2CAccount(account.id);
      const updatedAccount = { ...account, subscriptionStatus: "cancelled" as const };
      onUpdate(updatedAccount);
      toast.success("Account suspended successfully");
    } catch (error) {
      toast.error("Failed to suspend account");
      console.error(error);
    }
  };

  const handleReactivateAccount = async () => {
    if (!account) return;

    try {
      await reactivateB2CAccount(account.id);
      const updatedAccount = { ...account, subscriptionStatus: "active" as const };
      onUpdate(updatedAccount);
      toast.success("Account reactivated successfully");
    } catch (error) {
      toast.error("Failed to reactivate account");
      console.error(error);
    }
  };

  if (!account) return null;

  const currentPlan = plans.find((p) => p.id === account.subscriptionPlanId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "trial":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "expired":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-white">{account.name}</DialogTitle>
              <p className="text-sm text-gray-400 mt-1">Account Details & Subscription Management</p>
            </div>
            <Badge className={`${getStatusColor(account.subscriptionStatus)} border`}>
              {account.subscriptionStatus}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
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
                    <div className="text-sm font-medium text-white">{currentPlan?.name || "Unknown"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                    <div className="text-sm font-medium text-white">${account.totalSpent.toFixed(2)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Subscription End Date</div>
                    <div className="text-sm font-medium text-white">
                      {new Date(account.endDate).toLocaleDateString()}
                    </div>
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
              {subscription && (
                <SubscriptionEditor
                  subscription={subscription}
                  plans={plans}
                  onUpdate={handleSubscriptionUpdate}
                />
              )}
            </TabsContent>

            <TabsContent value="payments">
              <PaymentManager payments={payments} userId={account.id} onRefund={handleRefund} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
