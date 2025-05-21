import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { blogs, usersTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Check user session
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse query parameters
    const url = new URL(request.url);
    const pagenoParam = url.searchParams.get("pageno");
    const id = url.searchParams.get("id");

    // 3. Validate parameters
    if (!pagenoParam || !id) {
      return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
    }

    const pageno = parseInt(pagenoParam);
    if (isNaN(pageno) || pageno < 1) {
      return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
    }

    // 4. Perform database query
    const res = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt))
      .limit(5)
      .offset(5 * (pageno - 1))
      .innerJoin(usersTable, eq(usersTable.email, blogs.author))
      .where(eq(usersTable.id, id));

    // 5. Check result
    if (!res) {
      return NextResponse.json({ success: false, error: "No blogs found" }, { status: 404 });
    }

    // 6. Return successful response
    return NextResponse.json({ success: true, blogs: res }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
  }
}
