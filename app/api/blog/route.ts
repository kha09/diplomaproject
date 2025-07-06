import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Helper to check admin
async function isAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

// GET: List all blog posts (public)
export async function GET(req: NextRequest) {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      mainImage: true,
      createdAt: true,
      seoTitle: true,
      seoDescription: true,
    },
  });
  return NextResponse.json(posts);
}

// POST: Create a new blog post (admin only)
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const { slug, title, description, content, mainImage, seoTitle, seoDescription, authorId } = data;
  if (!slug || !title || !content || !mainImage || !authorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        description,
        content,
        mainImage,
        seoTitle,
        seoDescription,
        authorId,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// PUT: Update a blog post (admin only)
export async function PUT(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const { id, slug, title, description, content, mainImage, seoTitle, seoDescription } = data;
  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        content,
        mainImage,
        seoTitle,
        seoDescription,
      },
    });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE: Delete a blog post (admin only)
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
