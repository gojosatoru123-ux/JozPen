'use client'
import { Bookmark, Delete, Edit, EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Modal from "./model";
import MessageSlab from "./MessageSlab";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const BlogCard = ({ post, setRemoved = null, isMyProfile = false }) => {
    const [bookmark, setBookmark] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const bookmarkIDs = JSON.parse(localStorage.getItem('bookmarkIDs')) || [];
        setBookmark(bookmarkIDs.includes(post.blogs.id));
    }, [post.blogs.id]);

    const toggleBookmark = (post) => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
        const bookmarkIDs = JSON.parse(localStorage.getItem('bookmarkIDs')) || [];
        const isAlreadyBookmarked = bookmarkIDs.includes(post.blogs.id);

        if (!isAlreadyBookmarked) {
            // Add bookmark
            const updatedBookmarks = [...bookmarks, post];
            const updatedBookmarkIDs = [...bookmarkIDs, post.blogs.id];

            localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
            localStorage.setItem('bookmarkIDs', JSON.stringify(updatedBookmarkIDs));

            setBookmark(true);
        } else {
            // Remove bookmark
            const updatedBookmarks = bookmarks.filter(blog => blog.blogs.id !== post.blogs.id);
            const updatedBookmarkIDs = bookmarkIDs.filter(id => id !== post.blogs.id);

            localStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
            localStorage.setItem('bookmarkIDs', JSON.stringify(updatedBookmarkIDs));

            setBookmark(false);
            if (setRemoved) setRemoved(updatedBookmarkIDs.length);
        }
    };

    const handleConfirm = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/blog/deleteblog?id=${selectedId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if (data.success) {
                setError({ message: "Blog Deleted Successfully. Refresh the page", type: 'success', url: null });
            }
        } catch (error) {
            setError({ message: error.message, type: 'error', url: null });
        } finally {
            setLoading(false)
            setShowModal(false)
        }
    }

    const deleteBlog = async (id) => {
        setSelectedId(id)
        setShowModal(true)
    }
    const edit = async (id) => {
        router.push(`/blog/update/${id}`)
    }


    return (
        <>
            {loading && <Loader />}
            {error && <MessageSlab type={error.type} message={error.message} url={error.url} />}
            <li className="blog-card group relative">
                <div className="flex-between">
                    <p className="blog-card_date">{new Date(post.blogs.createdAt).toDateString()}</p>
                    <div className="flex gap-1.5 cursor-pointer" onClick={() => toggleBookmark(post)}>
                        <Bookmark className={bookmark ? 'text-[#EE2B69] fill-[#EE2B69]' : 'text-black fill-none'}></Bookmark>
                    </div>
                    {isMyProfile && (
                        <div className="absolute left-1/2 translate-x-1/2 top-5 z-30 flex gap-3 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300">
                            <button onClick={() => deleteBlog(post.blogs.id)} className="rounded-full cursor-pointer bg-[#EE2B69] text-white p-3 shadow-lg hover:bg-pink-600 transition-colors duration-200">
                                <Delete />
                            </button>
                            <button onClick={()=>edit(post.blogs.id)} className="rounded-full cursor-pointer bg-[#EE2B69] text-white p-3 shadow-lg hover:bg-pink-600 transition-colors duration-200">
                                <Edit />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-between mt-5 gap-5">
                    <div className="flex-1">
                        <Link href={`/profile/${post.usersTable.id}`}>
                            <p className="text-16-medium line-clamp-1">{post.usersTable.name}</p>
                        </Link>
                        <Link href={`/blog/${post.blogs.id}`}>
                            <h3 className="text-26-semibold line-clamp-1">{post.blogs.title}</h3>
                        </Link>
                    </div>
                    <Link href={`/profile/${post.usersTable.id}`}>
                        <Image
                            src={post.usersTable.profileUrl}
                            alt={post.usersTable.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </Link>
                </div>

                <Link href={`/blog/${post.blogs.id}`}>
                    <p className="blog-card_desc">{post.blogs.excerpt}</p>

                    <img src={post.blogs.thumbnailUrl ? post.blogs.thumbnailUrl : '/thumbnailUrl.png'} alt="placeholder" className="blog-card_img" />
                </Link>

                <div className="flex-between gap-3 mt-5">
                    <Link href={`/?query=${post.blogs.categories?.toLowerCase()}`}>
                        <p className="text-16-medium">{post.blogs.categories}</p>
                    </Link>
                    <Button className="blog-card_btn" asChild>
                        <Link href={`/blog/${post.blogs.id}`}>Details</Link>
                    </Button>
                </div>
            </li>
            {showModal && (
                <Modal
                    message={`Are you sure you want to delete the blog ${selectedId}?`}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
}
export default BlogCard;