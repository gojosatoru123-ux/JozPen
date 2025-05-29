"use client"
import Link from "next/link";
import { Bookmark, Home, LogIn, LogOut, SquarePen, UserRoundPlus } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbarmenumobile = () => {
    const pathname = usePathname()
    return (
        <>
            <Link href="/" className={`flex gap-1 p-2 rounded-full ${pathname == '/' ? 'text-[#EE2B69] bg-gray-200' : ''}`}><Home /></Link>
            <Link href="/blog/create" className={`flex gap-1 p-2 rounded-full ${pathname == '/blog/create' ? 'text-[#EE2B69] bg-gray-200' : ''}`}><SquarePen /></Link>
            <Link href="/bookmark" className={`flex gap-1 p-2 rounded-full ${pathname == '/bookmark' ? 'text-[#EE2B69] bg-gray-200' : ''}`}><Bookmark /></Link>
            <Link href="/followings" className={`flex gap-1 p-2 rounded-full ${pathname == '/followings' ? 'text-[#EE2B69] bg-gray-200' : ''}`}><UserRoundPlus /> </Link>
        </>
    )
}

export const Navbarmenu = () => {
    const pathname = usePathname()
    return (
        <>
            <Link href="/" className={`flex gap-1 hover:text-[#EE2B69] transition-all ${pathname == '/' ? 'text-[#EE2B69] font-bold' : ''}`}><Home /> Home</Link>
            <Link href="/blog/create" className={`flex gap-1 hover:text-[#EE2B69] transition-all ${pathname == '/blog/create' ? 'text-[#EE2B69] font-bold' : ''}`}><SquarePen /> create</Link>
            <Link href="/bookmark" className={`flex gap-1 hover:text-[#EE2B69] transition-all ${pathname == '/bookmark' ? 'text-[#EE2B69] font-bold' : ''}`}><Bookmark /> bookmark</Link>
            <Link href="/followings" className={`flex gap-1 hover:text-[#EE2B69] transition-all ${pathname == '/followings' ? 'text-[#EE2B69] font-bold' : ''}`}><UserRoundPlus /> followings</Link>
        </>
    )
}