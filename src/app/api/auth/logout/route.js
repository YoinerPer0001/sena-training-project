import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { serialize } from 'cookie'
import { NextResponse } from "next/server";

export function GET(req, res) {
    const cookieStore = cookies();
    const sessionTokenValue = cookieStore.get('sessionToken')

    if(!sessionTokenValue.value){
        return NextResponse.json({error: "No token"})
    }

    try {
        verify(sessionTokenValue.value, "juniorTupapa")
        cookieStore.delete('sessionToken')
        const response = NextResponse.json(
            {},
            {
              status: 200,
            }
          );
      
          return response;
    } catch(err) {
        return NextResponse.json({error: 'invalid token'})
    }

}