"use client";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`h-5 w-5 border-2 border-zinc-200 border-t-zinc-950 rounded-full animate-spin ${className}`} />
  );
}

