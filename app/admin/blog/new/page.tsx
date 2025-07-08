"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { slugify } from "@/lib/utils";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    content: "",
    mainImage: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(form.title) }));
    }
  }, [form.title]);

  // Handle image file selection and upload
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
	if (!form.mainImage || !(form.mainImage.startsWith("/") || form.mainImage.startsWith("http"))) {
		setError("يرجى رفع صورة رئيسية صالحة للمقال (يجب أن تبدأ بـ / أو http)");
		setLoading(false);
		return;
	}
    // TODO: Replace with actual admin user id from session
    const authorId = 1;
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, authorId }),
    });
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create post");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="p-6">
        <h1 className="text-xl font-bold mb-4">Add New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="slug" placeholder="Slug (URL path)" value={form.slug} onChange={handleChange} required />
          <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <Input name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required />
          <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required className="w-full h-32 p-2 border rounded" />
          <div>
            <label className="block mb-1 font-medium">الصورة الرئيسية</label>
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
            {uploading && <div className="text-sm text-gray-500">جاري رفع الصورة...</div>}
            {imagePreview && (imagePreview.startsWith("/") || imagePreview.startsWith("http")) && (
              <img src={imagePreview} alt="Preview" className="mt-2 rounded w-full max-h-48 object-cover" />
            )}
          </div>
          <Input name="seoTitle" placeholder="SEO Title" value={form.seoTitle} onChange={handleChange} />
          <Input name="seoDescription" placeholder="SEO Description" value={form.seoDescription} onChange={handleChange} />
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" disabled={loading || uploading}>{loading ? "Saving..." : "Create Post"}</Button>
        </form>
      </Card>
    </div>
  );
}
