// app/api/blog/add/route.js
import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import { blogs } from '@/database/schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if(session && !session.isAuthorized){
    return NextResponse.json({ error: "You are not authorized to add blogs. Please contact admin." }, { status: 403 });
  }
  const formData = await req.formData();

  const getField = (name) => formData.get(name)?.toString() || '';

  const title = getField('title');
  const slug = getField('slug');
  const author = session?.user?.email
  const excerpt = getField('excerpt');
  const content = getField('content');
  const tags = getField('tags');
  const categories = getField('categories');
  const thumbnailUrl = getField('thumbnail-upload');
  const expireAt = getField('expireAt') ? new Date(getField('expireAt')) : null;

  // const uploadDir = path.join(process.cwd(), 'public/uploads');

  // const saveImage = async (file) => {
  //   if (!file) return '';
  //   const ext = path.extname(file.name);
  //   const filename = `${uuidv4()}${ext}`;
  //   const buffer = Buffer.from(await file.arrayBuffer());
  //   const blob = await put(`jozpen/uploads/${filename}`, buffer, {
  //     access: 'public',
  //     addRandomSuffix: true,
  //   });
  //   return blob.url;
  // };

  // const thumbnail = formData.get('thumbnail');





  const readingTime = Math.ceil(content.length / 300); // naive estimate
  try {
    // const thumbnailUrl = await saveImage(thumbnail);
    await db.insert(blogs).values({
      title,
      slug,
      author,
      excerpt,
      content,
      tags,
      categories,
      thumbnailUrl,
      expireAt,
      readingTime: `${readingTime} min`,
    });
    return NextResponse.json({ success: true });
  }catch(error){
    return NextResponse.json({ success: false,error:error.message });
  }

  
}
