"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    step: "1",
    title: "Choose a course",
    desc: "Browse subjects and pick one that matches your goals.",
  },
  {
    step: "2",
    title: "Watch in order",
    desc: "Complete each video to unlock the next. Progress saves automatically.",
  },
  {
    step: "3",
    title: "Track & resume",
    desc: "See your stats and pick up where you left off anytime.",
  },
];

export function HomeHowItWorks() {
  return (
    <section className="relative py-24 lg:py-32 bg-zinc-50/80">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(164,53,240,0.04),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#a435f0]">How it works</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
            Get started in three simple steps
          </h2>
          <p className="mt-4 text-zinc-600">
            No complexity. Just sign up, pick a course, and start learning.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 lg:mt-24">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((s, i) => (
              <AnimateOnScroll key={s.step} variant="fade-up" delay={i * 100}>
                <div className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-[#a435f0]/30 to-transparent" />
                  )}
                  <div className="relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#a435f0] text-lg font-bold text-white shadow-lg shadow-[#a435f0]/25">
                      {s.step}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-zinc-900">{s.title}</h3>
                    <p className="mt-3 text-zinc-600">{s.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <AnimateOnScroll variant="fade-up" delay={400} className="mt-16 text-center">
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
          >
            Explore courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
