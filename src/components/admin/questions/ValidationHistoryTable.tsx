"use client";

import React, { useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, ArrowUpDown } from "lucide-react";
import type { AIGeneratedQuestion, QuestionDomain } from "@/lib/admin/mock/mockData";

interface ValidationHistoryTableProps {
  history: AIGeneratedQuestion[];
  statistics: {
    totalValidated: number;
    approvalRate: number;
    rejectionRate: number;
  };
}

export function ValidationHistoryTable({
  history,
  statistics,
}: ValidationHistoryTableProps) {
  const [validatorFilter, setValidatorFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"date" | "validator" | "domain">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Get unique validators
  const uniqueValidators = Array.from(
    new Set(history.map((h) => h.validatedBy).filter(Boolean))
  );

  // Apply filters
  let filteredHistory = [...history];

  if (validatorFilter !== "all") {
    filteredHistory = filteredHistory.filter(
      (h) => h.validatedBy === validatorFilter
    );
  }

  if (actionFilter !== "all") {
    filteredHistory = filteredHistory.filter(
      (h) => h.validationStatus === actionFilter
    );
  }

  if (domainFilter !== "all") {
    filteredHistory = filteredHistory.filter((h) => h.domain === domainFilter);
  }

  // Apply sorting
  filteredHistory.sort((a, b) => {
    let comparison = 0;

    if (sortField === "date") {
      comparison =
        (a.validatedAt?.getTime() || 0) - (b.validatedAt?.getTime() || 0);
    } else if (sortField === "validator") {
      comparison = (a.validatedBy || "").localeCompare(b.validatedBy || "");
    } else if (sortField === "domain") {
      comparison = a.domain.localeCompare(b.domain);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const toggleSort = (field: "date" | "validator" | "domain") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total Validated</p>
            <p className="text-3xl font-bold text-white">
              {statistics.totalValidated}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Approval Rate</p>
            <p className="text-3xl font-bold text-green-400">
              {statistics.approvalRate.toFixed(1)}%
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Rejection Rate</p>
            <p className="text-3xl font-bold text-red-400">
              {statistics.rejectionRate.toFixed(1)}%
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-300">
              Validator:
            </label>
            <Select value={validatorFilter} onValueChange={setValidatorFilter}>
              <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Validators</SelectItem>
                {uniqueValidators.map((validator) => (
                  <SelectItem key={validator} value={validator || ""}>
                    {validator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-300">Action:</label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-300">Domain:</label>
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="System Design">System Design</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto text-sm text-gray-400">
            {filteredHistory.length} record{filteredHistory.length !== 1 ? "s" : ""}
          </div>
        </div>
      </GlassCard>

      {/* History Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-300">Question ID</TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("domain")}
                    className="hover:bg-white/5 text-gray-300"
                  >
                    Domain
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">Action</TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("validator")}
                    className="hover:bg-white/5 text-gray-300"
                  >
                    Validator
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("date")}
                    className="hover:bg-white/5 text-gray-300"
                  >
                    Timestamp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    No validation history found with the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <TableCell className="font-mono text-sm text-gray-400">
                      {item.id}
                    </TableCell>
                    <TableCell className="text-gray-300">{item.domain}</TableCell>
                    <TableCell>
                      {item.validationStatus === "approved" ? (
                        <Badge
                          variant="outline"
                          className="bg-green-500/20 text-green-400 border-green-500/30"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-500/20 text-red-400 border-red-500/30"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {item.validatedBy || "Unknown"}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {item.validatedAt
                        ? `${item.validatedAt.toLocaleDateString()} ${item.validatedAt.toLocaleTimeString()}`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm max-w-xs truncate">
                      {item.rejectionReason || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </GlassCard>
    </div>
  );
}
