"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Anon<span className="text-zinc-500">Box</span>
        </Link>

        <nav className="flex gap-4 items-center text-sm">
          <Link href="/blog">Blog</Link>
          <Link href="/write">Write</Link>

          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button
                onClick={() => signOut()}
                className="text-zinc-500 hover:text-zinc-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/signup"
                className="rounded-lg bg-zinc-900 text-white px-3 py-1"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
