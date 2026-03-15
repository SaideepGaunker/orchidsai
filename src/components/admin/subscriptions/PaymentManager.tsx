"use client";

import { useState } from "react";
import { CreditCard, DollarSign, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { GlassCard } from "../shared/GlassCard";
import { StatusBadge } from "../shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { RefundModal } from "./RefundModal";
import type { B2CPayment } from "@/lib/admin/mock/mockData";

interface PaymentManagerProps {
  payments: B2CPayment[];
  userId: string;
  onRefund?: (paymentId: string, amount: number, reason: string, notes?: string) => Promise<void>;
}

export function PaymentManager({ payments, userId, onRefund }: PaymentManagerProps) {
  const [selectedPayment, setSelectedPayment] = useState<B2CPayment | null>(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  // Filter payments for this user
  const userPayments = payments.filter((p) => p.userId === userId);

  // Calculate payment statistics
  const totalPaid = userPayments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = userPayments
    .filter((p) => p.paymentStatus === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = userPayments.filter((p) => p.paymentStatus === "failed").length;

  const handleRefundClick = (payment: B2CPayment) => {
    setSelectedPayment(payment);
    setIsRefundModalOpen(true);
  };

  const handleRefundSubmit = async (amount: number, reason: string, notes?: string) => {
    if (selectedPayment && onRefund) {
      await onRefund(selectedPayment.id, amount, reason, notes);
      setIsRefundModalOpen(false);
      setSelectedPayment(null);
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Paid</div>
              <div className="text-lg font-semibold text-white">
                ${(totalPaid / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Pending</div>
              <div className="text-lg font-semibold text-white">
                ${(totalPending / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Failed Payments</div>
              <div className="text-lg font-semibold text-white">{totalFailed}</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Payment History */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment History
          </h3>

          {userPayments.length > 0 ? (
            <div className="space-y-3">
              {userPayments
                .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPaymentStatusIcon(payment.paymentStatus)}
                          <span className="text-sm font-medium text-white">
                            ${(payment.amount / 100).toFixed(2)}
                          </span>
                          <StatusBadge
                            status={payment.paymentStatus as "active" | "pending" | "suspended"}
                            size="sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>{" "}
                            <span className="text-gray-300">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Method:</span>{" "}
                            <span className="text-gray-300 capitalize">
                              {payment.paymentMethod.replace("_", " ")}
                            </span>
                          </div>
                          {payment.transactionId && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Transaction ID:</span>{" "}
                              <span className="text-gray-300 font-mono text-xs">
                                {payment.transactionId}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {payment.paymentStatus === "paid" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefundClick(payment)}
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refund
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <CreditCard className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p>No payment history available</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Transaction Audit Trail */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Transaction Audit Trail</h3>
          <div className="text-sm text-gray-400">
            All payment transactions and refunds are logged and stored in localStorage for audit
            purposes. This includes timestamps, amounts, reasons, and mentor identifiers.
          </div>
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-sm text-blue-400">
              <strong>Audit Information:</strong>
              <div className="mt-2 space-y-1">
                <div>Total Transactions: {userPayments.length}</div>
                <div>
                  Last Transaction:{" "}
                  {userPayments.length > 0
                    ? new Date(
                        Math.max(...userPayments.map((p) => new Date(p.paymentDate).getTime()))
                      ).toLocaleString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Refund Modal */}
      {selectedPayment && (
        <RefundModal
          isOpen={isRefundModalOpen}
          onClose={() => {
            setIsRefundModalOpen(false);
            setSelectedPayment(null);
          }}
          payment={selectedPayment}
          onSubmit={handleRefundSubmit}
        />
      )}
    </div>
  );
}
