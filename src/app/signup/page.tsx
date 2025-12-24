"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    toast.success("Signup demo UI 😄");
    setLoading(false);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold mb-1">Create account</h1>
        <p className="text-sm text-zinc-500 mb-4">
          Start receiving anonymous messages
        </p>

        <form className="space-y-3" onSubmit={submit}>
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <Button loading={loading} className="w-full">
            Signup
          </Button>
        </form>
      </Card>
    </div>
  );
}
