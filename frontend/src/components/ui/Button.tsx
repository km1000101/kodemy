"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:opacity-60 disabled:cursor-not-allowed";
  const v =
    variant === "secondary"
      ? "border border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-50"
      : "bg-[#a435f0] text-white hover:bg-[#8710d8]";

  return <button className={`${base} ${v} ${className}`} {...props} />;
}

