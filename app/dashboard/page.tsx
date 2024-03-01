import Link from 'next/link'
export default async function Page(){
    return(
        <>
            <h1>Dashboard Page</h1>
            <Link href="dashboard/profile/abhay">Profile</Link>
        </>
    );
}