export async function LoginDataGet(rowData:object){
    let url = 'http://restapi.adequateshop.com/api/authaccount/login'

    let res = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rowData)
    })
    let data = await res.json()
    return data
}