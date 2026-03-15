"use client";

import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function SubscriptionPlanManager() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 99,
      features: ["Up to 100 licenses", "Email support", "Basic analytics"],
    },
    {
      id: "professional",
      name: "Professional",
      price: 299,
      features: ["Up to 500 licenses", "Priority support", "Advanced analytics", "Custom branding"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 999,
      features: ["Unlimited licenses", "24/7 support", "Full analytics suite", "Custom integrations"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <GlassCard key={plan.id} hover className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-amber-500">${plan.price}</span>
              <span className="text-gray-400">/month</span>
            </div>
          </div>
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-300">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  );
}
