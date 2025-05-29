import BlogCard from "@/components/BlogCard";
import HomePageSections from "@/components/HomePageSections";
import SearchedBlogs from "@/components/SearchedBlogs";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const query = (await searchParams)?.query || '';
  return (
    <>
      <section className="pink_container pattern">
        <p className="tag">READ,WRITE AND LEARN</p>
        <h1 className="heading">"For the thinkers, ranters, and midnight typers"</h1>
        <p className="sub-heading !max-w-3xl">
        A platform for thinkers, feelers, overthinkers, and under-sharers. Whether you’re ranting, reflecting, or storytelling — this is your space to be heard without being boxed in.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : null}
        </p>
        {query ? <SearchedBlogs query={query} totalblogsonpage={5}></SearchedBlogs>:<HomePageSections></HomePageSections>}
      </section>
    </>
  );
}
