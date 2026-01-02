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
import authUpdateProfile from "./Hooks/authUpdate";


const EditUser = () => {

    const queryClient = useQueryClient();


  const [formdata,setFormdata] = useState(
    {
      User:"",
      Dept:"",
    }
  );



    const {data:user}=useQuery({queryKey:["user"]})

    console.log(user)
    



  useEffect(()=>{
    if(user){
      setFormdata({
        User:user.User,
        Dept:user.Dept
      })
    }
  },[user])

  const handleChangeEvent = (e)=>{
    if(user) {
      setFormdata(
       {...formdata,[e.target.name] :e.target.value}
      )
    }
  
  }


    const {authUpdate} = authUpdateProfile();

  	const {updateProfile} = updateProfiles();
  return (
   
     <section className='relative bg-black flex  flex-col md:flex-row justify-center px-20 py-20 gap-20 h-screen'>
      { user ? <>
                    <div className='text-center md:text-left mt-12'>
                 
                     <img className="h-90 w-90 rounded-lg" src={user?.ProfileImage} alt="userImage1" />
                </div>
                 <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-140 bg-green-500/35 rounded-full  h-full blur-[200px]'></div>

                <div className='w-full max-w-lg bg-[#00A63E]/0 backdrop-blur-sm border border-white/10 rounded-xl p-8 w-full'>
                    <form className='space-y-6' onSubmit={(e)=>{
                      e.preventDefault();
                      authUpdate(formdata)
                    }}>
                        <div>
                            <label className='block text-white text-sm mb-2'>User</label>
                            <input 
                                type="text" 
                                required
                                name="User"
                                value={formdata.User}
                                onChange={handleChangeEvent}
                                placeholder="Eden Johnson" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-500 transition'
                            />
                        </div>
            
                        <div>
                            <label className='block text-white text-sm mb-2'>Dept</label>
                            <input 
                                type="text" 
                                required
                                name="Dept"
                                value={formdata.Dept}
                                onChange={handleChangeEvent}
                                placeholder="Csc Or It" 
                                className='w-full bg-[#00A63E]/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition'
                            />
                        </div>

                        <div className='flex items-center justify-between'>
                            <p className='text-xs md:text-sm text-white/60 max-w-3xs'>
                                By submitting, you agree to our <span className='text-white'>Terms</span> and <span className='text-white'>Privacy Policy</span>.
                            </p>
                            <button type="submit" className='bg-linear-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer'>
                                Add Student
                            </button>
                        </div>
                        					<Link to="/" >
							<div className="rainbow relative m-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
									<button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
												Back
									</button>
							</div>
					</Link>
                    </form>
                </div>
        </> : ""
      } 
                
                
    </section>
  )
}

export default EditUser;