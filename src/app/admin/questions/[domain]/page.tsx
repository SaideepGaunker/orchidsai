"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessQuestionValidation } from "@/lib/admin/utils/permissions";
import { DomainSelector } from "@/components/admin/questions/DomainSelector";
import { QuestionList } from "@/components/admin/questions/QuestionList";
import { BulkActionBar } from "@/components/admin/questions/BulkActionBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  getDomains,
  getQuestionsByDomain,
  approveQuestion,
  rejectQuestion,
  editQuestion,
  bulkApproveQuestions,
  bulkRejectQuestions,
} from "@/lib/admin/mock/mockApi";
import { logQuestionAction } from "@/lib/admin/utils/logging";
import { toast } from "sonner";
import type {
  QuestionDomain,
  AIGeneratedQuestion,
} from "@/lib/admin/mock/mockData";

// Lazy load the heavy QuestionReviewModal component
const QuestionReviewModal = dynamic(
  () => import("@/components/admin/questions/QuestionReviewModal").then((mod) => ({ default: mod.QuestionReviewModal })),
  {
    loading: () => null, // Don't show loading state for modal
    ssr: false,
  }
);

export default function DomainQuestionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const domain = decodeURIComponent(params.domain as string) as QuestionDomain;

  const [domains, setDomains] = useState<Array<{ domain: QuestionDomain; pendingCount: number }>>([]);
  const [questions, setQuestions] = useState<AIGeneratedQuestion[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [reviewQuestion, setReviewQuestion] = useState<AIGeneratedQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check permissions
    if (user && !canAccessQuestionValidation(user.role)) {
      router.push("/unauthorized");
      return;
    }

    loadData();
  }, [user, router, domain]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [domainsData, questionsData] = await Promise.all([
        getDomains(),
        getQuestionsByDomain(domain, { validationStatus: "pending" }),
      ]);
      setDomains(domainsData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDomain = (newDomain: QuestionDomain) => {
    router.push(`/admin/questions/${encodeURIComponent(newDomain)}`);
  };

  const handleToggleSelect = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedQuestions.length === questions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map((q) => q.id));
    }
  };

  const handleQuickApprove = async (questionId: string) => {
    if (!user) return;

    try {
      await approveQuestion(questionId, user.id, user.name || user.email);
      logQuestionAction(user.id, user.email, "question_approved", questionId, {
        domain,
      });
      toast.success("Question approved successfully");
      
      // Remove from list
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      setSelectedQuestions((prev) => prev.filter((id) => id !== questionId));
    } catch (error) {
      console.error("Failed to approve question:", error);
      toast.error("Failed to approve question");
    }
  };

  const handleQuickReject = async (questionId: string) => {
    if (!user) return;

    const reason = prompt("Please provide a rejection reason:");
    if (!reason) return;

    try {
      await rejectQuestion(questionId, reason, user.id, user.name || user.email);
      logQuestionAction(user.id, user.email, "question_rejected", questionId, {
        domain,
        reason,
      });
      toast.success("Question rejected successfully");
      
      // Remove from list
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      setSelectedQuestions((prev) => prev.filter((id) => id !== questionId));
    } catch (error) {
      console.error("Failed to reject question:", error);
      toast.error("Failed to reject question");
    }
  };

  const handleApprove = async (question: AIGeneratedQuestion) => {
    if (!user) return;

    try {
      await approveQuestion(question.id, user.id, user.name || user.email);
      logQuestionAction(user.id, user.email, "question_approved", question.id, {
        domain: question.domain,
        wasEdited: question.wasEdited,
      });
      toast.success("Question approved successfully");
      
      // Remove from list
      setQuestions((prev) => prev.filter((q) => q.id !== question.id));
      setSelectedQuestions((prev) => prev.filter((id) => id !== question.id));
    } catch (error) {
      console.error("Failed to approve question:", error);
      toast.error("Failed to approve question");
    }
  };

  const handleReject = async (question: AIGeneratedQuestion, reason: string) => {
    if (!user) return;

    try {
      await rejectQuestion(question.id, reason, user.id, user.name || user.email);
      logQuestionAction(user.id, user.email, "question_rejected", question.id, {
        domain: question.domain,
        reason,
      });
      toast.success("Question rejected successfully");
      
      // Remove from list
      setQuestions((prev) => prev.filter((q) => q.id !== question.id));
      setSelectedQuestions((prev) => prev.filter((id) => id !== question.id));
    } catch (error) {
      console.error("Failed to reject question:", error);
      toast.error("Failed to reject question");
    }
  };

  const handleEdit = async (question: AIGeneratedQuestion) => {
    if (!user) return;

    try {
      await editQuestion(question.id, {
        content: question.content,
        difficulty: question.difficulty,
        questionType: question.questionType,
        domain: question.domain,
      });
      logQuestionAction(user.id, user.email, "question_edited", question.id, {
        domain: question.domain,
      });
      
      // Update in list
      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? question : q))
      );
    } catch (error) {
      console.error("Failed to edit question:", error);
      toast.error("Failed to edit question");
    }
  };

  const handleBulkApprove = async () => {
    if (!user) return;

    try {
      const result = await bulkApproveQuestions(
        selectedQuestions,
        user.id,
        user.name || user.email
      );
      
      selectedQuestions.forEach((id) => {
        logQuestionAction(user.id, user.email, "question_approved", id, {
          domain,
          bulkOperation: true,
        });
      });

      // Remove approved questions from list
      setQuestions((prev) =>
        prev.filter((q) => !selectedQuestions.includes(q.id))
      );
      setSelectedQuestions([]);

      return result;
    } catch (error) {
      console.error("Failed to bulk approve:", error);
      toast.error("Failed to bulk approve questions");
      throw error;
    }
  };

  const handleBulkReject = async (reason: string) => {
    if (!user) return;

    try {
      const result = await bulkRejectQuestions(
        selectedQuestions,
        reason,
        user.id,
        user.name || user.email
      );
      
      selectedQuestions.forEach((id) => {
        logQuestionAction(user.id, user.email, "question_rejected", id, {
          domain,
          reason,
          bulkOperation: true,
        });
      });

      // Remove rejected questions from list
      setQuestions((prev) =>
        prev.filter((q) => !selectedQuestions.includes(q.id))
      );
      setSelectedQuestions([]);

      return result;
    } catch (error) {
      console.error("Failed to bulk reject:", error);
      toast.error("Failed to bulk reject questions");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/questions")}
            className="mb-4 text-gray-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Domains
          </Button>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {domain} Questions
          </h1>
          <p className="mt-2 text-gray-400">
            Review and validate pending questions in this domain
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/questions/history")}
          className="bg-white/5 hover:bg-white/10 border-white/10"
        >
          View History
        </Button>
      </div>

      {/* Domain Selector */}
      <DomainSelector
        domains={domains}
        selectedDomain={domain}
        onSelectDomain={handleSelectDomain}
      />

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedQuestions.length}
        onBulkApprove={handleBulkApprove}
        onBulkReject={handleBulkReject}
      />

      {/* Question List */}
      {questions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No pending questions in this domain.</p>
        </div>
      ) : (
        <QuestionList
          questions={questions}
          selectedQuestions={selectedQuestions}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onReview={setReviewQuestion}
          onQuickApprove={handleQuickApprove}
          onQuickReject={handleQuickReject}
        />
      )}

      {/* Review Modal */}
      <QuestionReviewModal
        question={reviewQuestion}
        isOpen={reviewQuestion !== null}
        onClose={() => setReviewQuestion(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onEdit={handleEdit}
      />
    </div>
  );
}
