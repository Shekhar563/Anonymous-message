"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function WritePage() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!title.trim() || !content.trim()) return toast.error("Title and content required");

    setLoading(true);
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, guestName }),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) return toast.error(data.message || "Failed to post");
    toast.success("Posted!");
    window.location.href = `/blog/${data.post.slug}`;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Write a post</h1>

      {!isLoggedIn && (
        <input
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Your name (optional)"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
      )}

      <input
        className="border rounded-md px-3 py-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border rounded-md px-3 py-2 w-full"
        placeholder="Write your post..."
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="border rounded-md px-4 py-2"
        disabled={loading}
        onClick={submit}
      >
        {loading ? "Posting..." : "Publish"}
      </button>
    </div>
  );
}
