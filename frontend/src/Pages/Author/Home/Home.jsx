import React from 'react'
// import "../../../../HomeCss/home.css"
import clg from "../../../assets/college.jpg"
import { Link } from 'react-router-dom'
import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
import toast from 'react-hot-toast';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../content.jsx/sens';


const Home = () => {

    const queryClient = useQueryClient();

    const {data:user}=useQuery({queryKey:["user"]});

  const {mutate:logOut}=useMutation({
      mutationFn:async()=>{
          try
          {
              const res = await fetch(`${baseUrl}/api/auther/logout`,{
                  method:"POST",
                  credentials:"include",
                  headers:{
                      "content-type":"application/json"
                  }
              })
  
              const data = await res.json();
  
              if(!res.ok){
                  throw new Error(data.error || "Something Went Wrong" );
              }
  
              return data;
          }
          catch(error){
              throw error.message
          }
      },
      onSuccess:()=>{
          toast.success("Logout Successfully"),
          queryClient.invalidateQueries({queryKey:["user"]});
      },
      onError:()=>{
        toast.error("Login Failed")
      },
      retry:false
  })
   
  return (
       
            <section className='flex flex-col items-center bg-linear-to-b from-[#D9D9FF] to-[#F8F3F9] px-4 py-4' >
                <nav className="flex items-center justify-between gap-8 bg-white/60 border border-white rounded-full px-4 md:px-2 py-2.5 w-full max-w-2xl" >
            <Link to="/login"onClick={(e)=>{ e.preventDefault(); logOut()}} >
                            <button className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
                                <BiLogOut className='h-5 w-5'/>
                            </button>
                        </Link>
      
                    <div className='w-0.5 h-8 bg-gray-50 hidden md:flex'></div>
                    <div id="menu" className={`max-md:absolute max-md:bg-white/70 max-md:h-[785px] max-md:overflow-hidden max-md:transition-[width]  max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center gap-8 z-50 md:gap-10 flex-1 `}>
                        <Link to={`profile/${user.User}`}  className="text-gray-600  hover:text-gray-700 cursor-pointer text-sm">Profile</Link>
                        <Link to={`userEdit/${user.User}`}  className="text-gray-600 hover:text-gray-700 text-sm">Edit</Link>
                        <Link to="/student"  className="text-gray-600 hover:text-gray-700 text-sm">Students</Link>
                        <Link to="/create"  className="text-gray-600 hover:text-gray-700 text-sm">Create</Link>
                        <button id="close-menu"  className="md:hidden bg-violet-500 active:bg-violet-600 text-white p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 md:pr-1">
                        <Link to="/create">
                            <button className="hidden md:inline-block bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
                                Add Students
                            </button>
                        </Link>
                        <button id="open-menu"  className="md:hidden text-gray-700 p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                                <path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-30 rounded-full bg-white/50 border border-white">
                    <div className="relative flex size-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
                    </div>
                    <p className="text-sm text-black/60">Established in 1995, E. G. S. Pillay Engineering College is a renowned institution in Tamil Nadu</p>
                </div>

                <h1 className='text-4xl md:text-[66px]/19 text-center max-w-2xl mt-8 text-gray-800 bg-clip-text leading-tight font-medium'>Egs Pillay Engineering College</h1>

                <div className='w-full max-w-[800px] h-[3px] mt-10 bg-linear-to-r from-white/10 via-violet-600 to-white/10'></div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-18 max-w-[930px] w-full'>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>201 - 300</h2>
                        <p className='text-xs md:text-sm text-gray-500'>NIRF Rank Band</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>25000+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>Placement</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>A++</h2>
                        <p className='text-xs md:text-sm text-gray-500'>NAAC</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='font-medium text-2xl md:text-3xl text-gray-800'>150+</h2>
                        <p className='text-xs md:text-sm text-gray-500'>No of Industrial Relationships</p>
                    </div>
                </div>
            </section>
    
  )
}

export default Home
