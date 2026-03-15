"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface BulkActionBarProps {
  selectedCount: number;
  onBulkApprove: () => Promise<any>;
  onBulkReject: (reason: string) => Promise<any>;
}

export function BulkActionBar({
  selectedCount,
  onBulkApprove,
  onBulkReject,
}: BulkActionBarProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (selectedCount === 0) return null;

  const handleBulkApprove = async () => {
    setIsProcessing(true);
    try {
      await onBulkApprove();
      toast.success(`${selectedCount} question${selectedCount !== 1 ? "s" : ""} approved`);
    } catch (error) {
      // Error already handled in parent
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setIsProcessing(true);
    try {
      await onBulkReject(rejectReason);
      toast.success(`${selectedCount} question${selectedCount !== 1 ? "s" : ""} rejected`);
      setShowRejectDialog(false);
      setRejectReason("");
    } catch (error) {
      // Error already handled in parent
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl p-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">
              {selectedCount} question{selectedCount !== 1 ? "s" : ""} selected
            </span>
            <div className="h-6 w-px bg-white/10" />
            <Button
              onClick={handleBulkApprove}
              disabled={isProcessing}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve All
            </Button>
            <Button
              onClick={() => setShowRejectDialog(true)}
              disabled={isProcessing}
              variant="destructive"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-[#0a0a0f] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Reject {selectedCount} Questions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Please provide a reason for rejecting these questions. This will help improve
              future AI-generated content.
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkReject}
              disabled={isProcessing || !rejectReason.trim()}
            >
              {isProcessing ? "Rejecting..." : "Reject All"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
