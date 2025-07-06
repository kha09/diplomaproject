import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Use absolute URL for server-side fetch
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
    "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blog?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.find((p: BlogPost) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.description,
      images: [{ url: post.mainImage }],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Image
          src={post.mainImage}
          alt={post.title}
          width={900}
          height={400}
          className="rounded-lg object-cover w-full h-64"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: typeof post.content === "string" ? post.content : "" }}
      />
      <div className="text-xs text-gray-400 mt-8 text-right">
        {new Date(post.createdAt).toLocaleDateString("ar-EG")}
      </div>
    </div>
  );
}
