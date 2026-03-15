"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessQuestionValidation } from "@/lib/admin/utils/permissions";
import { ValidationHistoryTable } from "@/components/admin/questions/ValidationHistoryTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  getValidationHistory,
  getValidationStatistics,
} from "@/lib/admin/mock/mockApi";
import { toast } from "sonner";
import type { AIGeneratedQuestion } from "@/lib/admin/mock/mockData";

export default function ValidationHistoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<AIGeneratedQuestion[]>([]);
  const [statistics, setStatistics] = useState({
    totalValidated: 0,
    approvalRate: 0,
    rejectionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check permissions
    if (user && !canAccessQuestionValidation(user.role)) {
      router.push("/unauthorized");
      return;
    }

    loadData();
  }, [user, router]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [historyData, statsData] = await Promise.all([
        getValidationHistory(),
        getValidationStatistics(),
      ]);
      setHistory(historyData);
      setStatistics(statsData);
    } catch (error) {
      console.error("Failed to load validation history:", error);
      toast.error("Failed to load validation history");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Loading validation history...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/questions")}
          className="mb-4 text-gray-400 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Validation History
        </h1>
        <p className="mt-2 text-gray-400">
          View all question validation actions and statistics
        </p>
      </div>

      {/* History Table */}
      <ValidationHistoryTable history={history} statistics={statistics} />
    </div>
  );
}
