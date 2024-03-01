'use client';
import { useSearchParams } from 'next/navigation';
export default function Search(){
    const searchParams = useSearchParams();
    let page = searchParams.get('page');
    const params = new URLSearchParams(searchParams);
}