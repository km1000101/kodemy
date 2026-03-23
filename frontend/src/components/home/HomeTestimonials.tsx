"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const testimonials = [
  {
    quote: "The locked progression kept me accountable. No more skipping ahead and getting lost.",
    name: "Alex M.",
    role: "Software developer",
    rating: 5,
  },
  {
    quote: "Love that it remembers where I left off. Makes it easy to learn in short sessions.",
    name: "Sam K.",
    role: "Designer",
    rating: 5,
  },
  {
    quote: "Simple, focused, and effective. Exactly what I needed to learn systematically.",
    name: "Jordan L.",
    role: "Product manager",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function HomeTestimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-zinc-50/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up" className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#a435f0]">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
            What learners say
          </h2>
          <p className="mt-4 text-zinc-600">
            Join others mastering skills with structured learning.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={t.name} variant="fade-up" delay={i * 80}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <Stars count={t.rating} />
                <p className="mt-4 flex-1 text-zinc-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a435f0] to-[#8710d8] text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900">{t.name}</div>
                    <div className="text-sm text-zinc-500">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
