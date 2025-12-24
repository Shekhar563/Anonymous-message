import Link from "next/link";

async function getPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/posts`, { cache: "no-store" });
  return res.json();
}

export default async function BlogPage() {
  const data = await getPosts();
  const posts = data.posts ?? [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Blog</h1>

      <div className="grid gap-3">
        {posts.map((p: any) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="border rounded-xl p-4 hover:opacity-90">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm opacity-70">
              {p.authorType === "guest" ? p.authorName : "User"} • {new Date(p.createdAt).toLocaleString()}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && <p className="opacity-70">No posts yet.</p>}
    </div>
  );
}
