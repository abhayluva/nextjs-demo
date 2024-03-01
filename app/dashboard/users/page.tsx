import UserList from '@/app/ui/users/user-list';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata:Metadata = {
    title: 'Demo - User Page',
    description: 'User page detail'
}

export default async function Page({
    searchParams
}: {
    searchParams:{
        [key: string]:string | string[] | undefined
    }
}){
    const currentPage = Number(searchParams?.page) || 1;
    return(
        <>
            <h1>User List</h1><br />
            <Suspense fallback={<p>Loading Data...</p>}>
                <UserList currentPageNo={currentPage}  />
            </Suspense>
        </>
    );
}