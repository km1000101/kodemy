"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function HomeCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(164,53,240,0.2),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#a435f0]/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#a435f0]/5 blur-3xl" />

      <AnimateOnScroll variant="fade-up" className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Ready to learn?
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          Create a free account and start your first course today.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#a435f0] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#a435f0]/30 hover:bg-[#8710d8] hover:shadow-[#8710d8]/40 transition-all hover:-translate-y-0.5"
          >
            Create free account
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-xl border border-zinc-600 bg-transparent px-8 py-4 text-base font-semibold text-white hover:bg-white/5 hover:border-zinc-500 transition-colors"
          >
            Learn more
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
