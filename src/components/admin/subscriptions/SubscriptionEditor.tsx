"use client";

import { useState } from "react";
import { Calendar, Gift, Clock, History, Save } from "lucide-react";
import { GlassCard } from "../shared/GlassCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { adminToast } from "@/lib/admin/utils/toast";
import type { B2CSubscription, B2CSubscriptionPlan } from "@/lib/admin/mock/mockData";

interface SubscriptionEditorProps {
  subscription: B2CSubscription;
  plans: B2CSubscriptionPlan[];
  onUpdate: (updates: Partial<B2CSubscription>) => Promise<void>;
}

interface SubscriptionChange {
  id: string;
  timestamp: Date;
  changeType: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
}

export function SubscriptionEditor({ subscription, plans, onUpdate }: SubscriptionEditorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(subscription.planId);
  const [isPromotional, setIsPromotional] = useState(subscription.isPromotional);
  const [promotionalEndDate, setPromotionalEndDate] = useState<Date | undefined>(
    subscription.promotionalEndDate ? new Date(subscription.promotionalEndDate) : undefined
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock subscription change history
  const [changeHistory] = useState<SubscriptionChange[]>([
    {
      id: "change-001",
      timestamp: new Date("2026-02-01T10:00:00"),
      changeType: "Plan Changed",
      oldValue: "Free",
      newValue: "Pro",
      changedBy: "admin@orchids.ai",
    },
    {
      id: "change-002",
      timestamp: new Date("2026-01-20T14:30:00"),
      changeType: "Promotional Access Granted",
      oldValue: "No",
      newValue: "Yes (Until 2026-04-20)",
      changedBy: "admin@orchids.ai",
    },
  ]);

  const currentPlan = plans.find((p) => p.id === subscription.planId);
  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const hasChanges =
    selectedPlanId !== subscription.planId ||
    isPromotional !== subscription.isPromotional ||
    (isPromotional &&
      promotionalEndDate?.getTime() !== subscription.promotionalEndDate?.getTime());

  const handleSaveChanges = async () => {
    setIsUpdating(true);
    try {
      const updates: Partial<B2CSubscription> = {};

      if (selectedPlanId !== subscription.planId) {
        updates.planId = selectedPlanId;
      }

      if (isPromotional !== subscription.isPromotional) {
        updates.isPromotional = isPromotional;
      }

      if (isPromotional && promotionalEndDate) {
        updates.promotionalEndDate = promotionalEndDate;
      } else if (!isPromotional) {
        updates.promotionalEndDate = undefined;
      }

      await onUpdate(updates);
      adminToast.success("Subscription updated successfully");
    } catch (error) {
      adminToast.error("Failed to update subscription");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGrantPromoAccess = () => {
    setIsPromotional(true);
    if (!promotionalEndDate) {
      // Default to 3 months from now
      const defaultEndDate = new Date();
      defaultEndDate.setMonth(defaultEndDate.getMonth() + 3);
      setPromotionalEndDate(defaultEndDate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription Info */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Current Subscription</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Plan</div>
              <div className="text-sm font-medium text-white">{currentPlan?.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Price</div>
              <div className="text-sm font-medium text-white">
                ${((currentPlan?.price || 0) / 100).toFixed(2)}/month
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <div className="text-sm font-medium text-white capitalize">
                {subscription.status}
              </div>
            </div>
            {subscription.renewalDate && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Next Renewal</div>
                <div className="text-sm font-medium text-white">
                  {new Date(subscription.renewalDate).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Plan Change */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Save className="h-5 w-5" />
            Change Subscription Plan
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="plan-select" className="text-gray-300">
                Select New Plan
              </Label>
              <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                <SelectTrigger
                  id="plan-select"
                  className="bg-white/5 border-white/10 text-white mt-2"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - ${(plan.price / 100).toFixed(2)}/month
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPlan && selectedPlanId !== subscription.planId && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="text-sm text-amber-400">
                  <strong>Plan Change Preview:</strong>
                  <div className="mt-2 space-y-1">
                    <div>Current: {currentPlan?.name}</div>
                    <div>New: {selectedPlan.name}</div>
                    <div>
                      Price Change: ${((currentPlan?.price || 0) / 100).toFixed(2)} →{" "}
                      ${(selectedPlan.price / 100).toFixed(2)}/month
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Promotional Access */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Promotional Access
          </h3>

          {subscription.isPromotional && subscription.promotionalEndDate ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-sm text-green-400">
                  <strong>Active Promotional Access</strong>
                  <div className="mt-2">
                    Ends: {new Date(subscription.promotionalEndDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="promo-end-date" className="text-gray-300">
                  Update End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="promo-end-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 mt-2"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {promotionalEndDate
                        ? promotionalEndDate.toLocaleDateString()
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={promotionalEndDate}
                      onSelect={setPromotionalEndDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Grant promotional access to this user with a custom end date.
              </p>

              <div>
                <Label htmlFor="promo-end-date-new" className="text-gray-300">
                  Promotional End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="promo-end-date-new"
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 mt-2"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {promotionalEndDate
                        ? promotionalEndDate.toLocaleDateString()
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={promotionalEndDate}
                      onSelect={setPromotionalEndDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={handleGrantPromoAccess}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Gift className="mr-2 h-4 w-4" />
                Grant Promotional Access
              </Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Save Changes Button */}
      {hasChanges && (
        <Button
          onClick={handleSaveChanges}
          disabled={isUpdating}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          {isUpdating ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      )}

      {/* Subscription Change History */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <History className="h-5 w-5" />
            Change History
          </h3>

          {changeHistory.length > 0 ? (
            <div className="space-y-3">
              {changeHistory.map((change) => (
                <div
                  key={change.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-medium text-white">
                      {change.changeType}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(change.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div>
                      <span className="text-gray-500">From:</span> {change.oldValue}
                    </div>
                    <div>
                      <span className="text-gray-500">To:</span> {change.newValue}
                    </div>
                    <div className="mt-1 text-xs">
                      <span className="text-gray-500">By:</span> {change.changedBy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No change history available
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

