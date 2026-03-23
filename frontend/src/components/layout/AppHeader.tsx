"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function checkAuthed() {
  // We don’t have a `/me` endpoint in this MVP; this protected endpoint is enough.
  const res = await fetch(`${API_BASE}/api/subjects/1/tree`, {
    credentials: "include",
  });
  return res.ok;
}

export function AppHeader() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthed()
      .then((ok) => setAuthed(ok))
      .catch(() => setAuthed(false));
  }, []);

  async function onLogout() {
    await fetch(`${API_BASE}/api/auth/logout`, { method: "POST", credentials: "include" });
    router.push("/auth/login");
  }

  return (
    <header className="border-b border-zinc-200/60 bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-[#a435f0] text-white grid place-items-center font-semibold">
            K
          </span>
          <div className="leading-tight hidden sm:block">
            <div className="text-xs text-zinc-500">Kodnest</div>
            <div className="font-bold text-zinc-900">Kodemy</div>
          </div>
        </Link>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <input
            type="search"
            placeholder="Search for anything"
            className="w-full rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#a435f0]/30 focus:border-[#a435f0]"
          />
        </div>

        <nav className="flex items-center gap-1">
          <Link
            className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hidden sm:inline-block"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hidden sm:inline-block"
            href="/subjects"
          >
            Courses
          </Link>
          <Link
            className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hidden md:inline-block"
            href="/about"
          >
            About
          </Link>
          {authed === true ? (
            <>
              <Link
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-950 hover:bg-zinc-100"
                href="/profile"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#a435f0] hover:bg-[#8710d8]"
              >
                Logout
              </button>
            </>
          ) : authed === false ? (
            <>
              <Link
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-950 hover:bg-zinc-100"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#a435f0] hover:bg-[#8710d8]"
                href="/auth/register"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="w-28 h-8 bg-zinc-100 rounded-lg animate-pulse" />
          )}
        </nav>
      </div>
    </header>
  );
}

