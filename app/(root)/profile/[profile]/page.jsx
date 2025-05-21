// 'use client'

import { auth } from "@/auth"
import MyBlogs from "@/components/MyBlogs";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

// import BlogCard from "@/components/BlogCard";
// import { useEffect, useState } from "react"
// async function — this makes it a server component (or a server-side function in older versions of Next.js). so hooks not work here
export default async function Profile({ params }) {
    const id = (await params).profile
    if (!id) return notFound();
    const session = await auth();
    let userData;
    try{
        userData = (await db.select().from(usersTable).where(eq(usersTable.id, id)))[0]
        if(userData.length==0){
            return notFound();
        }
    }catch(error){
        return notFound();
    }
    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">
                            {userData.name}
                        </h3>
                    </div>
                    <Image src={userData.profileUrl} alt={userData.name} width={220} height={220} className="profile_image"></Image>
                    <p className="font-extrabold mt-7 text-center text-black">@{userData.name}</p>
                </div>
                <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                    <p className="text-30-bold">{session?.id === id ? "Your" : "All"} Blogs</p>
                    <MyBlogs id={id} isMyProfile={session?.id===id}></MyBlogs>
                </div>
            </section>
        </>
    )
}
