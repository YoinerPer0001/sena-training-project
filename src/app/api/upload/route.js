import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ error: 'File not found', status: 404 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), 'public', file.name);
        await writeFile(filePath, buffer);
        console.log('File saved at ' + filePath);

        const response = await cloudinary.uploader.upload(filePath);
        console.log(response);

        const optimizeUrl = await cloudinary.url(response.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        console.log(optimizeUrl);
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = await cloudinary.url(response.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 1280,
            height: 720,
        });
        
        console.log(autoCropUrl);  

        return new Response(JSON.stringify({
            message: 'File uploaded successfully',
            file: autoCropUrl
        }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Internal Server Error', status: 500 });
    }
}

