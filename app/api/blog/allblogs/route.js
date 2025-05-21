import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { blogs, usersTable } from "@/database/schema";
import { asc, desc, eq, ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const pageno = parseInt(url.searchParams.get("pageno"))
    const totalBlogsOnPage = parseInt(url.searchParams.get('totalblogsonpage'))
    const searchQuery = url.searchParams.get('query')
    const conditions = searchQuery ?
      or(ilike(blogs.title, `%${searchQuery}%`),
        ilike(blogs.excerpt, `%${searchQuery}%`),
        ilike(blogs.tags, `%${searchQuery}%`),
        ilike(blogs.categories, `%${searchQuery}%`))
      : undefined;
    const res = await db.select().from(blogs).where(conditions).orderBy(desc(blogs.createdAt)).limit(totalBlogsOnPage).offset(totalBlogsOnPage * pageno - totalBlogsOnPage).innerJoin(usersTable, eq(usersTable.email, blogs.author))
    if (!res) {
      return NextResponse.json({ success: false, error: "No blogs found" });
    }
    return NextResponse.json({ success: true, blogs: res })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
  }
}