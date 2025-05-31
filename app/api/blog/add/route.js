// app/api/blog/add/route.js
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { blogs } from '@/database/schema';
import { db } from '@/database/drizzle';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { put } from '@vercel/blob';

export async function POST(req) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  const saveImage = async (file) => {
    if (!file) return '';
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = await put(`jozpen/uploads/${filename}`, buffer, {
      access: 'public',
      addRandomSuffix: true,
    });
    return blob.url;
  };

  const thumbnail = formData.get('thumbnail');





  const readingTime = Math.ceil(content.length / 300); // naive estimate
  try {
    const thumbnailUrl = await saveImage(thumbnail);
    await db.insert(blogs).values({
      title,
      slug,
      author,
      excerpt,
      content,
      tags,
      categories,
      thumbnailUrl,
      readingTime: `${readingTime} min`,
    });
    return NextResponse.json({ success: true });
  }catch(error){
    return NextResponse.json({ success: false,error:error.message });
  }

  
}
