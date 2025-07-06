import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  mainImage: string;
  createdAt: string;
};

async function getBlogPosts(): Promise<BlogPost[]> {
  // Use absolute URL for server-side fetch
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
    "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blog`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">المقالات</h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">لا توجد مقالات بعد.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
                <div className="relative w-full h-48">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <span className="text-xs text-gray-400 mt-auto">{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
