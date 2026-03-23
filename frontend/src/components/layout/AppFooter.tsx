import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white/60 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-[#a435f0] text-white grid place-items-center font-semibold text-sm">K</span>
              <span className="font-bold text-zinc-900">Kodemy</span>
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              Learn in order. Track progress. Resume anytime.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Product</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/subjects" className="text-sm text-zinc-600 hover:text-[#a435f0]">Courses</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-zinc-600 hover:text-[#a435f0]">How it works</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-600 hover:text-[#a435f0]">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Company</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="text-sm text-zinc-600 hover:text-[#a435f0]">About</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-600 hover:text-[#a435f0]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Account</div>
            <ul className="mt-3 space-y-2">
              <li><Link href="/auth/login" className="text-sm text-zinc-600 hover:text-[#a435f0]">Login</Link></li>
              <li><Link href="/auth/register" className="text-sm text-zinc-600 hover:text-[#a435f0]">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span>© {new Date().getFullYear()} Kodemy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
