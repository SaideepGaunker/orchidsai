"use client";

import { useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { Search, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { B2CAccount, B2CSubscription, B2CSubscriptionPlan } from "@/lib/admin/mock/mockData";

interface B2CAccountTableProps {
  accounts: B2CAccount[];
  subscriptions: B2CSubscription[];
  plans: B2CSubscriptionPlan[];
  onAccountClick: (account: B2CAccount) => void;
}

export function B2CAccountTable({
  accounts,
  subscriptions,
  plans,
  onAccountClick,
}: B2CAccountTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.subscriptionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "trial":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "expired":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getPlanName = (planId: string) => {
    return plans.find((p) => p.id === planId)?.name || "Unknown";
  };

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Student Accounts</h2>
          <p className="text-sm text-gray-400">{filteredAccounts.length} accounts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={statusFilter === "all" ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
            className={statusFilter === "active" ? "bg-green-500 hover:bg-green-600" : ""}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "trial" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("trial")}
            className={statusFilter === "trial" ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            Trial
          </Button>
          <Button
            variant={statusFilter === "expired" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("expired")}
            className={statusFilter === "expired" ? "bg-gray-500 hover:bg-gray-600" : ""}
          >
            Inactive
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-2">
        {filteredAccounts.map((account) => (
          <div
            key={account.id}
            onClick={() => onAccountClick(account)}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-medium">{account.name}</h3>
                  <Badge className={`${getStatusColor(account.subscriptionStatus)} border`}>
                    {account.subscriptionStatus}
                  </Badge>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border">
                    {getPlanName(account.subscriptionPlanId)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{account.email}</span>
                  <span>•</span>
                  <span>Joined {new Date(account.startDate).toLocaleDateString()}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No accounts found</p>
        </div>
      )}
    </GlassCard>
  );
}
