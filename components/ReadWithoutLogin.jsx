import { auth, signIn } from "@/auth";
import { Edit, ThumbsUp, Award, LogIn } from "lucide-react";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";

const ReadWithoutLogin = async ()=>{
    const session = await auth();
    return (<>
        {session && session?.user ? <></> : <section className="px-4 py-16 bg-gradient-to-t from-pink-50 to-white w-full h-[500px]">
            <div className=" animate-[fadeIn_0.5s_ease-out_forwards] mx-auto bg-white border border-gray-100 rounded-2xl shadow-lg p-8 w-full max-w-md transition-all hover:shadow-xl">
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center bg-pink-100 w-16 h-16 rounded-full mb-4">
                        <LogIn className="w-8 h-8 text-[#EE2B69]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Join the Conversation
                    </h2>
                    <p className="text-gray-500">
                        Sign in with GitHub to start submitting ideas, writing blogs, and connecting with creators.
                    </p>
                </div>

               <div className="grid grid-cols-2 gap-2">
               <form action={async () => {
                    "use server";
                    await signIn("github")
                }}><button type="submit" className="w-full flex text-xl items-center justify-center gap-2 bg-[#EE2B69] text-white py-3 px-4 rounded-xl hover:bg-[#d81b59] transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"> <FiGithub  /> SignIn</button></form>

                <form action={async () => {
                    "use server";
                    await signIn("google")
                }}><button type="submit" className="w-full flex text-xl items-center justify-center gap-2 bg-[#EE2B69] text-white py-3 px-4 rounded-xl hover:bg-[#d81b59] transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"><IoLogoGoogleplus /> SignIn</button></form>
               </div>

                <p className="text-xs text-center text-gray-400 mt-6">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </section>}
        </>
    )
}
export default ReadWithoutLogin;