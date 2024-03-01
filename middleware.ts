import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getSession } from '@/app/lib/helper/helper';

export async function middleware(request: NextRequest){
    let data = await getSession(request);
    let pathname = request.nextUrl.pathname;
    if(data == null && request.nextUrl.pathname != '/login'){
        //return NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.redirect(new URL('/login', request.url))
    }else if(data != null && pathname == '/login'){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  };