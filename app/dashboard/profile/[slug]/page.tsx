export default async function Page({params}: {params: {slug: string}}){
    return(
        <>
            <h1>Hello {params.slug},</h1>
            <p>This is your profile page</p>
        </>
    );
}