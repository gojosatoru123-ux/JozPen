import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { blogs } from '@/database/schema';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';

export async function PUT(request, { params }) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const getField = (name) => formData.get(name)?.toString() || '';
    
    const title = getField('title');
    const slug = getField('slug');
    const excerpt = getField('excerpt');
    const content = getField('content');
    const tags = getField('tags');
    const categories = getField('categories');
    const thumbnail = formData.get('thumbnail'); // Could be File or empty
    
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    const url=new URL(request.url)
    const blogId = url.searchParams.get('id')
    
    const saveImage = async (file) => {
        if (!file || typeof file === 'string') return null;
        const ext = path.extname(file.name);
        const filename = `${uuidv4()}${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        const blob = await put(`jozpen/uploads/${filename}`, buffer, {
            access: 'public',
            addRandomSuffix: true,
          });
        return blob.url;
    };
    let thumbnailUrl = null;

    if (thumbnail && typeof thumbnail !== 'string' && thumbnail.size > 0) {
        // New image uploaded
        thumbnailUrl = await saveImage(thumbnail);
    }

    const readingTime = Math.ceil(content.length / 300);
    try {
        const updatePayload = {
            title,
            slug,
            excerpt,
            content,
            tags,
            categories,
            readingTime: `${readingTime} min`,
        };

        if (thumbnailUrl) {
            updatePayload.thumbnailUrl = thumbnailUrl;
        }

        await db.update(blogs).set(updatePayload).where(eq(blogs.id, blogId));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}