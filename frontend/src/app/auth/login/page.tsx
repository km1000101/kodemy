"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { apiPost, ApiError } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const redirectTo = "/subjects";

  const [email, setEmail] = useState("demo@kodemy.local");
  const [password, setPassword] = useState("demo12345");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiPost("/api/auth/login", { email, password });
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setError("Invalid email or password.");
      else setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-6">
        <div>
          <div className="text-sm font-medium text-[#a435f0]">Kodnest</div>
          <h1 className="mt-1 text-xl font-semibold text-zinc-950">Login to Kodemy</h1>
          <p className="mt-2 text-sm text-zinc-600">Learn in order, track progress, resume anytime.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium text-zinc-900">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-900">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error ? <Alert>{error}</Alert> : null}

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-sm text-zinc-600">
            New here?{" "}
            <a href="/auth/register" className="font-medium text-[#a435f0] hover:text-[#8710d8] hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

