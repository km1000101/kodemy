"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton-shimmer relative overflow-hidden rounded-xl ${className}`} />;
}

