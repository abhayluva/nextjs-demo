import Links from '@/app/components/links'
import type { Metadata } from 'next';

export const metadata:Metadata = {
    title: 'Demo - Dashboard Page',
    description: 'Dashboard page details showing here'
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
	      <div className="w-full flex-none md:w-64">
	        <Links />
	      </div>
	      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
	    </div>
    );
}