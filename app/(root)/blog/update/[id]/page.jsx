import { auth } from "@/auth";
import { db } from "@/database/drizzle"
import { blogs, usersTable } from "@/database/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import AddBlogClient from "@/components/AddBlogClient";

export default async function Update({ params }) {
    const id = (await params).id
    const session = await auth()
    if (!id) return notFound();
    let res;
    try {
        res = await db.select().from(blogs).where(eq(blogs.id, id)).innerJoin(usersTable, eq(usersTable.email, blogs.author))
        if (res.length == 0) {
            return notFound();
        }
    } catch (error) {
        return notFound();
    }
    const data = res[0]
    if(session?.id!=data.usersTable.id){
        return notFound()
    }
    return (
        <>
            {data && <AddBlogClient initialContent={data} session={session} isUpdate={true}></AddBlogClient>}
        </>
    )
}