'use client'
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useInView } from "react-intersection-observer";
import Loader2 from "./Loader2";
import { getMyBlogsApi } from "@/lib/api";
import MessageSlab from "./MessageSlab";

const MyBlogs = ({ id, isMyProfile }) => {
    const [blogs, setBlogs] = useState([])
    const [pageno, setPageno] = useState(1)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [ended, setEnded] = useState(false)
    const [error, setError] = useState(null)
    const [ref, inView] = useInView({ threshold: 0.8 })
    const fetchBlogs = async (pageno) => {
        if (fetching || ended) return;
        setFetching(true)
        setLoading(true)
        try {
            const data = await getMyBlogsApi(pageno, id)
            if (data.success) {
                if (data.blogs.length == 0) {
                    setEnded(true);
                }
                else {
                    setBlogs(prevBlogs => [...prevBlogs, ...data.blogs]);
                    setPageno(pageno + 1);
                }
            }
        }
        catch (error) {
            setError({ message: error.message, type: 'error', url: null });
        } finally {
            setLoading(false)
            setFetching(false)
        }
    }
    useEffect(() => {
        if (inView) {
            fetchBlogs(pageno);
        }
    }, [inView])
    return (
        <>
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            <ul className="card_grid-sm">
                {blogs && blogs.map((blog,index) => <BlogCard key={index} post={blog} isMyProfile={isMyProfile}></BlogCard>)}
                {loading && <li className="flex justify-center items-center"><Loader2></Loader2></li>}
                <div ref={ref} style={{ height: '20px' }}></div>
            </ul>
        </>
    )
}
export default MyBlogs;