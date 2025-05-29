import { auth } from "@/auth"
import { db } from "@/database/drizzle";
import { followings } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const url = new URL(request.url)
        const followingId = url.searchParams.get('followingId')
        const myId = session.id

        const existing = (await db.select().from(followings).where(
            and(eq(followings.myId, myId), eq(followings.followingId, followingId))
        ));
        const existingFollow = existing.length > 0;

        if (existingFollow) {
            await db.delete(followings).where(
                and(eq(followings.myId, myId), eq(followings.followingId, followingId))
            );
            return NextResponse.json({ success: true ,message:"unfollowed"}, { status: 200 });
        } else {
            await db.insert(followings).values({
                myId,
                followingId,
            });
            return NextResponse.json({ success: true ,message:"followed" }, { status: 200 });
        }        
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
    }
}