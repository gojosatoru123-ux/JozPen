'use client'
import { useEffect, useState } from "react"
import Loader2 from "./Loader2"
import BlogCard from "./BlogCard"
import { useInView } from "react-intersection-observer"

const SearchedBlogs=({query,totalblogsonpage,once=false})=>{
    const [pageno,setPageno]=useState(1)

    const [blogs,setBlogs]=useState([])
    const [loading,setLoading]=useState(false)
    const [fetching,setFetching]=useState(false)
    const [ended,setEnded]=useState(false)
    const [ref,inView]=useInView({threshold:0.2,triggerOnce:once})

    const fetchBlogs = async(totalblogsonpage,query)=>{
        if(fetching || ended) return;
        setFetching(true)
        setLoading(true)
        const res = await fetch(`api/blog/allblogs?pageno=${pageno}&totalblogsonpage=${totalblogsonpage}&query=${query}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data =await res.json()
        if(data.success){
            if(data.blogs.length==0){
                setEnded(true);
            }
            else{
                setBlogs(prevBlogs=>[...prevBlogs,...data.blogs])
                setPageno(pageno+1)
            }
        }
        setLoading(false)
        setFetching(false)
    }
    useEffect(()=>{
        if(inView){
            fetchBlogs(totalblogsonpage,query)
        }
    },[inView,query])
    useEffect(()=>{
        setBlogs([])        
        setPageno(1)
        setLoading(false)
        setFetching(false)
    },[query])
    return (
        <>
        <ul className="card_grid p-0">
        {blogs && blogs.map((blog,index)=><BlogCard key={blog.blogs.id} post={blog}></BlogCard>)}
        {loading && <li className="flex justify-center items-center"><Loader2></Loader2></li>}
        </ul>
        <div ref={ref} style={{height:'20px'}}></div>
        </>
    )
}
export default SearchedBlogs;