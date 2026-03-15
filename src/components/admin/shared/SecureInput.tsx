import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  sanitize?: boolean;
  validate?: boolean;
}

export function SecureInput({ className, sanitize, validate, ...props }: SecureInputProps) {
  return (
    <Input
      {...props}
      className={cn(
        "bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20",
        "text-white placeholder:text-gray-500 rounded-xl px-4 py-3 backdrop-blur-xl transition-all duration-200",
        className
      )}
    />
  );
}

interface SecureTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  sanitize?: boolean;
  validate?: boolean;
}

export function SecureTextarea({ className, sanitize, validate, ...props }: SecureTextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "bg-white/5 border border-white/10 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20",
        "text-white placeholder:text-gray-500 rounded-xl px-4 py-3 backdrop-blur-xl transition-all duration-200",
        "w-full min-h-[100px] resize-y",
        className
      )}
    />
  );
}
