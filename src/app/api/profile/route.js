import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export function GET(req, res) {
    const cookieStore = cookies(req);
    const sessionTokenValue = cookieStore.get('sessionToken');

    if(!sessionTokenValue){
        return NextResponse.json({'error': 'No logueado'} , { status: 200 })
    }

    try {
        const tokenValues = verify(sessionTokenValue.value, "juniorTupapa");
        // Utiliza el objeto res directamente para enviar la respuesta
        return NextResponse.json({'loggued': true} , { status: 200 })
    } catch (err) {
        // Envía el error como respuesta con código de estado 500
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}