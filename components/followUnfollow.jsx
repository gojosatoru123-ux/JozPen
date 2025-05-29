"use client"

import { checkFollow, followUser } from "@/lib/api"
import { useEffect, useState } from "react"
import MessageSlab from "./MessageSlab"

const { Button } = require("./ui/button")

const FollowUnfollow = ({userId}) =>{
    const [isFollowing,setIsFollowing] = useState(false)
    const [loading,setLoading] = useState(false)
    const [fetching,setFetching] = useState(false)
    const [error,setError] =useState(null)
    const checkFollowStatus = async ()=>{
        const res = await checkFollow(userId)
        if(res.success){
            setIsFollowing(res.isFollowing)
        }
    }
    useEffect(()=>{
        checkFollowStatus()
    },[])
    const handleClick = async ()=>{
        if(fetching) return;
        setFetching(true)
        setLoading(true)
        try{
            const res=await followUser(userId)
            if(res.success){
                setIsFollowing(!isFollowing)
            }
        }catch(error){
            setError({ message: error.message, type: 'error', url: null });
        }finally{
            setLoading(false)
            setFetching(false)
        }
    }
    return (
        <>
        {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
        <Button className={`cursor-pointer shadow-[1px_1px_0px_0px_rgb(0,_0,_0)] border-4`} onClick={()=>handleClick()}>{loading?"loading...":isFollowing?"Unfollow":"Follow"}</Button>
        </>
    )
}
export default FollowUnfollow;