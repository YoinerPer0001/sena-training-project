import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const jwt = req.cookies.get('sessionToken');

    if (jwt === undefined) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    // Obteniendo el valor del token jwt
    const token = jwt.value;
    // Convertir la clave a un Uint8Array
    const secret = new TextEncoder().encode('juniorTupapa');

    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
        console.log(payload);

        const roleMap = {
            1: 'admin',
            2: 'instructor',
            3: 'user'
        };

        const userRole = roleMap[payload.Id_Rol_FK];

        if (!userRole) {
            return NextResponse.redirect(new URL('/403', req.url)); // Ruta de acceso denegado
        }

        const route = req.nextUrl.pathname;

        const routePermissions = {
            '/account': ['admin', 'instructor', 'user'], // Ejemplo de roles permitidos para /account
            '/courses/explore': ['admin', 'instructor', 'user'], // Ejemplo de roles permitidos para /courses
            '/instructors': ['admin', 'instructor'],
            '/admin': ['admin'], // Solo admin puede acceder a /admin
        };

        // Encontrar la ruta base y los roles permitidos
        const baseRoute = Object.keys(routePermissions).find(key => route.startsWith(key));
        const allowedRoles = baseRoute ? routePermissions[baseRoute] : [];

        if (!allowedRoles.includes(userRole)) {
            return NextResponse.redirect(new URL('/403', req.url)); // Ruta de acceso denegado
        }

        return NextResponse.next();
    } catch (e) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/account/:patch*', '/courses/:patch*', '/admin/:patch*', '/instructors/:patch*']
}