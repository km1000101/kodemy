import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Kodemy",
  description: "Learn about Kodemy — a Udemy-like LMS for ordered video learning with progress tracking.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-[#a435f0]/20 to-zinc-100 animate-fade-in">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop"
            alt="Team collaboration and learning"
            width={800}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 lg:p-10">
        <div className="text-sm font-medium text-[#a435f0] animate-fade-in animate-delay-100">Kodnest</div>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900 animate-fade-in-up animate-delay-200">About Kodemy</h1>
        <p className="mt-4 text-zinc-600 leading-relaxed">
          Kodemy is a learning management system (LMS) built for structured video education.
          Inspired by platforms like Udemy, it focuses on ordered curricula where each lesson
          unlocks only after you complete the previous one.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-zinc-900">Our mission</h2>
        <p className="mt-3 text-zinc-600 leading-relaxed">
          We believe that the best way to learn complex topics is in order. By locking
          prerequisites and tracking your progress, Kodemy helps you build skills
          systematically without the temptation to skip ahead and miss foundational concepts.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-zinc-900">How we&apos;re different</h2>
        <ul className="mt-3 space-y-2 text-zinc-600">
          <li className="flex items-start gap-2">
            <span className="text-[#a435f0] mt-0.5">•</span>
            <span><strong className="text-zinc-900">Sequential unlocking</strong> — Lessons unlock one by one as you complete them.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#a435f0] mt-0.5">•</span>
            <span><strong className="text-zinc-900">Watch progress</strong> — We save where you stopped so you can resume anytime.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#a435f0] mt-0.5">•</span>
            <span><strong className="text-zinc-900">Simple & focused</strong> — No clutter. Just courses, videos, and your progress.</span>
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-zinc-900">Technology</h2>
        <p className="mt-3 text-zinc-600 leading-relaxed">
          Kodemy is built with modern web technologies including Next.js, React, and a
          backend API. Video content is delivered via YouTube integration, with progress
          stored securely and associated with your account.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/subjects"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#a435f0] text-white font-semibold hover:bg-[#8710d8] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Browse courses
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 font-semibold hover:bg-zinc-50 transition-colors"
          >
            Contact us
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
