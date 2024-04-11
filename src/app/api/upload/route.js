import { writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from "next/server";

import {v2 as cloudinary} from 'cloudinary';
import { url } from 'inspector';
          
cloudinary.config({ 
  cloud_name: 'dla5djfdc', 
  api_key: '788711734647226', 
  api_secret: 'Ex4tOhydc50XvKXPYFMUuv07VcY' 
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
    await writeFile(filePath, buffer)

    const response = await cloudinary.uploader.upload(filePath)
    console.log(response)
    
    return NextResponse.json({
        "url": response.secure_url,
        "message": 'Imagen uploaded successfully'
    })
}

// export async function POST(request) {

//     const data = await request.formData()
//     const file = data.get('file')

//     // if(!file) {
//     //     return NextResponse.json({ error: 'File not found', status: 404 })
//     // }
    
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const filePath = path.join(process.cwd(), 'public', file.name)
//     writeFile(filePath, buffer, 'utf8')
//     console.log('file save at ' + filePath)

//     return new Response(JSON.stringify({
//         message: 'File uploaded successfully',
//         file: '/' + file.name
//     }));
// }
