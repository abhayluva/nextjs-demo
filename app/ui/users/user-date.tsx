export default function UserDate({register, errors}: {register:object, errors: error}){
    return(
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="st_date" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Start Date</label>
                    <input type='date' {...register("st_date", {required: true})} name="st_date" id="st_date" 
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    {errors.st_date?.type === "required" && (<p className='text-red-400'>Start Date is required</p>)}
                </div>
                <div>
                <label htmlFor="ed_date" className="mb-3 mt-5 block text-xs font-medium text-gray-900">End Date</label>
                <input type='date' {...register("ed_date", {required: true})} name="ed_date" id="ed_date" 
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                    {errors.ed_date?.type === "required" && (<p className='text-red-400'>End Date is reuiqred</p>)}
                </div>
            </div>
        </>
    );
}