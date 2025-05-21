import { categories } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <>
           <footer className="bg-[#0e0e10] text-gray-300 relative border-t-4 border-[#EE2B69] overflow-hidden">
      {/* Pattern Background (optional) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(238,43,105,0.1)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image src="/logo.png" alt="Logo" width={140} height={30} />
          </Link>
          <p className="text-sm text-gray-400 max-w-xs">
            Empowering insights with creative technology — one blog at a time.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span
                key={i}
                className="bg-[#EE2B69] text-white px-3 py-1 text-xs rounded-full hover:bg-white hover:text-black transition"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link href="/termsandconditions" className="hover:text-white transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/privacypolicy" className="hover:text-white transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <span className="tag text-black">E-Mail NewsLetter Service Very Soon</span>
            <input
              type="email"
              placeholder="Your email"
              disabled
              className="bg-black text-white px-4 py-2 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#EE2B69]"
            />
            <button
              type="submit"
              disabled
              className="bg-[#EE2B69] hover:bg-white hover:text-black transition px-4 py-2 rounded-md text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-4 text-center text-xs text-gray-500">
        &copy; 2025 YourBrand — All rights reserved.
      </div>
    </footer>
        </>
    )
}
export default Footer;