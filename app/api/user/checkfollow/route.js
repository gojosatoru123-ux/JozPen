import { auth } from "@/auth"
import { db } from "@/database/drizzle";
import { followings } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET(request) {
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
        console.log(existingFollow)
        return NextResponse.json({ success: true, isFollowing: existingFollow }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
    }
}