import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

cloudinary.config({ 
    cloud_name: "dla5djfdc", 
    api_key: "788711734647226", 
    api_secret: "Ex4tOhydc50XvKXPYFMUuv07VcY" // Click 'View Credentials' below to copy your API secret
});

export async function POST(request) {

    const data = await request.formData()
    const file = data.get('file')

    if(!file) {
        return NextResponse.json({ error: 'File not found', status: 404 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), 'public', file.name)
    writeFile(filePath, buffer, 'utf8')
    console.log('file save at ' + filePath)

    const response = await cloudinary.uploader.upload(filePath)
    console.log(response)

    return new Response(JSON.stringify({
        message: 'File uploaded successfully',
        file: response.secure_url

    }));
}
