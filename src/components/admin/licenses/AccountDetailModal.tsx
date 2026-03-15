"use client";

import { useState, useEffect } from "react";
import { X, Building2, Mail, Phone, Calendar, Users, Shield, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "../shared/GlassCard";
import { toast } from "sonner";
import {
  getB2BPayments,
  logAdminAction,
} from "@/lib/admin/mock/mockApi";
import type { B2BAccount, B2BPayment } from "@/lib/admin/mock/mockData";

interface AccountDetailModalProps {
  account: B2BAccount | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (account: B2BAccount) => void;
}

export function AccountDetailModal({ account, open, onClose, onUpdate }: AccountDetailModalProps) {
  const [payments, setPayments] = useState<B2BPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (account && open) {
      loadAccountData();
    }
  }, [account, open]);

  const loadAccountData = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      const paymentsData = await getB2BPayments(account.id);
      setPayments(paymentsData);
    } catch (error) {
      console.error("Failed to load account data:", error);
      toast.error("Failed to load account details");
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) return null;

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

  const licenseUsagePercentage = (account.usedLicenses / account.licenseCount) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-bold text-white">Account Details</DialogTitle>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Institution Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-amber-500" />
                  <h3 className="text-xl font-semibold text-white">Institution Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Institution Name</div>
                    <div className="text-lg font-medium text-white">{account.institutionName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Status</div>
                    <Badge className={`${getStatusColor(account.subscriptionStatus)} border text-base px-3 py-1`}>
                      {account.subscriptionStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-base font-medium text-white">{account.contactEmail}</div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-base font-medium text-white">{account.contactPhone}</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div className="text-sm text-gray-400">Total Licenses</div>
                  </div>
                  <div className="text-4xl font-bold text-white">{account.licenseCount}</div>
                </GlassCard>

                <GlassCard className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-8 w-8 text-green-400" />
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                  <div className="text-4xl font-bold text-white">{account.usedLicenses}</div>
                  <div className="mt-2">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${licenseUsagePercentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{licenseUsagePercentage.toFixed(0)}% utilized</div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-600/5 border-amber-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-8 w-8 text-amber-400" />
                    <div className="text-sm text-gray-400">Contract End</div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {new Date(account.endDate).toLocaleDateString('en-US', { 
                      month: '2-digit', 
                      day: '2-digit', 
                      year: 'numeric' 
                    })}
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Subscription Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Plan ID</div>
                    <div className="text-base font-medium text-white">{account.subscriptionPlanId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Auto Renew</div>
                    <Badge className={account.autoRenew ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}>
                      {account.autoRenew ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Start Date</div>
                    <div className="text-base font-medium text-white">
                      {new Date(account.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">End Date</div>
                    <div className="text-base font-medium text-white">
                      {new Date(account.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Total Revenue</div>
                    <div className="text-2xl font-bold text-white">${account.totalRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-base font-medium text-white">Total Licenses</div>
                      <div className="text-sm text-gray-400">Maximum number of users</div>
                    </div>
                    <div className="text-3xl font-bold text-white">{account.licenseCount}</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-base font-medium text-white">Active Users</div>
                      <div className="text-sm text-gray-400">Currently using the platform</div>
                    </div>
                    <div className="text-3xl font-bold text-green-400">{account.usedLicenses}</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-base font-medium text-white">Available Licenses</div>
                      <div className="text-sm text-gray-400">Remaining capacity</div>
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                      {account.licenseCount - account.usedLicenses}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Payment History</h3>
                <div className="space-y-3">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-base font-medium text-white">{payment.invoiceNumber}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(payment.paymentDate).toLocaleDateString()} • {payment.paymentMethod}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">${payment.amount.toLocaleString()}</div>
                          <Badge className={
                            payment.status === "completed" ? "bg-green-500/10 text-green-400" :
                            payment.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-red-500/10 text-red-400"
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">No payment history available</div>
                  )}
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
