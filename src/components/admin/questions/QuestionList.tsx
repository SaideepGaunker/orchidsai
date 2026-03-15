"use client";

import { GlassCard } from "../shared/GlassCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import type { AIGeneratedQuestion } from "@/lib/admin/mock/mockData";

interface QuestionListProps {
  questions: AIGeneratedQuestion[];
  selectedQuestions: string[];
  onToggleSelect: (questionId: string) => void;
  onToggleSelectAll: () => void;
  onReview: (question: AIGeneratedQuestion) => void;
  onQuickApprove: (questionId: string) => void;
  onQuickReject: (questionId: string) => void;
}

export function QuestionList({
  questions,
  selectedQuestions,
  onToggleSelect,
  onToggleSelectAll,
  onReview,
  onQuickApprove,
  onQuickReject,
}: QuestionListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "hard":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedQuestions.length === questions.length && questions.length > 0}
            onCheckedChange={onToggleSelectAll}
          />
          <h2 className="text-xl font-semibold text-white">
            Pending Questions ({questions.length})
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedQuestions.includes(question.id)}
                onCheckedChange={() => onToggleSelect(question.id)}
                className="mt-1"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getDifficultyColor(question.difficulty)} border`}>
                    {question.difficulty}
                  </Badge>
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border">
                    {question.questionType}
                  </Badge>
                  {question.wasEdited && (
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 border">
                      Edited
                    </Badge>
                  )}
                </div>

                <p className="text-white mb-2">{question.content}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Generated {new Date(question.generatedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Confidence: {(question.confidenceScore * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onReview(question)}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => onQuickApprove(question.id)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onQuickReject(question.id)}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
