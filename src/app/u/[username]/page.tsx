"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function PublicMessagePage({ params }: { params: { username: string } }) {
  const username = params.username;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!content.trim()) return toast.error("Write a message first");

    setLoading(true);
    const res = await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, content }),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) return toast.error(data.message || "Failed to send");
    toast.success("Sent anonymously ✅");
    setContent("");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  }

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <div className="border rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">@{username}</h1>
          <button className="underline" onClick={copyLink}>Copy link</button>
        </div>

        <p className="text-sm opacity-80">
          Send an anonymous message. Your identity will not be shown.
        </p>

        <textarea
          className="border rounded-md px-3 py-2 w-full"
          rows={6}
          placeholder="Write your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="border rounded-md px-4 py-2 w-full" disabled={loading} onClick={send}>
          {loading ? "Sending..." : "Send anonymously"}
        </button>
      </div>
    </div>
  );
}
