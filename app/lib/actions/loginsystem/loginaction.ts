'use server';
import { redirect } from 'next/navigation'
import { LoginDataGet } from '@/app/lib/model';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';
import { NextResponse, type NextRequest } from 'next/server';
import { encryptData } from '@/app/lib/helper/helper';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function LoginSubmit(prevState: any, formdata: FormData){
    const rowFormData = {
        email: formdata.get('email'),
        password: formdata.get('password')
    };
    let res = await LoginDataGet(rowFormData);
    if(res.code != 1){
        let data = res.data;
        let sessionData = {
            id: data.Id,
            name: data.Name,
            email: data.Email,
            token:data.Token
        };

        let expires = new Date(Date.now() + (7*24*60*60*1000));
        const encryptedData = await encryptData({sessionData, expires});
        cookies().set('session', encryptedData, {
            httpOnly: true,
            expires: expires // One week
          });
        redirect('/dashboard');
    }else{
        return {
            message:res.message
        };
    }
}

export async function logout(){
    // cookies().set('session', '', {
    //     httpOnly: true,
    //     expires: new Date(0)
    // });
    cookies().delete('session');
    redirect('/login');
}