'use server';
import { redirect } from 'next/navigation';
import { userListGet, userSingleGet, userUpdateData, userCreateData } from '@/app/lib/model/users-model';
import { sessionData, getToken } from '@/app/lib/helper/helper';
import { z } from 'zod';

export async function userList(page:any){
    let token  = await getToken();
    let res = await userListGet(token, page);
    let response = [];
    if(res?.data){
        response = res.data;
    }
    //console.log(response);
    return res;
}

export async function userSingle(id:number){
    let token  = await getToken();
    let res = await userSingleGet(token, id);
    return res;
}

export async function userUpdate(prevState: any, formdata: FormData){
    let token  = await getToken();
    const rowFormData = {
        id: formdata.get('id'),
        name: formdata.get('uname'),
        email: formdata.get('email'),
        location: formdata.get('location')
    };
    const id = formdata.get('id');
    let res = await userUpdateData(rowFormData, id, token);
    if(res){
        console.log(res);
        //redirect('/dashboard/users');
    }else{
        return{
            message: res.message
        };
    }
}

export async function userCreateSubmit(data: any){
    console.log('action data: ', data);
    let token  = await getToken();
    const rowFormData = {
        name: data.uname,
        email: data.email,
        location: data.location
    };
    let res = await userCreateData(rowFormData, token);
    if(res){
        console.log(res);
        redirect('/dashboard/users');
    }else{
        return{
            message: res.message
        };
    }
}