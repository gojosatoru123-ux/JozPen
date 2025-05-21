// import { auth } from "@/auth";
// import { db } from "@/database/drizzle"
// import { blogs, usersTable } from "@/database/schema"
// import { eq } from "drizzle-orm"
// import { NextResponse } from "next/server";


// export async function GET(request) {
    
//     const session = await auth();

//     const url= new URL(request.url)
//     const id=url.searchParams.get('blogid')
//     const res = await db.select().from(blogs).where(eq(blogs.id,id)).innerJoin(usersTable,eq(usersTable.email,blogs.author))
//     if(!res){
//         return NextResponse.json({success:false,error:"No blog found"})
//     }
//     return NextResponse.json({success:true,blog:res})
// }