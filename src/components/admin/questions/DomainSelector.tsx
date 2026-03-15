"use client";

import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, AlertCircle } from "lucide-react";
import type { QuestionDomain } from "@/lib/admin/mock/mockData";

interface DomainSelectorProps {
  domains: Array<{ domain: QuestionDomain; pendingCount: number }>;
  selectedDomain: QuestionDomain | null;
  onSelectDomain: (domain: QuestionDomain) => void;
}

const domainIcons: Record<QuestionDomain, string> = {
  "data_structures": "💻",
  "algorithms": "🧮",
  "system_design": "🏗️",
  "behavioral": "🤝",
  "databases": "🗄️",
  "networking": "🌐",
};

const domainDescriptions: Record<QuestionDomain, string> = {
  "data_structures": "Data structures and implementation questions",
  "algorithms": "Algorithm design and optimization questions",
  "system_design": "Architecture and scalability questions",
  "behavioral": "Soft skills and situational questions",
  "databases": "Database design and query optimization",
  "networking": "Network protocols and distributed systems",
};

const domainDisplayNames: Record<QuestionDomain, string> = {
  "data_structures": "Data Structures",
  "algorithms": "Algorithms",
  "system_design": "System Design",
  "behavioral": "Behavioral",
  "databases": "Databases",
  "networking": "Networking",
};

export function DomainSelector({
  domains,
  selectedDomain,
  onSelectDomain,
}: DomainSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map(({ domain, pendingCount }) => (
        <GlassCard
          key={domain}
          hover
          glow={selectedDomain === domain}
          className="cursor-pointer"
          onClick={() => onSelectDomain(domain)}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{domainIcons[domain]}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{domainDisplayNames[domain]}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {domainDescriptions[domain]}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {pendingCount > 0 && (
              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-400">
                  {pendingCount} question{pendingCount !== 1 ? "s" : ""} pending review
                </span>
              </div>
            )}

            {pendingCount === 0 && (
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-sm text-green-400">All questions reviewed</span>
              </div>
            )}
          </div>
        </GlassCard>
      ))}

      {domains.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400">No domains available</p>
        </div>
      )}
    </div>
  );
}
