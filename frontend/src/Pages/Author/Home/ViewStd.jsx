import React, { useEffect, useRef, useState } from 'react'
import { AiFillProfile } from "react-icons/ai";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsSkipBackward } from "react-icons/bs";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../content.jsx/sens';
import boy from "../../../assets/boy.png"


const ViewStudent = () => {

   const {id} = useParams();

const queryClient = useQueryClient();

  const {data:std} = useQuery({
    queryKey:["std"],
    queryFn:async()=>{
      try{
        const res = await fetch(`${baseUrl}/api/student/stdProfile/${id}`,{
          method:"GET",
          credentials:"include",
          headers:{
            "content-type":"application/json"
          }
        })
        const data =await res.json();

        if(!res.ok){
          throw new Error(data.error || "Something Went Wrong");
        }

        return data;

      }
      catch(error)
      {
        throw error
      }
    }
  })

 
 
      	

  const defaultText = "E.G.S Pillay Engineering Collge";
   
  return (
        <div>
  
        <div class="flex flex-wrap items-center justify-center gap-6 mt-10">
            <div class="max-w-80 bg-black text-white rounded-2xl">
                <div class="relative -mt-px overflow-hidden rounded-2xl">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600" alt="" class="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
            <div class="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
        </div>
        <div class="px-4 pb-4 leading-5">
            <p class="font-medium border-b border-gray-600 pb-5">{defaultText}</p>
            <p class="mt-4">{std?.StudentName}</p>
            <p class="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">{std?.RegNum}</p>
            <p class="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">{std?.Email}</p>
            <p class="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">{std?.PhoneNum}</p>
        </div>
        <Link to={`/stdEdit/${std?.StudentName}`} >
                <div className="rainbow relative m-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                        <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
                                    Edit
                        </button>
                </div>
        </Link>
        <Link to="/student" >
                <div className="rainbow relative m-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                        <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
                                    Back
                        </button>
                </div>
        </Link>
    </div>

    </div>
    </div>
   
		)
			
  
}

export default ViewStudent