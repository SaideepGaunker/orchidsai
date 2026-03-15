"use client";

import React from "react";
import { GlassCard } from "../shared/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle, Eye, Edit } from "lucide-react";
import type { AIGeneratedQuestion } from "@/lib/admin/mock/mockData";

interface QuestionCardProps {
  question: AIGeneratedQuestion;
  isSelected: boolean;
  onToggleSelect: (questionId: string) => void;
  onReview: (question: AIGeneratedQuestion) => void;
  onQuickApprove: (questionId: string) => void;
  onQuickReject: (questionId: string) => void;
}

export function QuestionCard({
  question,
  isSelected,
  onToggleSelect,
  onReview,
  onQuickApprove,
  onQuickReject,
}: QuestionCardProps) {
  const difficultyColors = {
    easy: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    hard: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const typeColors = {
    technical: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    behavioral: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "system design": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  };

  return (
    <GlassCard hover className="p-6">
      <div className="space-y-4">
        {/* Header with checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(question.id)}
            className="mt-1"
          />
          <div className="flex-1 space-y-3">
            {/* Question content preview */}
            <p className="text-gray-300 line-clamp-3">{question.content}</p>

            {/* Metadata badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={difficultyColors[question.difficulty]}
              >
                {question.difficulty}
              </Badge>
              <Badge
                variant="outline"
                className={typeColors[question.questionType]}
              >
                {question.questionType}
              </Badge>
            </div>

            {/* Generation date */}
            <p className="text-xs text-gray-500">
              Generated: {question.generatedAt.toLocaleDateString()} at{" "}
              {question.generatedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReview(question)}
            className="bg-white/5 hover:bg-white/10 border-white/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Review
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReview(question)}
            className="bg-white/5 hover:bg-white/10 border-white/10"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => onQuickApprove(question.id)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onQuickReject(question.id)}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
