"use client";

import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      className={`w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#a435f0]/30 focus:border-[#a435f0] ${className}`}
      {...rest}
    />
  );
}

