  'use client';
import { Button } from '@/app/ui/button';
import { userCreateSubmit } from '@/app/lib/actions/users/users-action';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UserDate from '@/app/ui/users/user-date';
import UserTime from '@/app/ui/users/user-time';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const initialState = {
    message: ''
  };

  const defaultValues = {
    uname: "",
    email: "",
    location: "",
    utype: "creature",
    st_date: "",
    ed_date: "",
    st_time: "",
    ed_time: ""
  };

export default function UserCreate(){
    const {register, formState: {errors}, reset, handleSubmit, setValue} = useForm();
    const [img64, img64set] = useState('');
    const [userType, userTypeChange] = useState('');
    const [currentLocation, setCurrentLocation]:any = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [autocomplete, setAutocomplete]:any = useState(null);
    const center = currentLocation || { lat: 0, lng: 0 };
    const containerStyle = {width: '100%', height: '300px', margin: '10px 0'};

    let createUser = async (data:any) => {
      data.img = img64;
      let res = await userCreateSubmit(data);
    }
    
    const changeUserType = (e:any) => {
      console.log(`${process.env.Google_Map_Api_Key}`);
      let utype = e.target.value;
      userTypeChange(utype);
      if(utype === "1"){
        reset({st_time: "", ed_time: ""});
      }else if(utype === "2"){
        reset({st_date: "", ed_date: ""});
      }else{
        reset({st_date: "", ed_date: "", st_time: "", ed_time: ""});
      }
    }

    /* Selected Image convert to base64 string */
    const handleImage = (event:any) => {
      const file = event.target.files[0];
      const imgname = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img:any = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx:any = canvas.getContext("2d");
          ctx.drawImage(
              img,
              (maxSize - img.width) / 2,
              (maxSize - img.height) / 2
          );
          canvas.toBlob(
            (blob:any) => {
              const file = new File([blob], imgname, {
                  type: "image/png",
                  lastModified: Date.now(),
              });
              const reader = new FileReader();
              reader.onload = (e) => {
                  const target = e.target;
                  if (target) {
                      const base64String = target.result;
                      setImgVal(base64String);
                  } else {
                  }
              };
              reader.readAsDataURL(file);
            },
            "image/jpeg",
            0.8
          );
        };
      };
    }

    /* base64 string set to "useState" variable */
    async function setImgVal(val:any){
      img64set(val);
    }

    const handlePlaceSelect = () => {
      if (autocomplete !== null) {
          const place = autocomplete.getPlace();
          const event_location = place.formatted_address;
          if (place.geometry) {
              const location = {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
              };
              setCurrentLocation(location);
              setSelectedPlace(place);
          }
      }
  };

  const handleLoad = (autocomplete:any) => {
      setAutocomplete(autocomplete);
  };


    return (
        <>
            <form onSubmit={handleSubmit(createUser)} className="space-y-3">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <label htmlFor="uname" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Name: </label>
                    <input {...register("uname", { required: true })} aria-invalid={errors.uname ? "true" : "false"} className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
                    {errors.uname?.type === "required" && (<p className='text-red-400'>User Name is required</p>)}
                    
                    <label htmlFor="email" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Email: </label>
                    <input {...register("email", { required: true, pattern:{
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: ''
                    } })} aria-invalid={errors.email ? "true" : "false"} className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
                    {errors.email?.type === "required" && (<p className='text-red-400'>Email is required</p>)}
                    {errors.email?.type === "pattern" && (<p className='text-red-400'>Enter valid email</p>)}
                    
                    <label htmlFor="location" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Location: </label>
                    <input {...register("location", { required: true })} aria-invalid={errors.location ? "true" : "false"} className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
                    {errors.location?.type === "required" && (<p className='text-red-400'>Location is required</p>)}
                    
                    <label htmlFor="img" className="mb-3 mt-5 block text-xs font-medium text-gray-900">Profile Picture: </label>
                    <input {...register("img", { required: true, 
                        validate:{
                          lessThan30KB: (file) => file[0]?.size < 900000 || "Max 9MB",
                          acceptedFromats: (file) => ["image/jpg","image/jpeg","image/png"].includes(file[0]?.type) || "Only PNG file"
                        }
                      })} 
                      type="file"
                      name="img"
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={handleImage}
                    />
                    {errors.img?.type === "required" && <p className='text-red-400'>Please select profile picture</p>}
                    {errors.img?.type === "lessThan30KB" && (<p className='text-red-400'>Profile Picture should be lessthan 9MB</p>)}
                    {errors.img?.type === "acceptedFromats" && (<p className='text-red-400'>Profile Picture should be JPG, JPEG, PNG</p>)}
                    
                    <label htmlFor="utype" className="mb-3 mt-5 block text-xs font-medium text-gray-900">User Date or Time</label>
                    <select {...register("utype", {required: true})}
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      onChange={changeUserType}
                    >
                      <option value="">Select Date or Time</option>
                      <option value="1">Date</option>  
                      <option value="2">Time</option>  
                    </select>
                    {errors.utype?.type === "required" && (<p className='text-red-400'>Please select User Type</p>)}

                    { (userType == '1') ? 
                      <UserDate register={register} errors={errors} />
                     : '' }
                    { (userType == '2') ? 
                      <UserTime register={register} errors={errors} />
                     : '' }

                    {/* Google Map API with search places */}
                    <label htmlFor="utype" className="mb-3 mt-5 block text-xs font-medium text-gray-900">YOur Location</label>
                    <LoadScript googleMapsApiKey='AIzaSyClMHJ_a2SkwpYG6ReqClZmKJwLiT7Jrg4' libraries={['places']}>
                      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceSelect}>
                        <input type='text' name='location' className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500' placeholder='Location' />
                      </Autocomplete>
                      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                          {currentLocation && (
                              <Marker position={currentLocation} title="Your Location" />
                          )}
                      </GoogleMap>
                    </LoadScript>

                    <Button className="mt-4 w-full">Create</Button>
                    {/* <p className='text-red-500'>
                        {state?.message}
                    </p><br />
                    <LoginButton /> */}
                </div>
            </form>
        </>
    );
}

function LoginButton() {
    return (
      <Button className="mt-4 w-full">
        Log in
      </Button>
    );
  }