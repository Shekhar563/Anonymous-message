"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(true);

  async function loadInbox() {
    setLoading(true);
    const res = await fetch("/api/messages/inbox");
    const data = await res.json();
    setLoading(false);

    if (!data.success) return toast.error(data.message || "Failed to load inbox");

    setMessages(data.messages || []);
    setAccepting(data.isAcceptingMessages);
  }

  async function toggleAccepting() {
    const res = await fetch("/api/messages/toggle", { method: "POST" });
    const data = await res.json();

    if (!data.success) return toast.error("Failed to update");
    setAccepting(data.isAcceptingMessages);
    toast.success("Settings updated");
  }

  async function copyLink() {
    const link = `${window.location.origin}/u/${session?.user?.username}`;
    await navigator.clipboard.writeText(link);
    toast.success("Profile link copied");
  }

  useEffect(() => {
    if (status === "authenticated") loadInbox();
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please login</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border rounded-xl p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Inbox</h1>
          <p className="text-sm opacity-70">
            Receive anonymous messages
          </p>
        </div>

        <button
          onClick={copyLink}
          className="border px-3 py-1 rounded-md"
        >
          Copy profile link
        </button>
      </div>

      {/* Toggle */}
      <div className="border rounded-xl p-4 flex items-center justify-between">
        <span>Accept new messages</span>
        <button
          onClick={toggleAccepting}
          className={`px-4 py-1 rounded-md border ${
            accepting ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {accepting ? "ON" : "OFF"}
        </button>
      </div>

      {/* Inbox */}
      <div className="space-y-3">
        {loading && <p>Loading messages...</p>}

        {!loading && messages.length === 0 && (
          <p className="opacity-70">No messages yet.</p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="border rounded-xl p-4">
            <p className="whitespace-pre-wrap">{msg.content}</p>
            <div className="text-xs opacity-60 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
