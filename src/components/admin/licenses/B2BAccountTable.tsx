"use client";

import { useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import { Search, ChevronRight, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { B2BAccount } from "@/lib/admin/mock/mockData";

interface B2BAccountTableProps {
  onAccountSelect: (account: B2BAccount) => void;
}

export default function B2BAccountTable({ onAccountSelect }: B2BAccountTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts] = useState<B2BAccount[]>([
    {
      id: "b2b-001",
      institutionName: "Tech University",
      contactEmail: "admin@techuni.edu",
      contactPhone: "+1-555-0100",
      planId: "enterprise",
      totalLicenses: 500,
      activeUsers: 450,
      status: "active",
      contractStartDate: new Date("2024-01-01"),
      contractEndDate: new Date("2025-12-31"),
      autoRenewal: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-03-10"),
    },
  ]);

  const filteredAccounts = accounts.filter((account) =>
    account.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "suspended":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-amber-500" />
          <div>
            <h2 className="text-xl font-semibold text-white">B2B Accounts</h2>
            <p className="text-sm text-gray-400">{filteredAccounts.length} institutions</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredAccounts.map((account) => (
          <div
            key={account.id}
            onClick={() => onAccountSelect(account)}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-medium">{account.institutionName}</h3>
                  <Badge className={`${getStatusColor(account.status)} border`}>
                    {account.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{account.contactEmail}</span>
                  <span>•</span>
                  <span>{account.activeUsers}/{account.totalLicenses} licenses used</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
