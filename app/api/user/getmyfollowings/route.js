import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { followings, usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const res = await db
            .select({
                followingId: followings.followingId,
                createdAt: followings.createdAt,
                followedUser: {
                    id: usersTable.id,
                    name: usersTable.name,
                    profileUrl: usersTable.profileUrl,
                }
            })
            .from(followings)
            .innerJoin(usersTable, eq(followings.followingId, usersTable.id))
            .where(eq(followings.myId, session.id));

        return NextResponse.json({ success: true, followings: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
    }
}