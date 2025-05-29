import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import {  LogIn, LogOut } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";
import {Navbarmenu, Navbarmenumobile} from "./Navbarmenu";
const Navbar = async () => {
    const session = await auth()
    return (
        <>
            <header className="px-5 py-3 shadow-sm font-work-sans bg-white text-black">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={144} height={20} />
                    </Link>
                    <div className="items-center gap-5 hidden sm:flex">
                        {session && session?.user ? (
                            <>
                                <Navbarmenu/>
                                <form action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" })
                                }}><button type="submit" className="flex gap-1 cursor-pointer text-[#EE2B69]"><LogOut /> Logout</button></form>
                                <Link href={`/profile/${session?.id}`}>
                                <Image src={session?.user?.image || ""} alt={session?.user?.name} width={50} height={50} className="profile_image"></Image>   

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
                    <Navbarmenumobile/>
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" })
                    }}><button type="submit" className="flex gap-1 cursor-pointer text-[#EE2B69]"><LogOut /> </button></form>
                    <Link href={`/profile/${session?.id}`}>
                        <Image src={session?.user?.image || ""} alt={session?.user?.name} width={50} height={50} className="profile_image"></Image>   
                    </Link>
                </div>}
            </header>
        </>
    )
}
export default Navbar;