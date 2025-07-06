"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  mainImage: string;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Dashboard</h1>
      <div className="mb-4">
        <Link href="/admin/blog/new">
          <Button>+ Add New Blog Post</Button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div>No blog posts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <div className="relative w-full h-48">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.description}</p>
                <div className="mt-auto flex gap-2">
                  <Link href={`/admin/blog/edit/${post.id}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                  </Link>
                  {/* Delete button will be added in edit page for confirmation */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
