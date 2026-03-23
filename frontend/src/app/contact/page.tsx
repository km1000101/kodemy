"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Simulate form submission — no backend endpoint for contact yet
      await new Promise((r) => setTimeout(r, 800));
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 lg:py-16">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-8 lg:p-10">
        <div className="text-sm font-medium text-[#a435f0]">Kodnest</div>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Contact us</h1>
        <p className="mt-4 text-zinc-600 leading-relaxed">
          Have a question, feedback, or need support? Send us a message and we&apos;ll get back to you.
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
            <div className="font-semibold">Message sent</div>
            <p className="mt-1 text-sm">
              Thank you for reaching out. We&apos;ll respond as soon as possible.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium text-zinc-900">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                required
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#a435f0]/30 focus:border-[#a435f0] resize-y min-h-[120px]"
              />
            </div>

            {error ? <Alert>{error}</Alert> : null}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-zinc-200">
          <div className="text-sm font-semibold text-zinc-900">Other ways to reach us</div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>• Email: support@kodemy.local</li>
            <li>• FAQ: <Link href="/faq" className="text-[#a435f0] hover:underline">Frequently asked questions</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
