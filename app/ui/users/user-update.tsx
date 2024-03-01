'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { userUpdate } from '@/app/lib/actions/users/users-action';

const initialState = {
    message: ''
  };

export default function UserUpdate({userdata}: {userdata:any}){
    const [state, formAction] = useFormState(userUpdate, initialState);
    return (
        <>
            <form action={formAction} className="space-y-3">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <label htmlFor="uname" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Name: </label>
                    <input type="text" id="uname" name="uname" defaultValue={userdata.name} placeholder="User Name" className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" /><br /><br />
                    <label htmlFor="uname" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Email: </label>
                    <input type="text" id="email" name="email" defaultValue={userdata.email} placeholder="Email" className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" /><br /><br />
                    <label htmlFor="uname" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Location: </label>
                    <input type="text" id="location" name="location" defaultValue={userdata.location} placeholder="Location" className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" /><br /><br />
                    {/* <p className='text-red-500'>
                        {state?.message}
                    </p><br /> */}
                    <input type="hidden" id='id' name='id' defaultValue={userdata.id} />
                    <button type='submit' className="p-2 mt-4 bg-red-400 text-white">Update</button>
                </div>
            </form>
        </>
    );
}