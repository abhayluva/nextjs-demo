export async function userListGet(token:string, page:any){
    let res = await fetch('http://restapi.adequateshop.com/api/users?page='+page, {
        headers: {
            'Authorization': 'Bearer '+token
        }
    });
    let data = res.json();
    return data;
}

export async function userSingleGet(token:string, id:number){
    let res = await fetch('http://restapi.adequateshop.com/api/users/'+id, {
        headers: {
            'Authorization': 'Bearer '+token
        }
    });
    let data = res.json();
    return await data;
}

export async function userUpdateData(data: object, id:any, token:string){
    let url = 'http://restapi.adequateshop.com/api/users/'+id;
    let res = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function userCreateData(data: object, token:string){
    let res = await fetch('http://restapi.adequateshop.com/api/users', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}
