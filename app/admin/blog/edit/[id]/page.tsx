"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  seoTitle: string;
  seoDescription: string;
};

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/blog/admin/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setForm(data);
            setImagePreview(data.mainImage);
          }
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (form.title) {
      const newSlug = slugify(form.title);
      setForm((prev) => ({ ...prev, slug: newSlug }));
    }
  }, [form.title]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setForm((prev) => ({ ...prev, mainImage: data.filePath }));
      setImagePreview(data.filePath);
    } else {
      const data = await res.json();
      setError(data.message || "Image upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: parseInt(id) }),
    });
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update post");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parseInt(id) }),
      });
      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete post");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="p-6">
        <h1 className="text-xl font-bold mb-4">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="slug" placeholder="Slug" value={form.slug || ""} onChange={handleChange} required />
          <Input name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} required />
          <Input name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} required />
          <textarea name="content" placeholder="Content" value={form.content || ""} onChange={handleChange} required className="w-full h-32 p-2 border rounded" />
          <div>
            <label className="block mb-1 font-medium">Main Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
            {uploading && <div className="text-sm text-gray-500">Uploading...</div>}
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 rounded w-full max-h-48 object-cover" />}
          </div>
          <Input name="seoTitle" placeholder="SEO Title" value={form.seoTitle || ""} onChange={handleChange} />
          <Input name="seoDescription" placeholder="SEO Description" value={form.seoDescription || ""} onChange={handleChange} />
          <div className="flex justify-between">
            <Button type="submit" disabled={loading || uploading}>{loading ? "Saving..." : "Update Post"}</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
