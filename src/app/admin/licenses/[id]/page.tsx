"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, Mail, Phone, Calendar, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GlassCard } from "@/components/admin/shared/GlassCard";
import AccountDetailModal from "@/components/admin/licenses/AccountDetailModal";
import { mockB2BAccounts, mockB2BSubscriptionPlans, mockB2BPayments, type B2BAccount } from "@/lib/admin/mock/mockData";
import { logAdminAction } from "@/lib/admin/utils/logging";

export default function AccountDetailPage() {
  const params = useParams();
  const router = useRouter();
  const accountId = params.id as string;

  const [account, setAccount] = useState<B2BAccount | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Find account
    const foundAccount = mockB2BAccounts.find((a) => a.id === accountId);
    setAccount(foundAccount || null);

    // Log page access
    if (foundAccount) {
      logAdminAction({
        actionType: "auth_success",
        resourceType: "page",
        resourceId: `/admin/licenses/${accountId}`,
        details: JSON.stringify({ accountName: foundAccount.institutionName }),
      });
    }
  }, [accountId]);

  if (!account) {
    return (
      <div className="mx-auto max-w-7xl">
        <GlassCard className="p-8 text-center">
          <p className="text-gray-400">Account not found</p>
          <Button
            onClick={() => router.push("/admin/licenses")}
            className="mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Licenses
          </Button>
        </GlassCard>
      </div>
    );
  }

  const plan = mockB2BSubscriptionPlans.find((p) => p.id === account.subscriptionPlanId);
  const payments = mockB2BPayments.filter((p) => p.accountId === account.id);

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "expired":
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
      case "suspended":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => router.push("/admin/licenses")}
          variant="ghost"
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Licenses
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-white">{account.institutionName}</h1>
              {account.isFlagged && (
                <AlertCircle className="h-6 w-6 text-red-400" title="Account flagged" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(account.subscriptionStatus)}>
                {account.subscriptionStatus}
              </Badge>
              {plan && (
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                  {plan.name}
                </Badge>
              )}
            </div>
          </div>
          <Button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            Edit Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Contact Name</div>
                  <div className="text-white">{account.contactName}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{account.contactEmail}</div>
                </div>
              </div>
              {account.contactPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="text-white">{account.contactPhone}</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-400">Registered</div>
                  <div className="text-white">{formatDate(account.registeredAt)}</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Subscription Details */}
          {plan && (
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Subscription Details</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Plan</div>
                  <div className="text-white font-medium text-lg">{plan.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{plan.description}</div>
                </div>
                <Separator className="bg-white/10" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">License Count</div>
                    <div className="text-white font-medium">{plan.licenseCount} licenses</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="text-white font-medium">{formatCurrency(plan.price)}/year</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Start Date</div>
                    <div className="text-white">{formatDate(account.subscriptionStartDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">End Date</div>
                    <div className="text-white">{formatDate(account.subscriptionEndDate)}</div>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <div className="text-sm text-gray-400 mb-2">Features</div>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Payment History */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Payment History</h2>
            {payments.length === 0 ? (
              <p className="text-gray-400 text-sm">No payment history available</p>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-white font-medium">{formatCurrency(payment.amount)}</div>
                        <div className="text-sm text-gray-400">{formatDate(payment.paymentDate)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-300 capitalize">{payment.paymentMethod.replace("_", " ")}</div>
                      {payment.invoiceNumber && (
                        <div className="text-xs text-gray-500">{payment.invoiceNumber}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">Payment Status</div>
                <Badge className={
                  account.paymentStatus === "paid" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                  account.paymentStatus === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                  "bg-red-500/10 text-red-400 border-red-500/30"
                }>
                  {account.paymentStatus}
                </Badge>
              </div>
              {account.lastPaymentDate && (
                <div>
                  <div className="text-sm text-gray-400">Last Payment</div>
                  <div className="text-white">{formatDate(account.lastPaymentDate)}</div>
                </div>
              )}
              {account.nextRenewalDate && (
                <div>
                  <div className="text-sm text-gray-400">Next Renewal</div>
                  <div className="text-white">{formatDate(account.nextRenewalDate)}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-gray-400">Total Payments</div>
                <div className="text-white font-medium">{payments.length}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Edit Modal */}
      <AccountDetailModal
        account={account}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={(updated) => {
          setAccount(updated);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
