'use client'
import { useEffect, useState } from "react"
import Loader2 from "./Loader2"
import BlogCard from "./BlogCard"
import { useInView } from "react-intersection-observer"
import { getAllBlogs, searchProfiles } from "@/lib/api"
import ProfileCard from "./ProfileCard"
import MessageSlab from "./MessageSlab"

const SearchedBlogs = ({ query, totalblogsonpage, once = false }) => {
    const [pageno, setPageno] = useState(1)

    const [blogs, setBlogs] = useState([])
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [ended, setEnded] = useState(false)
    const [error, setError] = useState(null)
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: once })

    const fetchBlogs = async (totalblogsonpage, query) => {
        try {
            if (fetching || ended) return;
            setFetching(true)
            setLoading(true)
            if (query.startsWith('@')) {
                const data = await searchProfiles(pageno, query.slice(1))
                if (data.success) {
                    if (data.profiles.length == 0) {
                        setEnded(true);
                    } else {
                        setProfiles(prevProfile => [...prevProfile, ...data.profiles])
                        setPageno(pageno + 1)
                    }
                }
            } else {
                const data = await getAllBlogs(pageno, totalblogsonpage, query)
                if (data.success) {
                    if (data.blogs.length == 0) {
                        setEnded(true);
                    }
                    else {
                        setBlogs(prevBlogs => [...prevBlogs, ...data.blogs])
                        setPageno(pageno + 1)
                    }
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
            fetchBlogs(totalblogsonpage, query)
        }
    }, [inView, query])
    useEffect(() => {
        setBlogs([])
        setProfiles([])
        setPageno(1)
        setLoading(false)
        setFetching(false)
        setEnded(false)
    }, [query])
    return (
        <>
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            <ul className="card_grid p-0">
                {blogs && blogs.map((blog, index) => <BlogCard key={blog.blogs.id} post={blog}></BlogCard>)}
                {profiles && profiles.map((profile, index) => <ProfileCard user={profile} key={index} />)}
                {loading && <li className="flex justify-center items-center"><Loader2></Loader2></li>}
            </ul>
            <div ref={ref} style={{ height: '20px' }}></div>
        </>
    )
}
export default SearchedBlogs;