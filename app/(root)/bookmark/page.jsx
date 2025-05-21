'use client'

import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";

export default function Bookmark() {
    const [bookmark, setBookmark] = useState([])
    const [removed,setRemoved]=useState(0)
    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
        setBookmark(bookmarks);
    }, [removed])
    return (
        <>
            <section className="pink_container pattern">
                <p className="tag">READ,WRITE AND LEARN</p>
                <h1 className="heading">Saved Articles here</h1>
            </section>
            <section className="section_container">
                <ul className="card_grid p">
                    {bookmark && bookmark.map((blog, index) => <BlogCard key={blog.blogs.id} post={blog} setRemoved={setRemoved}></BlogCard>)}
                    {bookmark.length === 0 && <p className="text-30-semibold">No Bookmarks</p>}
                </ul>
            </section>
        </>
    )
}
