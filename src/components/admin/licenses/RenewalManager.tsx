"use client";

import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle } from "lucide-react";

export default function RenewalManager() {
  const renewals = [
    {
      id: "ren-001",
      institution: "Tech University",
      endDate: new Date("2024-12-31"),
      autoRenewal: true,
      daysUntilExpiry: 90,
    },
    {
      id: "ren-002",
      institution: "Business School",
      endDate: new Date("2024-06-30"),
      autoRenewal: false,
      daysUntilExpiry: 30,
    },
  ];

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-white">Upcoming Renewals</h2>
      </div>
      <div className="space-y-3">
        {renewals.map((renewal) => (
          <div
            key={renewal.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-white font-medium mb-2">{renewal.institution}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Expires: {renewal.endDate.toLocaleDateString()}</span>
                  {renewal.daysUntilExpiry < 60 && (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-amber-400">
                        {renewal.daysUntilExpiry} days remaining
                      </span>
                    </>
                  )}
                </div>
                <Badge
                  className={`mt-2 ${
                    renewal.autoRenewal
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  } border`}
                >
                  {renewal.autoRenewal ? "Auto-renewal enabled" : "Manual renewal"}
                </Badge>
              </div>
              {!renewal.autoRenewal && (
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                  Renew Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
