import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import boy from "../../../assets/boy.png"
import { useState} from 'react';
import { data, Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../content.jsx/sens';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { MdEdit } from "react-icons/md";
import updateProfiles from './Hooks/updateProfile';



const EditStudent = () => {

    const queryClient = useQueryClient();

    	const [ProfileImage, setProfileImage] = useState(null);


	const ProfileImageRef = useRef(null);

  const [formData,setFormData] = useState(
    {
      StudentName:"",
      RegNum:"",
      Email:"",
      PhoneNum:"",
    }
  );


    const {data:std} = useQuery({queryKey:["std"],queryFn:EditStudent});
  useEffect(()=>{
    if(std){
      setFormData({
        StudentName:std.StudentName,
        RegNum:std.RegNum,
        Email:std.Email,
        PhoneNum:std.PhoneNum
      })
    }
  },[std])

  const handleChangeEvent = (e)=>{
    if(std){
      setFormData({...formData,[e.target.name] :e.target.value})
    }
  
  }

  	const {updateProfile} = updateProfiles();

    
 	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "ProfileImage" && setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};


  return (
   
     <section className='relative bg-black flex  flex-col md:flex-row justify-center px-20 py-20 gap-20'>
      {
        std ? <>
            <div className='text-center md:text-left mt-12'>
                    <div className="flex items-center  p-1.5 rounded-full border border-green-900 text-xs w-fit mx-auto md:mx-0">
                        <div className="flex items-center">
                            <img className="size-7 rounded-full border border-green-900" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-2" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
                            <img className="size-7 rounded-full border border-green-900 -translate-x-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" />
                        </div>
                        <p className="-translate-x-2 text-xs text-slate-200">Join community of 1m+ founders </p>
                    </div>
                    <h1 className='font-medium text-3xl md:text-5xl/15 bg-linear-to-r from-white to-green-300 bg-clip-text text-transparent max-w-[470px] mt-4'>Ready to Transform Your Digital Experience?</h1>
                    <p className='text-sm/6 text-white max-w-[345px] mt-4 mx-auto md:mx-0'>Let our design team craft a website that elevates your brand. Book a free session today.</p> 
                </div>
 
                 <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-140 bg-green-500/35 rounded-full blur-[200px]'></div>

                <div className='w-full max-w-lg bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8'>
                    <form className='space-y-6' onSubmit={(e)=>{
                      e.preventDefault();
                      updateProfile(formData)
                    }}>
                        <div>
                            <label className='block text-white text-sm mb-2'>StudentName</label>
                            <input 
                                type="text" 
                                required
                                name='StudentName'
                                value={formData.StudentName}
                                onChange={handleChangeEvent}
                                placeholder="Eden Johnson" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-500 transition'
                            />
                        </div>
            
                        <div>
                            <label className='block text-white text-sm mb-2'>RegNum</label>
                            <input 
                                type="text" 
                                required
                                name='RegNum'
                                value={formData.RegNum}
                                onChange={handleChangeEvent}
                                placeholder="8208EXXXXXXXX" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-2'>Email</label>
                            <input 
                                type="email" 
                                required
                                value={formData.Email}
                                name='Email'
                                onChange={handleChangeEvent}
                                placeholder="example@gmail.com" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-2'>PhoneNum</label>
                            <input 
                                type="text" 
                                required
                                value={formData.PhoneNum}
                                name='PhoneNum'
                                onChange={handleChangeEvent}
                                placeholder="8654785622" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>
            
                        <div className='flex items-center justify-between'>
                            <p className='text-xs md:text-sm text-white/60 max-w-3xs'>
                                Confirm Your Changes...
                            </p>
                            <button type="submit" className='bg-linear-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer'>
                                Add Student
                            </button>
                                  <Link to="/student" >
                            <div className="rainbow relative m-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                               <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
                                           Back
                               </button>
                       </div>
               </Link>
                        </div>
                    </form>
                </div>
        </>
       :   ""
      } 
                
                
    </section>
  )
}

export default EditStudent;