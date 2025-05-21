import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Home, LogIn, LogOut, SquarePen } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";
const Navbar = async () => {
    const session = await auth()
    return (
        <>
            <header className="px-5 py-3 shadow-sm font-work-sans bg-white text-black">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={144} height={30} />
                    </Link>
                    <div className="items-center gap-5 hidden sm:flex">
                        {session && session?.user ? (
                            <>
                                <Link href="/" className="flex gap-1 hover:text-[#EE2B69] transition-all"><Home /> Home</Link>
                                <Link href="/blog/create" className="flex gap-1 hover:text-[#EE2B69] transition-all"><SquarePen /> create</Link>
                                <form action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" })
                                }}><button type="submit" className="flex gap-1 cursor-pointer text-[#EE2B69]"><LogOut /> Logout</button></form>
                                <Link href="/bookmark" className="flex gap-1 hover:text-[#EE2B69] transition-all"><Bookmark /> bookmark</Link>
                                <Link href={`/profile/${session?.id}`}>
                                    <Avatar className="size-10">
                                        <AvatarImage
                                            src={session?.user?.image || ""}
                                            alt={session?.user?.name || ""}
                                        />
                                        <AvatarFallback><img src={session?.user?.image ? session?.user?.image : '/logo.png'} /></AvatarFallback>
                                    </Avatar>
                                </Link>
                            </>
                        ) : (<>
                            <form action={async () => {
                                "use server";
                                await signIn("github")
                            }}><button type="submit" className="flex items-center text-2xl gap-1 hover:text-[#EE2B69] transition-all cursor-pointer"><LogIn /> <FiGithub  /></button></form>
                            <form action={async () => {
                                "use server";
                                await signIn("google")
                            }}><button type="submit" className="flex items-center text-2xl gap-1 hover:text-[#EE2B69] transition-all cursor-pointer"><LogIn /><IoLogoGoogleplus /> </button></form>
                            </>
                        )}
                    </div>
                </nav>
                {(session && session?.user) && <div className="fixed md:hidden bottom-0 left-0 w-screen z-21 bg-white p-2 flex justify-between items-center">
                    <Link href="/" className="flex gap-1 hover:text-[#EE2B69] transition-all"><Home /> </Link>
                    <Link href="/blog/create" className="flex gap-1 hover:text-[#EE2B69] transition-all"><SquarePen /> </Link>
                    <Link href={`/profile/${session?.id}`}>
                        <Avatar className="size-10">
                            <AvatarImage
                                src={session?.user?.image || ""}
                                alt={session?.user?.name || ""}
                            />
                             <AvatarFallback><img src={session?.user?.image ? session?.user?.image : '/logo.png'} /></AvatarFallback>
                        </Avatar>
                    </Link>
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" })
                    }}><button type="submit" className="flex gap-1 cursor-pointer text-[#EE2B69]"><LogOut /> </button></form>
                    <Link href="/bookmark" className="flex gap-1 hover:text-[#EE2B69] transition-all"><Bookmark /> </Link>
                </div>}
            </header>
        </>
    )
}
export default Navbar;