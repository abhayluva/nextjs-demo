import { SignJWT, jwtVerify } from 'jose';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encryptData(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime(payload.expires)
        .sign(key)
}

export async function decryptData(input: string): Promise<any>{
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload;
}

export async function getSession(request: NextRequest){
    const session = request.cookies.get('session')?.value;
    if(!session){
        return null;
    }else{
        return await decryptData(session);
    }
}

export async function sessionData(){
    const session = cookies().get('session')?.value;
    return await decryptData(session ? session : '');
}

export async function getToken(){
    let data = await sessionData();
    return data.sessionData.token;
}