export default function UserTime({register, errors}: {register:object, errors: error}){
    return(
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="st_time" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Start Time</label>
                    <input type='time' {...register("st_time", {required: true})} name="st_time" id="st_time" 
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    {errors.st_time?.type === "required" && (<p className='text-red-400'>Start Tme is required</p>)}
                </div>
                <div>
                <label htmlFor="ed_time" className="mb-3 mt-5 block text-xs font-medium text-gray-900">End Time</label>
                <input type='time' {...register("ed_time", {required: true})} name="ed_time" id="ed_time" 
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                    {errors.ed_time?.type === "required" && (<p className='text-red-400'>End Time is reuiqred</p>)}
                </div>
            </div>
        </>
    );
}