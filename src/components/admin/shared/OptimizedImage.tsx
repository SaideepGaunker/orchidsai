/**
 * Optimized Image Component
 * 
 * Wrapper around Next.js Image component with admin portal styling
 * and performance optimizations
 */

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  showLoader?: boolean;
  loaderClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.png",
  showLoader = true,
  loaderClassName,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && showLoader && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-lg",
            loaderClassName
          )}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        </div>
      )}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Avatar Image Component
 * 
 * Optimized for user avatars with circular styling
 */
interface AvatarImageProps extends Omit<OptimizedImageProps, "width" | "height"> {
  size?: number;
  name?: string; // For fallback initials
}

export function AvatarImage({
  src,
  alt,
  size = 40,
  name,
  className,
  ...props
}: AvatarImageProps) {
  const [error, setError] = useState(false);

  // Generate initials from name
  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-semibold",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setError(true)}
      className={cn("rounded-full object-cover", className)}
      {...props}
    />
  );
}
