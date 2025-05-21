import { auth } from "@/auth";
import { blogs } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle"; // Ensure you import the db instance
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    // 1. Auth check
    const session  = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get and validate ID
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    // 3. Attempt deletion
    const res = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning({ id: blogs.id });

    // 4. Check if anything was deleted
    if (!res || res.length === 0) {
      return NextResponse.json({ success: false, error: "No blog found to delete" }, { status: 404 });
    }

    // 5. Return success response
    return NextResponse.json({ success: true, deletedBlogs: res }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
  }
}
