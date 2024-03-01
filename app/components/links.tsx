'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AcmeLogo from '@/app/ui/acme-logo';
import { logout } from '@/app/lib/actions/loginsystem/loginaction'

export default function Links(){
    const pathname = usePathname()

    return(
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link
            href='/dashboard'
            className={`${pathname==='/dashboard' ? 'active' : ''} flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
        >Dashboard</Link>
        <Link
            href='/dashboard/users'
            className={`${pathname==='/dashboard/users' ? 'active' : ''} flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
        >Users</Link>
        <Link
            href="/dashboard/settings"
            className={`${pathname==='/dashboard/settings' ? 'active' : ''} flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
        >Settings</Link>
                
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" onClick={logoutApp}>
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
    )
}

export async function logoutApp(){
  await logout();
}