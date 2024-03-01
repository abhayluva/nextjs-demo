import Link from 'next/link';
import { userList } from '@/app/lib/actions/users/users-action'
import Image from 'next/image';

export default async function UserList({currentPageNo}: {currentPageNo:any}){

    // let currentPage = Number(searchParams?.page) || 1;
    let currentPage = currentPageNo;
    let userData = await userList(currentPage);
    const previousPage = (userData.page != 1) ? userData.page-1 : 0;
    const nextPage = (userData.page != userData.total_pages) ? userData.page+1 : 0;
    const showTable = userData.data.map((user:any) => {
        return (
            <tr key={user.id}>
                <td className='border border-slate-400 p-3'>{user.id}</td>
                <td className='border border-slate-400 p-3'>
                    <Image
                    src='/amy-burns.png'
                    width={100}
                    height={100}
                    alt={user.name}
                    />
                    {/* <img src={user.profilepicture} width={100} height={100} /> */}
                </td>
                <td className='border border-slate-400 p-3'>{user.name}</td>
                <td className='border border-slate-400 p-3'>{user.email}</td>
                <td className='border border-slate-400 p-3'>{user.location}</td>
                <td className='border border-slate-400 p-3'>
                    <Link href={`/dashboard/users/edit/${user.id}`} className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}>Edit</Link>
                </td>
            </tr>
        );
    })
    return(
        <>
            <Link href="/dashboard/users/create" className=" p-2 mt-4 bg-blue-400 text-white">Create User</Link><br /><br />
            <table className='border-collapse border border-slate-400'>
                <thead>
                    <tr>
                        <th className='border border-slate-400 p-3'>ID</th>
                        <th className='border border-slate-400 p-3'>Profile</th>
                        <th className='border border-slate-400 p-3'>Name</th>
                        <th className='border border-slate-400 p-3'>Email</th>
                        <th className='border border-slate-400 p-3'>Location</th>
                        <th className='border border-slate-400 p-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showTable}
                </tbody>
            </table>
            {(previousPage != 0) ? <Link href={`/dashboard/users?page=${previousPage}`}>Previous</Link> : ''}
            {(nextPage != 0) ? <Link href={`/dashboard/users?page=${nextPage}`}>Next</Link> : '' }
        </>
    );
}