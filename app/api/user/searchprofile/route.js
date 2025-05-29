import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { and, eq, ilike, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const url =new URL(request.url);
        const query = url.searchParams.get('query')
        const pageno = parseInt(url.searchParams.get("pageno"))

        const res = await db
            .select({
                    id: usersTable.id,
                    name: usersTable.name,
                    profileUrl: usersTable.profileUrl
            })
            .from(usersTable)
            .where(and(ilike(usersTable.name,`%${query}%`),ne(usersTable.id,session.id))).limit(10).offset(10*pageno-10);

        return NextResponse.json({ success: true, profiles: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
    }
}