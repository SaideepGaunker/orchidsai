"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface RecordedSegment {
  blob: Blob;
  type: "video" | "audio";
  duration: number;
}

export interface VideoRecorderProps {
  stream: MediaStream | null;
  isRecording: boolean;
  onStart?: () => void;
  onStop?: (videoBlob: Blob | null, audioBlob: Blob | null, duration: number) => void;
}

export function useVideoRecorder(stream: MediaStream | null) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = useCallback(() => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      // Video blob from combined stream
      const videoBlob = chunksRef.current.length > 0
        ? new Blob(chunksRef.current, { type: "video/webm" })
        : null;

      // Audio extraction: get audio track and create separate blob
      const audioTracks = stream.getAudioTracks();
      let audioBlob: Blob | null = null;
      if (audioTracks.length > 0) {
        // For audio extraction we'd need a separate MediaRecorder with only audio
        // For now we use the same blob - full impl would record audio separately
        audioBlob = videoBlob; // Placeholder: same as video for mock
      }

      const duration = (Date.now() - startTimeRef.current) / 1000;
      return { videoBlob, audioBlob, duration };
    };

    recorder.start(1000);
    startTimeRef.current = Date.now();
    setIsRecording(true);
  }, [stream]);

  const stopRecording = useCallback(
    (onStop?: (videoBlob: Blob | null, audioBlob: Blob | null, duration: number) => void) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state !== "recording") return;

      recorder.onstop = () => {
        const videoBlob = chunksRef.current.length > 0
          ? new Blob(chunksRef.current, { type: "video/webm" })
          : null;
        const audioBlob = videoBlob; // Mock: same blob
        const duration = (Date.now() - startTimeRef.current) / 1000;
        setIsRecording(false);
        onStop?.(videoBlob, audioBlob, duration);
      };

      recorder.stop();
    },
    []
  );

  return { isRecording, startRecording, stopRecording };
}

export function VideoFeed({
  stream,
  muted = true,
  className = "",
}: {
  stream: MediaStream | null;
  muted?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current || !stream) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  if (!stream) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      className={className}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
}
