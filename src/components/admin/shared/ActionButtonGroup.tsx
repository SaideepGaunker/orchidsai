import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionButton {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

interface ActionButtonGroupProps {
  actions: ActionButton[];
  className?: string;
}

export function ActionButtonGroup({ actions, className }: ActionButtonGroupProps) {
  const getButtonVariant = (variant?: "primary" | "secondary" | "danger") => {
    switch (variant) {
      case "primary":
        return "default";
      case "danger":
        return "destructive";
      case "secondary":
      default:
        return "outline";
    }
  };

  const getButtonClassName = (variant?: "primary" | "secondary" | "danger") => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)]";
      case "danger":
        return "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 hover:border-red-500/30";
      case "secondary":
      default:
        return "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-300";
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)} role="group" aria-label="Action buttons">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button
            key={index}
            type="button"
            variant={getButtonVariant(action.variant)}
            size="sm"
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            className={cn(
              "transition-all duration-300 focus:ring-4 focus:ring-amber-500/50",
              getButtonClassName(action.variant)
            )}
            aria-label={action.label}
            aria-busy={action.loading}
          >
            {action.loading ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              Icon && <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
            )}
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}
