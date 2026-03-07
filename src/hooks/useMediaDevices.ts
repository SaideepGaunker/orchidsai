"use client";

import { useState, useEffect, useCallback } from "react";

export type MediaPermissionState = "prompt" | "granted" | "denied" | "unknown";

export interface MediaDevicesState {
  hasCamera: boolean;
  hasMic: boolean;
  cameraPermission: MediaPermissionState;
  micPermission: MediaPermissionState;
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
  requestPermissions: () => Promise<boolean>;
  stopStream: () => void;
}

async function getPermissionState(
  kind: "camera" | "microphone"
): Promise<MediaPermissionState> {
  try {
    const result = await navigator.permissions?.query({ name: kind as PermissionName });
    return (result?.state as MediaPermissionState) ?? "unknown";
  } catch {
    return "unknown";
  }
}

export function useMediaDevices(): MediaDevicesState {
  const [hasCamera, setHasCamera] = useState(false);
  const [hasMic, setHasMic] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<MediaPermissionState>("unknown");
  const [micPermission, setMicPermission] = useState<MediaPermissionState>("unknown");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: true,
      });

      setStream(mediaStream);
      setHasCamera(mediaStream.getVideoTracks().length > 0);
      setHasMic(mediaStream.getAudioTracks().length > 0);

      const camPerm = await getPermissionState("camera");
      const micPerm = await getPermissionState("microphone");
      setCameraPermission(camPerm);
      setMicPermission(micPerm);

      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to access camera/microphone";
      setError(msg);
      setStream(null);
      setHasCamera(false);
      setHasMic(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopStream = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  }, [stream]);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  return {
    hasCamera,
    hasMic,
    cameraPermission,
    micPermission,
    stream,
    error,
    isLoading,
    requestPermissions,
    stopStream,
  };
}
