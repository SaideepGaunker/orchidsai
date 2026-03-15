"use client";

import { useState } from "react";
import { RefreshCw, DollarSign, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SecureInput, SecureTextarea } from "@/components/admin/shared/SecureInput";
import { Label } from "@/components/ui/label";
import { adminToast } from "@/lib/admin/utils/toast";
import type { B2CPayment } from "@/lib/admin/mock/mockData";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: B2CPayment;
  onSubmit: (amount: number, reason: string, notes?: string) => Promise<void>;
}

export function RefundModal({ isOpen, onClose, payment, onSubmit }: RefundModalProps) {
  const [refundAmount, setRefundAmount] = useState((payment.amount / 100).toFixed(2));
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const maxRefundAmount = payment.amount / 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const amount = parseFloat(refundAmount);
    if (isNaN(amount) || amount <= 0) {
      adminToast.error("Please enter a valid refund amount");
      return;
    }

    if (amount > maxRefundAmount) {
      adminToast.error(`Refund amount cannot exceed $${maxRefundAmount.toFixed(2)}`);
      return;
    }

    if (!reason.trim()) {
      adminToast.error("Please provide a reason for the refund");
      return;
    }

    setIsProcessing(true);
    try {
      await onSubmit(Math.round(amount * 100), reason, notes || undefined);
      adminToast.success("Refund processed successfully");
      onClose();
    } catch (error) {
      adminToast.error("Failed to process refund");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountChange = (value: string) => {
    // Allow only valid decimal numbers
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setRefundAmount(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f1419] border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <RefreshCw className="h-5 w-5 text-amber-500" />
            Process Refund
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Process a refund for this payment transaction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Payment Information */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Original Amount:</span>
                <span className="text-white font-medium">
                  ${(payment.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Date:</span>
                <span className="text-white">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="text-white capitalize">
                  {payment.paymentMethod.replace("_", " ")}
                </span>
              </div>
              {payment.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="text-white font-mono text-xs">
                    {payment.transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Refund Amount */}
          <div className="space-y-2">
            <Label htmlFor="refund-amount" className="text-gray-300">
              Refund Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <SecureInput
                id="refund-amount"
                type="text"
                value={refundAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                sanitize={true}
                validate={true}
                validationOptions={{
                  required: true,
                  allowSpecialChars: false,
                }}
                className="pl-10 bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white"
                required
              />
            </div>
            <div className="text-xs text-gray-500">
              Maximum refund: ${maxRefundAmount.toFixed(2)}
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="refund-reason" className="text-gray-300">
              Reason for Refund <span className="text-red-500">*</span>
            </Label>
            <SecureInput
              id="refund-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Service not as expected, Duplicate charge"
              sanitize={true}
              validate={true}
              validationOptions={{
                minLength: 5,
                maxLength: 200,
                required: true,
              }}
              className="bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-gray-500"
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="refund-notes" className="text-gray-300">
              Additional Notes (Optional)
            </Label>
            <SecureTextarea
              id="refund-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information about this refund..."
              rows={3}
              sanitize={true}
              validate={true}
              validationOptions={{
                maxLength: 1000,
              }}
              className="bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* Warning */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-400">
                <strong>Important:</strong> This action will process a refund and update the
                transaction audit trail. This action cannot be undone.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Process Refund
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


