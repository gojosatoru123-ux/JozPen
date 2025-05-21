'use client'
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useInView } from "react-intersection-observer";
import Loader2 from "./Loader2";

const MyBlogs = ({id,isMyProfile}) => {
    const [blogs, setBlogs] = useState([])
    const [pageno,setPageno]=useState(1)
    const [loading,setLoading]=useState(false)
    const [fetching,setFetching]=useState(false)
    const [ended,setEnded]=useState(false)
    const [ref, inView]= useInView({threshold:0.8})
    const fetchBlogs = async (pageno) => {
        if(fetching || ended) return;
        setFetching(true)
        setLoading(true)
        const res = await fetch(`/api/blog/myBlogs?pageno=${pageno}&id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        if (data.success) {
            if(data.blogs.length==0){
                setEnded(true);
            }
            else{
                setBlogs(prevBlogs=>[...prevBlogs,...data.blogs]);
                setPageno(pageno+1);
            }
        }
        setLoading(false)
        setFetching(false)
    }
    useEffect(() => {
        if(inView){
            fetchBlogs(pageno);
        }
    }, [inView])
    return (
        <>
            <ul className="card_grid-sm">
                {blogs && blogs.map((blog) => <BlogCard key={blog.blogs.id} post={blog} isMyProfile={isMyProfile}></BlogCard>)}
                {loading && <li className="flex justify-center items-center"><Loader2></Loader2></li>}
                <div ref={ref} style={{height:'20px'}}></div>
            </ul>
        </>
    )
}
export default MyBlogs;