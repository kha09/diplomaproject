import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
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
    <div className="min-h-screen bg-white flex flex-col" dir="ltr">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div className="relative pt-32 pb-48 px-4 text-white text-center">
            <div className="absolute inset-0 z-0">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2">{post.title}</h1>
              <p className="text-2xl">{post.description}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-4 py-12 -mt-8 relative z-10" dir="rtl">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: typeof post.content === "string" ? post.content : "" }}
          />
          <div className="text-xs text-gray-400 mt-8 text-left">
            {new Date(post.createdAt).toLocaleDateString("ar-EG")}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
