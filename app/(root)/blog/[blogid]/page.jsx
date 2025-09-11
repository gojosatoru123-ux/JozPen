import Recommended from "@/components/Recommended"
import TableOfContents from "@/components/tableOfContents"
import { db } from "@/database/drizzle"
import { blogs, usersTable } from "@/database/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import BlogMetadata from "@/components/BlogMetadata"
import { auth } from "@/auth"
import ReadWithoutLogin from "@/components/ReadWithoutLogin"



export async function generateMetadata({ params }) {
  const id = (await params).blogid;
  const res = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .innerJoin(usersTable, eq(usersTable.email, blogs.author));

  const data = res[0];

  if (!data) {
    return {
      title: "Blog not found",
      description: "The blog you're looking for does not exist.",
    };
  }

  return {
    title: data.blogs.title,
    description: data.blogs.excerpt,
    keywords: data.blogs.tags?.split(",").map((k) => k.trim()),
    openGraph: {
      title: data.blogs.title,
      description: data.blogs.excerpt,
      url: `https://joz-pen.vercel.app/blog/${id}`,
      type: "article",
      images: [
        {
          url: data.blogs.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: data.blogs.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.blogs.title,
      description: data.blogs.excerpt,
      images: [data.blogs.thumbnailUrl],
    },
    alternates: {
      canonical: `https://joz-pen.vercel.app/blog/${id}`,
    },
  };
}

export default async function Blog({ params }) {
  const id = (await params).blogid
  const session = await auth();
  if (!id) return notFound();
  // since it is a server component so we have to pass full path of api to render the page on server and rendering here would be beneficial for seo
  // const res = await fetch(`http://localhost:3000/api/blog/view?blogid=${id}`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  let res;
  try {
    res = await db.select().from(blogs).where(eq(blogs.id, id)).innerJoin(usersTable, eq(usersTable.email, blogs.author))
    if (res.length == 0) {
      return notFound();
    }
  } catch (error) {
    return notFound();
  }
  const data = res[0]
  return (
    <>

      <section className="pink_container pattern">
        <p className="tag">{new Date(data.blogs.createdAt).toDateString()}</p>

        <h1 className="heading">{data.blogs.title}</h1>
        <p className="sub-heading !max-w-5xl">{data.blogs.excerpt}</p>
      </section>
      <section className="section_container flex justify-center">
        {data.blogs.thumbnailUrl && <img
          src={data.blogs.thumbnailUrl}
          alt="thumbnail"
          className="w-full sm:h-[400px] sm:w-auto h-auto rounded-xl"
        />}

      </section>
      <BlogMetadata data={data} />
      <section className="flex gap-2 justify-center">
        <TableOfContents htmlContent={data.blogs.content} />
        {session && session?.user ?
          <article
            className="max-w-4xl p-2 pb-4 border-dotted border-b-2 border-gray-300 tiptap break-words"
            dangerouslySetInnerHTML={{ __html: data.blogs.content }}
          /> : <div className="max-w-4xl p-2 pb-4 border-dotted border-b-2 border-gray-300">
            <article
              className=" tiptap break-words"
              dangerouslySetInnerHTML={{ __html: data.blogs.content.slice(0, 2000) }}
            />
            <ReadWithoutLogin />
          </div>}
        {/* <div className="min-h-screen">
          <AppearanceSettings />
        </div> */}
      </section>
      <section className="flex flex-col items-center py-5">
        <Recommended></Recommended>
      </section>
    </>
  )
}