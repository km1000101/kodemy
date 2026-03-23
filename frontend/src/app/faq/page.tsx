"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "What is Kodemy?",
    a: "Kodemy is a learning management system (LMS) for structured video courses. Lessons are unlocked sequentially — you must complete one before accessing the next. Your watch progress is saved so you can resume anytime.",
  },
  {
    q: "How does progress tracking work?",
    a: "We save your position in each video every few seconds while you watch. When you mark a video as completed (or finish watching it), the next lesson unlocks. You can see your progress on your Profile page.",
  },
  {
    q: "Can I skip lessons?",
    a: "No. Lessons are locked until you complete the previous one. This is by design — we believe learning in order leads to better outcomes. Each topic builds on the last.",
  },
  {
    q: "How do I create an account?",
    a: "Click Register in the header or go to the login page and use the Create account link. You can also try the demo account (demo@kodemy.local / demo12345) to explore without signing up.",
  },
  {
    q: "Where is my data stored?",
    a: "Your progress and account information are stored on our servers. Video content is delivered via YouTube. We use cookies for session management and to keep you logged in.",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Password reset is not yet available in this version. If you need help, please contact us and we'll assist you.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-zinc-200 last:border-b-0"
      onClick={() => setOpen((o) => !o)}
    >
      <button
        type="button"
        className="w-full py-5 flex items-center justify-between gap-4 text-left hover:bg-zinc-50/50 -mx-4 px-4 rounded-lg transition-colors"
      >
        <span className="font-medium text-zinc-900">{q}</span>
        <span className={`text-zinc-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-sm text-zinc-600 leading-relaxed pr-12">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 lg:py-16">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-8 lg:p-10">
        <div className="text-sm font-medium text-[#a435f0]">Kodnest</div>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Frequently asked questions</h1>
        <p className="mt-4 text-zinc-600">
          Common questions about Kodemy and how it works.
        </p>

        <div className="mt-8 space-y-0">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-200">
          <p className="text-sm text-zinc-600">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-[#a435f0] hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
