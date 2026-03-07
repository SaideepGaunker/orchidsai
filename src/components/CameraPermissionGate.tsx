"use client";

import { useState } from "react";
import { Video, VideoOff, Mic, MicOff, AlertCircle } from "lucide-react";
import { useMediaDevices } from "@/hooks/useMediaDevices";
import { cn } from "@/lib/utils";

interface CameraPermissionGateProps {
  children: (stream: MediaStream) => React.ReactNode;
  fallback?: React.ReactNode;
}

export function CameraPermissionGate({ children, fallback }: CameraPermissionGateProps) {
  const { stream, error, isLoading, requestPermissions, cameraPermission, micPermission } = useMediaDevices();
  const [requested, setRequested] = useState(false);

  const handleRequest = async () => {
    setRequested(true);
    await requestPermissions();
  };

  if (stream) {
    return <>{children(stream)}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center"
      style={{ border: "1px solid rgba(251,146,60,0.15)", minHeight: "240px" }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        style={{ background: "linear-gradient(135deg, rgba(20,20,40,0.9), rgba(10,12,24,0.95))" }}>
        {error ? (
          <>
            <AlertCircle size={40} className="text-red-400 mb-4" />
            <p className="text-sm font-medium text-white mb-1">Camera & Microphone Required</p>
            <p className="text-xs text-white/40 mb-4 max-w-xs">{error}</p>
            <button
              onClick={handleRequest}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-sm font-medium text-black transition-all"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)" }}
            >
              Try Again
            </button>
          </>
        ) : !requested ? (
          <>
            <div className="flex gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
                <Video size={24} className="text-amber-400" />
              </div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                <Mic size={24} className="text-teal-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-white mb-1">Enable camera and microphone</p>
            <p className="text-xs text-white/40 mb-4">Required for interview recording and analysis</p>
            <button
              onClick={handleRequest}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-black transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#fb923c,#f59e0b)", boxShadow: "0 0 16px rgba(251,146,60,0.25)" }}
            >
              {isLoading ? "Requesting..." : "Allow Access"}
            </button>
          </>
        ) : (
          <p className="text-sm text-white/50">Loading...</p>
        )}
      </div>
    </div>
  );
}
