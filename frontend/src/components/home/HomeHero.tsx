"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HomeHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#fafafa_0%,#f5f5f5_50%,#fafafa_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(164,53,240,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(164,53,240,0.06),transparent_50%)]" />
      <div className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-[#a435f0]/5 blur-3xl" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-[#a435f0]/[0.03] blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div
              className={`transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="inline-block rounded-full border border-[#a435f0]/25 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#a435f0]">
                Kodnest
              </span>
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                Learn in order.
                <br />
                <span className="text-[#a435f0]">Track progress.</span>
                <br />
                Resume anytime.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-xl">
                Master topics step by step with locked prerequisites. No skipping ahead — build skills the right way.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/subjects"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#a435f0] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#a435f0]/25 hover:bg-[#8710d8] hover:shadow-[#8710d8]/30 transition-all hover:-translate-y-0.5"
                >
                  Browse courses
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center rounded-xl border-2 border-zinc-300 bg-white px-6 py-3.5 text-base font-semibold text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Visual + Demo */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch">
            <div
              className={`relative w-full max-w-md lg:max-w-none lg:flex-1 order-2 lg:order-1 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
              }`}
            >
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200/50">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=700&fit=crop"
                  alt="People learning together"
                  width={600}
                  height={700}
                  className="object-cover w-full aspect-[4/5] lg:aspect-auto lg:h-[480px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 backdrop-blur-sm p-3 shadow-lg">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a435f0] to-[#8710d8] border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">1,000+ learners</div>
                    <div className="text-xs text-zinc-500">Active this week</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`shrink-0 w-full max-w-sm lg:w-80 order-1 lg:order-2 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a435f0]/10">
                    <svg className="w-5 h-5 text-[#a435f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">Try it free</span>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="text-zinc-500">Email</span>
                    <div className="mt-0.5 font-mono text-zinc-900">demo@kodemy.local</div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Password</span>
                    <div className="mt-0.5 font-mono text-zinc-900">demo12345</div>
                  </div>
                </div>
                <Link
                  href="/auth/login"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Use demo account
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
