import { auth, signIn } from "@/auth";
import { Edit, ThumbsUp, Award, LogIn } from "lucide-react";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";

export default async function About() {
    const session = await auth();
    const features = [
        {
            title: "Submit Blogs",
            description: "Share your thoughts, research, or tutorials with a like-minded audience. Our platform provides the perfect space for your ideas to flourish.",
            icon: Edit,
        },
        {
            title: "Vote on Ideas",
            description: "Help shape what gets featured by voting on your favorite submissions. Your voice matters in our community-driven platform.",
            icon: ThumbsUp,
        },
        {
            title: "Win Competitions",
            description: "Participate in regular challenges and earn recognition in the blogosphere. Showcase your writing skills and win exciting prizes.",
            icon: Award,
        },
    ];

    return (
        <>
            <header className="relative overflow-hidden bg-gradient-to-b from-white to-pink-50 pt-20 pb-24 px-4 md:px-8 lg:pt-28 lg:pb-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-full">
                        {/* Abstract pattern */}
                        <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/3 opacity-10" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ee2b69" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#ee2b69" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            <path d="M165.5,137.1c10.2-25,33.1-41.4,57.7-58.1c40.3-27.5,73.1-15.5,111.8-40c11-6.9,20.1-14.9,30.4-22.5 c15.7-11.5,27.6-19,38.8-11.1c11.8,8.3,6.4,28.1-0.1,40.4c-16.5,31.1-55.3,39-63.2,75c-5.6,25.5,10,53.9-5.3,77.8 c-9.9,15.3-26.9,22.6-44.6,26.2c-59.2,12.1-130-6-140.6-70.5C148.9,144.4,155.1,162.3,165.5,137.1z" fill="url(#gradient)" transform="rotate(12) scale(1.2)" />
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="animate-fade-in">
                        <p className="text-sm uppercase tracking-widest text-[#EE2B69] font-medium mb-3 inline-block py-1 px-3 rounded-full bg-pink-50 border border-pink-100">
                            Read, Write and Learn
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
                            Fuel Your Curiosity,<br /> One Blog at a Time
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Dive into thought-provoking ideas, submit your own, and get noticed in our vibrant writing competitions.
                        </p>
                    </div>
                </div>
            </header>
            {session && session?.user ? <></> : <section className="px-4 py-16 bg-gradient-to-b from-pink-50 to-white">
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


            <section className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">What You Can Do</h2>
                        <div className="h-1 w-20 bg-[#EE2B69] mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center bg-pink-50 w-12 h-12 rounded-xl mb-5">
                                        <feature.icon className="w-6 h-6 text-[#EE2B69]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#EE2B69] mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-[#EE2B69] to-pink-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Ideas?</h2>
                    <p className="text-lg text-pink-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of writers who have already found their voice on our platform.
                        Start writing today and connect with a community that values your perspective.
                    </p>
                    <div className="flex flex-row gap-4 justify-center flex-wrap">
                        {session && session?.user ? <>
                            <Link
                                href="/blog/create"
                                className="px-8 py-3 bg-white text-[#EE2B69] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                Start Writing
                            </Link>
                            <Link
                                href="/"
                                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all"
                            >
                                Explore Blogs
                            </Link></>
                            : <>
                                <form action={async () => {
                                    "use server";
                                    await signIn("github")
                                }}><button type="submit" className="flex gap-1 items-center cursor-pointer px-8 py-3 bg-white text-[#EE2B69] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                                ><FiGithub /> SignIn</button></form>
                                <form action={async () => {
                                    "use server";
                                    await signIn("google")
                                }}><button type="submit" className="flex gap-1 items-center cursor-pointer px-8 py-3 bg-white text-[#EE2B69] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                                ><IoLogoGoogleplus /> SignIn</button></form></>
                        }
                    </div>
                </div>
            </section>

        </>
    );
}
