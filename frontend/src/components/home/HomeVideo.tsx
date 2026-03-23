"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import YouTube from "react-youtube";

export function HomeVideo() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <AnimateOnScroll variant="fade-up" className="lg:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a435f0]">See it in action</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
              Watch how structured learning works
            </h2>
            <p className="mt-5 text-zinc-600 leading-relaxed">
              A popular talk on effective learning strategies — the same principles that power Kodemy.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="scale-in" delay={150} className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200/50">
              <div className="youtube-wrapper">
                <YouTube
                  videoId="8pDqJVdNa44"
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      rel: 0,
                      modestbranding: 1,
                      autoplay: 0,
                    },
                  }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
