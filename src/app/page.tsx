import Link from "next/link";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4 pt-20">
        <h1 className="text-4xl font-bold">
          Receive anonymous messages.  
          <br />Write freely.
        </h1>
        <p className="text-zinc-600 max-w-xl mx-auto">
          Create a profile to receive anonymous messages or publish posts as a guest.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup" className="rounded-xl bg-zinc-900 text-white px-6 py-3">
            Get started
          </Link>
          <Link href="/blog" className="rounded-xl border px-6 py-3">
            Read blogs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-4">
        {[
          "Anonymous messages",
          "Guest blog posts",
          "Private inbox",
        ].map((t) => (
          <Card key={t}>
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-zinc-600 mt-2">
              Simple, private and fast.
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
