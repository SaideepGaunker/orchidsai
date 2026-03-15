"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, Edit2 } from "lucide-react";
import type { AIGeneratedQuestion } from "@/lib/admin/mock/mockData";

interface QuestionReviewModalProps {
  question: AIGeneratedQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (question: AIGeneratedQuestion) => void;
  onReject: (question: AIGeneratedQuestion, reason: string) => void;
  onEdit: (question: AIGeneratedQuestion) => void;
}

export function QuestionReviewModal({
  question,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onEdit,
}: QuestionReviewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedDifficulty, setEditedDifficulty] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    if (question) {
      setEditedContent(question.content);
      setEditedDifficulty(question.difficulty);
      setIsEditing(false);
      setShowRejectInput(false);
      setRejectReason("");
    }
  }, [question]);

  if (!question) return null;

  const handleSaveEdit = () => {
    const updatedQuestion = {
      ...question,
      content: editedContent,
      difficulty: editedDifficulty as "easy" | "medium" | "hard",
      wasEdited: true,
    };
    onEdit(updatedQuestion);
    setIsEditing(false);
  };

  const handleApprove = () => {
    const finalQuestion = isEditing
      ? {
          ...question,
          content: editedContent,
          difficulty: editedDifficulty as "easy" | "medium" | "hard",
          wasEdited: true,
        }
      : question;
    onApprove(finalQuestion);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    onReject(question, rejectReason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#0a0a0f] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Review Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Metadata */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border">
              {question.questionType}
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 border">
              {question.domain}
            </Badge>
            {question.wasEdited && (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
                Previously Edited
              </Badge>
            )}
          </div>

          {/* Question Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Question Content</Label>
              {!isEditing && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="bg-white/5 border-white/10 text-white min-h-[120px] focus:border-amber-500/50"
                placeholder="Enter question content..."
              />
            ) : (
              <div className="text-gray-300 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-base leading-relaxed">{question.content}</p>
              </div>
            )}
          </div>

          {/* Difficulty and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Difficulty Level</Label>
              {isEditing ? (
                <Select value={editedDifficulty} onValueChange={setEditedDifficulty}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-gray-300 capitalize font-medium">{question.difficulty}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question Type</Label>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-gray-300 font-medium">{question.questionType}</p>
              </div>
            </div>
          </div>

          {/* AI Generation Metadata */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">AI Generation Details</Label>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
              <div>
                <p className="text-xs text-gray-400 mb-1">Confidence Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-green-500 rounded-full transition-all"
                      style={{ width: `${question.confidenceScore * 100}%` }}
                    />
                  </div>
                  <p className="text-white font-semibold text-sm">
                    {(question.confidenceScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Generated Date</p>
                <p className="text-white font-medium">
                  {new Date(question.generatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
                  {question.validationStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Additional Context */}
          {question.tags && question.tags.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, idx) => (
                  <Badge 
                    key={idx}
                    className="bg-gray-500/10 text-gray-400 border-gray-500/20 border"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quality Indicators */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Quality Assessment</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Clarity</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-xs text-gray-300">85%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Relevance</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <span className="text-xs text-gray-300">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reject Reason Input */}
          {showRejectInput && (
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="Explain why this question is being rejected..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel Edit
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Save Changes
              </Button>
            </>
          ) : showRejectInput ? (
            <>
              <Button variant="outline" onClick={() => setShowRejectInput(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectReason.trim()}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Confirm Reject
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowRejectInput(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
