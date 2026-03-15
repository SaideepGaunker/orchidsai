"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionPlanManager from "@/components/admin/licenses/SubscriptionPlanManager";
import { logAdminAction } from "@/lib/admin/utils/logging";
import { useAuth } from "@/contexts/AuthContext";

export default function PlansPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Log page access
    if (user) {
      logAdminAction({
        actionType: "auth_success",
        resourceType: "page",
        resourceId: "/admin/licenses/plans",
        details: JSON.stringify({ page: "Subscription Plans" }),
      });
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <Button
          onClick={() => router.push("/admin/licenses")}
          variant="ghost"
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Licenses
        </Button>
      </div>

      <SubscriptionPlanManager />
    </div>
  );
}
