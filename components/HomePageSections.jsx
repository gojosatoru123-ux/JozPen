'use client'
import { categories } from "@/lib/utils";
import Image from "next/image";
import SearchedBlogs from "./SearchedBlogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { homePageSectionApi } from "@/lib/api";
import { useEffect, useState } from "react";
import Loader2 from "./Loader2";
import MessageSlab from "./MessageSlab";

const HomePageSections = () => {
    const [mainData,setMainData]=useState()
    const [loading,setLoading]=useState(true)
    const [fetching,setFetching]=useState(false)
    const [error,setError]=useState(null)
    useEffect(() => {
        const fetchData=async ()=>{
            if(fetching) return;
            setFetching(true);
            setLoading(true);
            try {
                const res=await homePageSectionApi()
                setMainData(res.blogs[0])
            }
            catch (error) {
                setError({ message: error.message, type: 'error', url: null });
            }finally{
                setLoading(false);
                setFetching(false);
            }
        }
        fetchData();
    },[])

    return (
        <>
            {loading && <Loader2/>}
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            {mainData && <>
            <section>
                <h2 className="font-extrabold text-3xl">Featured Posts</h2>

            </section>
            <section className="bg-white px-4 py-14 sm:px-10">
                <div className="max-w-5xl mx-auto relative">

                    {/* Thumbnail Image */}
                    <div className="relative z-10 h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src={mainData.blogs.thumbnailUrl}
                            alt={mainData.blogs.title}
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>

                    {/* Blog Content Card */}
                    <div className="-mt-20 sm:-mt-24 md:-mt-32 relative z-20 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 md:p-10 mx-4 sm:mx-10">

                        {/* Categories */}
                        <div className="mb-3 flex flex-wrap gap-2">
                            <span className="bg-[#EE2B69] text-white px-4 py-1 text-xs font-semibold rounded-full">
                                {mainData.blogs.categories}
                            </span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${mainData.blogs.id}`} className="cursor-pointer">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                            {mainData.blogs.title}
                        </h2>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-base sm:text-lg mb-6">
                            {mainData.blogs.excerpt}
                        </p>

                        {/* Author and Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">

                            {/* Author Info */}
                            <Link href={`/profile/${mainData.usersTable.id}`} className="flex items-center space-x-3 cursor-pointer">
                                <Image
                                    src={mainData.usersTable.profileUrl}
                                    alt={mainData.usersTable.name}
                                    width={42}
                                    height={42}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{mainData.usersTable.name}</p>
                                </div>
                            </Link>

                            {/* Meta Info */}
                            <div className="text-sm text-gray-500 text-right">
                                <p>{mainData.blogs.readingTime} read</p>
                                <p>{new Date(mainData.blogs.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center flex-col">
                <h2 className="font-extrabold text-3xl">Browse By <br /> Category</h2>
                <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
                    {categories.map((_, index) => <Link key={index} href={`/?query=${_}`}><div className="cursor-pointer flex justify-center items-center border-1 border-black shadow-[3px_3px_0px_0px_rgb(0,_0,_0)] rounded py-5 hover:text-[#EE2B69] hover:shadow-[2px_2px_0px_0px_rgb(0,_0,_0)] transition"><h3 className="font-extrabold text-2xl">{_}</h3></div></Link>)}
                </div>
            </section>
            <section className="flex flex-col gap-5">
                <h2 className="font-extrabold text-3xl">Trending</h2>
                <SearchedBlogs query={''} once={true} totalblogsonpage={4}></SearchedBlogs>
            </section>
            </>}
        </>
    )
}
export default HomePageSections;