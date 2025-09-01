import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { blogs, usersTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(){
    try{
    const session = await auth();
    const res= await db.select().from(blogs).where(eq(blogs.author,'dindayalsinha301@gmail.com')).orderBy(desc(blogs.createdAt)).limit(1).innerJoin(usersTable,eq(usersTable.email,blogs.author))
    if(!res){
        return NextResponse.json({ success: false, error: "No blogs found" })
    }
    return NextResponse.json({ success: true, blogs: res })}
    catch(error){
        return NextResponse.json({ error: "Internal server error", details: error.message || "Unknown error" }, { status: 500 });
    }
}