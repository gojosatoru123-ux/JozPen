"use client"

import Loader2 from "@/components/Loader2"
import MessageSlab from "@/components/MessageSlab"
import { getMyFollowings } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Followings() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        const handleData = async () => {
            if (fetching) return;
            setFetching(true)
            setLoading(true)
            try {
                const res = await getMyFollowings()
                if (res.success) {
                    setData(res.followings)
                }
            } catch (error) {
                setError({ message: error.message, type: 'error', url: null });
            } finally {
                setLoading(false)
                setFetching(false)
            }
        }
        handleData()
    }, [])
    return (
        <>
            {loading && <Loader2 />}
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            <section className="pink_container pattern">
                <p className="tag">READ,WRITE AND LEARN</p>
                <h1 className="heading">"For the thinkers, ranters, and midnight typers"</h1>
                <p className="sub-heading !max-w-3xl">
                    A platform for thinkers, feelers, overthinkers, and under-sharers. Whether you’re ranting, reflecting, or storytelling — this is your space to be heard without being boxed in.
                </p>
            </section>
            <section className="section_container">
                {data.length > 0 ? <div className="flex flex-col gap-4 justify-center items-center">
                    {data.map((user, index) =>
                        <div key={user.followingId} className="flex items-center shadow-[2px_2px_0px_0px_rgb(0,_0,_0)] p-4 rounded-2xl border-2 bg-white hover:shadow-lg transition-shadow duration-300">
                            <Link href={`/profile/${user.followedUser.id}`}>
                                <Image src={user.followedUser.profileUrl || ""} alt={user.followedUser.name} width={50} height={50} className="profile_image"></Image>
                            </Link>

                            <div className="ml-4">
                                <Link href={`/profile/${user.followedUser.id}`}><h2 className="text-lg font-semibold text-gray-800">
                                    {user.followedUser.name}
                                </h2></Link>
                                <p className="text-sm text-gray-500">
                                    Following since: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>)}
                </div> : (loading ? null : <h1>You don't follow anyone</h1>)}
            </section>
        </>
    )
}