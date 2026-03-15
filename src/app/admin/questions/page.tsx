"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessQuestionValidation } from "@/lib/admin/utils/permissions";
import { getDomains } from "@/lib/admin/mock/mockApi";
import { SkeletonCardGrid } from "@/components/admin/shared/SkeletonLoader";
import type { QuestionDomain } from "@/lib/admin/mock/mockData";

// Lazy load DomainSelector component
const DomainSelector = dynamic(
  () => import("@/components/admin/questions/DomainSelector").then((mod) => ({ default: mod.DomainSelector })),
  {
    loading: () => <SkeletonCardGrid count={6} />,
    ssr: false,
  }
);

export default function QuestionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [domains, setDomains] = useState<Array<{ domain: QuestionDomain; pendingCount: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check permissions
    if (user && !canAccessQuestionValidation(user.role)) {
      router.push("/unauthorized");
      return;
    }

    // Load domains
    const loadDomains = async () => {
      try {
        const data = await getDomains();
        setDomains(data);
      } catch (error) {
        console.error("Failed to load domains:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDomains();
  }, [user, router]);

  const handleSelectDomain = (domain: QuestionDomain) => {
    router.push(`/admin/questions/${encodeURIComponent(domain)}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Loading domains...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Question Validation</h1>
        <p className="mt-2 text-gray-400">Review and validate AI-generated interview questions</p>
      </div>

      <DomainSelector
        domains={domains}
        selectedDomain={null}
        onSelectDomain={handleSelectDomain}
      />
    </div>
  );
}
