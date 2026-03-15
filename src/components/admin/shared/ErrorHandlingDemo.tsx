/**
 * Error Handling and Toast Demo Component
 * 
 * Demonstrates all error handling and toast notification features.
 * This component can be used for testing and as a reference implementation.
 * 
 * Requirements: 20.1-20.7
 */

"use client";

import { useState } from "react";
import { LoadingButton } from "./LoadingButton";
import { GlassCard } from "./GlassCard";
import { adminToast } from "@/lib/admin/utils/toast";
import {
  withErrorHandling,
  withLoadingAndError,
  retryOperation,
  AdminError,
  ErrorType,
} from "@/lib/admin/utils/errorHandling";

export function ErrorHandlingDemo() {
  const [loading, setLoading] = useState(false);

  // Simulate successful operation
  const handleSuccess = async () => {
    await withLoadingAndError(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return true;
      },
      {
        operation: "demo success operation",
        setLoading,
        showToast: false,
      }
    );

    adminToast.success(
      "Operation completed successfully",
      "This toast will auto-dismiss after 5 seconds"
    );
  };

  // Simulate error operation
  const handleError = async () => {
    await withLoadingAndError(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new AdminError(
          "This is a simulated error",
          ErrorType.SERVER,
          500
        );
      },
      {
        operation: "demo error operation",
        setLoading,
        showToast: false,
      }
    );

    adminToast.error(
      "Operation failed",
      "This toast requires manual dismissal"
    );
  };

  // Simulate network error
  const handleNetworkError = async () => {
    await withLoadingAndError(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new AdminError(
          "Network connection failed",
          ErrorType.NETWORK
        );
      },
      {
        operation: "demo network error",
        setLoading,
        showToast: true, // Will show network error with retry suggestion
      }
    );
  };

  // Simulate warning
  const handleWarning = () => {
    adminToast.warning(
      "This is a warning",
      "Please review before proceeding"
    );
  };

  // Simulate info
  const handleInfo = () => {
    adminToast.info(
      "This is an info message",
      "Just letting you know"
    );
  };

  // Simulate loading toast
  const handleLoadingToast = async () => {
    const toastId = adminToast.loading("Processing...");
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    adminToast.dismiss(toastId);
    adminToast.success("Processing complete");
  };

  // Simulate promise toast
  const handlePromiseToast = async () => {
    const operation = new Promise((resolve) => {
      setTimeout(() => resolve("Success!"), 2000);
    });

    await adminToast.promise(operation, {
      loading: "Processing...",
      success: "Operation completed successfully",
      error: "Operation failed",
    });
  };

  // Simulate retry operation
  const handleRetry = async () => {
    setLoading(true);
    
    try {
      let attempts = 0;
      await retryOperation(
        async () => {
          attempts++;
          if (attempts < 3) {
            throw new AdminError("Simulated failure", ErrorType.NETWORK);
          }
          return "Success!";
        },
        {
          maxRetries: 3,
          initialDelay: 500,
          shouldRetry: (error) => error instanceof AdminError,
        }
      );
      
      adminToast.success(
        "Retry successful",
        `Succeeded after ${attempts} attempts`
      );
    } catch (error) {
      adminToast.error("All retry attempts failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Error Handling & Toast Demo
        </h3>
        <p className="text-sm text-gray-400">
          Test all error handling and toast notification features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Toast Types</h4>
          
          <LoadingButton
            loading={loading}
            onClick={handleSuccess}
            className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
          >
            Success Toast
          </LoadingButton>

          <LoadingButton
            loading={loading}
            onClick={handleError}
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
          >
            Error Toast
          </LoadingButton>

          <LoadingButton
            onClick={handleWarning}
            className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-amber-500/30"
          >
            Warning Toast
          </LoadingButton>

          <LoadingButton
            onClick={handleInfo}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30"
          >
            Info Toast
          </LoadingButton>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Advanced Features</h4>
          
          <LoadingButton
            loading={loading}
            onClick={handleNetworkError}
            className="w-full"
          >
            Network Error
          </LoadingButton>

          <LoadingButton
            onClick={handleLoadingToast}
            className="w-full"
          >
            Loading Toast
          </LoadingButton>

          <LoadingButton
            onClick={handlePromiseToast}
            className="w-full"
          >
            Promise Toast
          </LoadingButton>

          <LoadingButton
            loading={loading}
            onClick={handleRetry}
            className="w-full"
          >
            Retry Operation
          </LoadingButton>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Notes</h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Success toasts auto-dismiss after 5 seconds</li>
          <li>• Error toasts require manual dismissal</li>
          <li>• Network errors show retry suggestions</li>
          <li>• All toasts include icons for visual clarity</li>
          <li>• Toasts are positioned in top-right corner</li>
        </ul>
      </div>
    </GlassCard>
  );
}
