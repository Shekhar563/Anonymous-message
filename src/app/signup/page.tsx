"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

function passwordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
}

function scoreLabel(score: number) {
  if (score <= 1) return "Weak";
  if (score === 2) return "Okay";
  if (score === 3) return "Good";
  return "Strong";
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [shake, setShake] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const score = useMemo(() => passwordScore(form.password), [form.password]);
  const pwText = useMemo(() => scoreLabel(score), [score]);

  const usernameError =
    form.username && form.username.length < 3 ? "Username must be 3+ chars" : "";
  const emailError =
    form.email && !/.+\@.+\..+/.test(form.email) ? "Enter a valid email" : "";
  const passwordError =
    form.password && form.password.length < 8 ? "Password must be 8+ chars" : "";

  const hasError = Boolean(usernameError || emailError || passwordError);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (hasError || !form.username || !form.email || !form.password) {
      toast.error("Please fix the form errors");
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }

    setLoading(true);

    // Demo: simulate API
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    toast.success("Signup UI ready ✅ (next: connect API + verify)");
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-fuchsia-100 to-emerald-100" />
      {/* Soft blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-300/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/50 blur-3xl" />

      {/* Card wrapper */}
      <div className="relative w-full max-w-md">
        <div
          className={[
            "rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-xl",
            "transition-transform",
            shake ? "animate-[shake_0.45s_ease-in-out]" : "",
          ].join(" ")}
        >
          {/* Top gradient bar */}
          <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />

          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Create your account
                </h1>
                <p className="text-sm text-zinc-600 mt-1">
                  Get a link to receive anonymous messages.
                </p>
              </div>

              {/* Tiny badge */}
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/60 border border-white/60">
                Beta
              </span>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {/* Username */}
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  Username
                </label>
                <div className="mt-1 group relative">
                  <Input
                    placeholder="e.g. ram_01"
                    value={form.username}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, username: e.target.value }))
                    }
                    className="bg-white/80 border-zinc-200 focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-focus-within:ring-indigo-300/60" />
                </div>
                {usernameError && (
                  <p className="mt-1 text-xs text-red-600">{usernameError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  Email
                </label>
                <div className="mt-1 group relative">
                  <Input
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-white/80 border-zinc-200 focus:ring-2 focus:ring-fuchsia-500"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-focus-within:ring-fuchsia-300/60" />
                </div>
                {emailError && (
                  <p className="mt-1 text-xs text-red-600">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    placeholder="Create a strong password"
                    type={showPw ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="bg-white/80 border-zinc-200 pr-20 focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-3 py-1 rounded-lg border bg-white/70 hover:bg-white transition"
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Strength meter */}
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-600">
                      Strength: <span className="font-medium">{pwText}</span>
                    </p>
                    <p className="text-xs text-zinc-500">
                      {Math.min(form.password.length, 32)}/32
                    </p>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-200/70 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 transition-all"
                      style={{ width: `${(score / 4) * 100}%` }}
                    />
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={[
                  "w-full rounded-2xl px-4 py-3 font-semibold text-white",
                  "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-600",
                  "hover:brightness-110 transition shadow-lg shadow-indigo-500/20",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-300/60" />
                <span className="text-xs text-zinc-600">or</span>
                <div className="h-px flex-1 bg-zinc-300/60" />
              </div>

              {/* Secondary actions */}
              <div className="grid gap-2">
                <Link
                  href="/login"
                  className="w-full text-center rounded-2xl px-4 py-3 font-semibold border border-zinc-300 bg-white/60 hover:bg-white transition"
                >
                  I already have an account
                </Link>

                <p className="text-xs text-zinc-600 text-center">
                  By signing up, you agree to our{" "}
                  <span className="underline">Terms</span> &{" "}
                  <span className="underline">Privacy</span>.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Tiny footer hint */}
        <p className="text-center text-xs text-zinc-700 mt-4">
          Tip: After signup you’ll verify email, then your profile link will be:{" "}
          <span className="font-medium">/u/yourname</span>
        </p>
      </div>

      {/* Tailwind keyframes for shake */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-8px);
          }
          40% {
            transform: translateX(8px);
          }
          60% {
            transform: translateX(-6px);
          }
          80% {
            transform: translateX(6px);
          }
        }
      `}</style>
    </div>
  );
}
