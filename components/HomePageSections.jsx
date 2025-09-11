'use client'
import { homePageSectionApi } from "@/lib/api";
import { categories } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader2 from "./Loader2";
import MessageSlab from "./MessageSlab";
import NewsletterSession from "./NewsletterSession";
import CareerDashboard from "./CareerDashboard";
import SearchedBlogs from "./SearchedBlogs";
import { Carter_One } from "next/font/google";

const HomePageSections = () => {
    const [mainData, setMainData] = useState();
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (fetching) return;
            setFetching(true);
            setLoading(true);
            try {
                const res = await homePageSectionApi();
                setMainData(res.blogs[0]);
            } catch (error) {
                setError({ message: error.message, type: 'error', url: null });
            } finally {
                setLoading(false);
                setFetching(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <Loader2 />}
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            {mainData && (
                <>
                    {/* careerDashboard */}
                    {/* <CareerDashboard /> */}
                    {/* Featured Posts Section */}
                    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                                Featured Posts
                            </h2>
                            <div className="relative max-w-5xl mx-auto">
                                {/* Thumbnail Image */}
                                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                                    <Image
                                        src={mainData.blogs.thumbnailUrl ? mainData.blogs.thumbnailUrl : '/thumbnailUrl.png'}
                                        alt={mainData.blogs.title}
                                        fill
                                        className="object-cover rounded-2xl"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                                </div>

                                {/* Blog Content Card */}
                                <div className="relative -mt-16 sm:-mt-20 md:-mt-28 bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 mx-4 sm:mx-8 lg:mx-12 border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                                    {/* Categories */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="bg-gradient-to-r from-[#EE2B69] to-[#FF5C8A] text-white px-4 py-1.5 text-sm font-semibold rounded-full">
                                            {mainData.blogs.categories}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <Link href={`/blog/${mainData.blogs.id}`}>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-[#EE2B69] transition-colors duration-200">
                                            {mainData.blogs.title}
                                        </h2>
                                    </Link>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 line-clamp-3">
                                        {mainData.blogs.excerpt}
                                    </p>

                                    {/* Author and Meta */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200">
                                        {/* Author Info */}
                                        <Link href={`/profile/${mainData.usersTable.id}`} className="flex items-center space-x-3 mb-4 sm:mb-0">
                                            <Image
                                                src={mainData.usersTable.profileUrl}
                                                alt={mainData.usersTable.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full border-2 border-gray-200"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{mainData.usersTable.name}</p>
                                            </div>
                                        </Link>

                                        {/* Meta Info */}
                                        <div className="text-sm text-gray-500">
                                            <p>{mainData.blogs.readingTime} read</p>
                                            <p>{new Date(mainData.blogs.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recently Added Posts Section */}
                    <section className="py-12 sm:py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                                Recently Added Posts
                            </h2>
                            <SearchedBlogs query={''} once={true} totalblogsonpage={4} />
                        </div>
                    </section>

                    {/* Categories Section */}
                    <section className="py-12 sm:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                                Browse By Category
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {categories.map((category, index) => (
                                    <Link
                                        key={index}
                                        href={`/?query=${category}`}
                                        className="group"
                                    >
                                        <div className="flex justify-center items-center p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-md hover:bg-[#EE2B69] hover:text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-white">
                                                {category}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/*NewsletterSession*/}
                    <section className="py-12 sm:py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
                                Subscribe to our Newsletter
                            </h2>
                            <NewsletterSession />
                        </div>
                    </section>

                </>
            )}
        </div>
    );
};

export default HomePageSections;