async function getPost(slug: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/posts/${slug}`, { cache: "no-store" });
  return res.json();
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const data = await getPost(params.slug);
  const post = data.post;

  if (!post) return <div className="opacity-70">Post not found.</div>;

  return (
    <article className="space-y-3">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm opacity-70">
        {post.authorType === "guest" ? post.authorName : "User"} • {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="border rounded-xl p-4 whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
