// app/not-found.tsx
'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <>
   <div className=" text-gray-400 font-sans flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-center mb-4">Oops! Page not found</h1>

      <p className="text-lg text-center max-w-xl mb-10">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* 404 section with hover effects on digits */}
      <section className="flex justify-center items-center gap-4 text-[100px] font-extrabold group transition-all duration-300">
        <span className="text-pink-500 group-hover:scale-110 transition-transform duration-300">4</span>
        <span className="text-red-400 group-hover:rotate-6 group-hover:text-red-500 transition-all duration-300">0</span>
        <span className="text-pink-500 group-hover:scale-110 transition-transform duration-300">4</span>
      </section>

      <Link
        href="/"
        className="uppercase text-sm bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-sm tracking-wide no-underline mt-10"
      >
        Go Home
      </Link>
    </div>
    </>
  );
}
