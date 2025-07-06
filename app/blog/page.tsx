import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <div className="min-h-screen bg-white flex flex-col" dir="ltr">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div className="relative pt-32 pb-48 px-4 text-white text-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="/static/images/blogs.png"
                alt="Blog Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2">المقالات</h1>
              <p className="text-2xl">أحدث المقالات والأخبار</p>
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

        {/* Blog Cards Grid */}
        <div className="container mx-auto px-4 py-12 -mt-8 relative z-10" dir="rtl">
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
      </main>
      <Footer />
    </div>
  );
}
