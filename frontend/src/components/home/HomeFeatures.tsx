"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const features = [
  {
    title: "Sequential learning",
    description: "Lessons unlock one by one. No skipping — build skills in the right order.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Progress tracking",
    description: "Your watch position is saved. Resume from anywhere, anytime.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Resume anytime",
    description: "Life gets busy. Pick up exactly where you left off — no re-watching.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function HomeFeatures() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#fafafa_50%,transparent_100%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Section intro */}
          <AnimateOnScroll variant="fade-up" className="lg:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a435f0]">Why Kodemy</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
              Structured learning designed to keep you on track.
            </h2>
            <p className="mt-5 text-zinc-600 leading-relaxed">
              We built Kodemy for learners who want to master topics in order — without the temptation to skip ahead.
            </p>
            <Link
              href="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#a435f0] hover:text-[#8710d8] transition-colors"
            >
              Learn how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimateOnScroll>

          {/* Right: Feature cards - bento style */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <AnimateOnScroll key={f.title} variant="fade-up" delay={i * 80}>
                  <div className="group relative h-full rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#a435f0]/20 transition-all duration-300">
                    <div className="absolute top-8 right-8 text-6xl font-bold text-zinc-100 group-hover:text-[#a435f0]/10 transition-colors">
                      0{i + 1}
                    </div>
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a435f0]/10 text-[#a435f0] group-hover:bg-[#a435f0]/20 transition-colors">
                      {f.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-zinc-900">{f.title}</h3>
                    <p className="mt-3 text-zinc-600 leading-relaxed">{f.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
