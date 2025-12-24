"use client";

import AuthShell from "@/components/ui/AuthShell";
import GlassCard from "@/components/ui/GlassCard";
import { Badge, Divider } from "@/components/ui/misc";
import { TextInput } from "@/components/ui/inputs";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { ErrorText, FieldWrap, Label } from "@/components/ui/FormField";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

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
      toast.error("Fix the form errors");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Signup UI ready ✅");
  }

  return (
    <AuthShell>
      <GlassCard>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-sm text-zinc-600 mt-1">Get a link to receive anonymous messages.</p>
          </div>
          <Badge>Beta</Badge>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label>Username</Label>
            <FieldWrap ringClass="group-focus-within:ring-indigo-300/60">
              <TextInput
                placeholder="e.g. ram_01"
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                className="focus:ring-indigo-500"
              />
            </FieldWrap>
            <ErrorText>{usernameError}</ErrorText>
          </div>

          <div>
            <Label>Email</Label>
            <FieldWrap ringClass="group-focus-within:ring-fuchsia-300/60">
              <TextInput
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="focus:ring-fuchsia-500"
              />
            </FieldWrap>
            <ErrorText>{emailError}</ErrorText>
          </div>

          <div>
            <Label>Password</Label>
            <FieldWrap ringClass="group-focus-within:ring-emerald-300/60">
              <TextInput
                type="password"
                placeholder="8+ characters"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="focus:ring-emerald-500"
              />
            </FieldWrap>
            <ErrorText>{passwordError}</ErrorText>
          </div>

          <PrimaryButton loading={loading}>Create account</PrimaryButton>

          <Divider />

          <Link href="/login" className="block">
            <SecondaryButton type="button">I already have an account</SecondaryButton>
          </Link>

          <p className="text-xs text-zinc-600 text-center">
            By signing up, you agree to our <span className="underline">Terms</span> &{" "}
            <span className="underline">Privacy</span>.
          </p>
        </form>
      </GlassCard>
    </AuthShell>
  );
}
