import Link from "next/link";

export const metadata = {
  title: "How Kodemy works",
  description: "Learn how Kodemy's sequential learning and progress tracking work.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-8 lg:p-10">
        <div className="text-sm font-medium text-[#a435f0]">Kodnest</div>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">How Kodemy works</h1>
        <p className="mt-4 text-zinc-600 leading-relaxed">
          Kodemy is built around one idea: learn in order. Here&apos;s how it all fits together.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">1. Subjects & courses</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">
              Each subject (course) contains sections, and each section has videos. All videos
              are ordered globally. When you start a subject, only the first video is unlocked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">2. Sequential unlocking</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">
              Complete a video to unlock the next one. You can&apos;t skip ahead — this ensures
              you build skills in the right order and don&apos;t miss foundational concepts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">3. Progress tracking</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">
              Your watch position is saved every few seconds. When you come back, you can resume
              from where you left off. Completing a video (watching to the end or marking done)
              updates your progress and unlocks the next lesson.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">4. Your profile</h2>
            <p className="mt-2 text-zinc-600 leading-relaxed">
              The Profile page shows your progress across all subjects — how many videos
              you&apos;ve completed and what percentage of each course is done. Use it to
              decide where to pick up next.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/subjects"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#a435f0] text-white font-semibold hover:bg-[#8710d8] transition-colors"
          >
            Browse courses
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 font-semibold hover:bg-zinc-50 transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
