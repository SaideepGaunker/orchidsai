"use client";

import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

export default function PaymentTracker() {
  const payments = [
    {
      id: "pay-001",
      institution: "Tech University",
      amount: 999,
      status: "paid",
      date: new Date("2024-03-01"),
    },
    {
      id: "pay-002",
      institution: "Business School",
      amount: 299,
      status: "pending",
      date: new Date("2024-03-05"),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-white">Recent Payments</h2>
      </div>
      <div className="space-y-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{payment.institution}</p>
                <p className="text-sm text-gray-400">
                  {payment.date.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${payment.amount}</p>
                <Badge className={`${getStatusColor(payment.status)} border mt-1`}>
                  {payment.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
