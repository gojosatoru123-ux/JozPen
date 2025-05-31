'use client'
import { upload } from '@vercel/blob/client'
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
export default function SaveImage() {
    const saveImage = async (file) => {
        if (!file || typeof file === 'string') return null;
        const ext = path.extname(file.name);
        const filename = `${uuidv4()}${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        blobUrl=await upload(`jozpen/uploads/{filename}`,buffer,{
            access: 'public',
            handleUploadUrl:'/api/handleImageUpload',
        })
        return blobUrl;
    };
}