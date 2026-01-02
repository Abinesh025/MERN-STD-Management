import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { use, useEffect } from 'react';
import toast from "react-hot-toast"

import { useState} from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import { baseUrl } from "../../content.jsx/sens";
const Login = () => {

  const [formData,setFormData] = useState(
    {
      User:"",
      Password:"",
    }
  );

  const queryClient =useQueryClient()

  const {mutate} = useMutation({
      mutationFn:async({User,Password})=>{
        try
        {
          const res = await fetch(`${baseUrl}/api/auther/login`,{
            method:"POST",
            credentials:"include",
            headers:{
              "content-type":"application/json",
              "accept-type":"application/json"
            },
            body:JSON.stringify({User,Password})
          })

          const data = await res.json();

          if(!res.ok){
            throw  new Error(data.error || "Something Went Wrong")
          }

          return data;
        }
        catch(error)
        {
          throw error.message
        }
      },
      onSuccess:()=>{
        toast.success("Login Successfully");
        queryClient.invalidateQueries({queryKey:["user"]});
      },
      onError:()=>{
        toast.error("User Not Found ");
      },
      retry:false

  })

  const handleChangeEvent = (e)=>{
    setFormData({...formData,[e.target.name] :e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    mutate(formData);
    console.log(formData);
  }

  return (
    <div>
       <main className="flex items-center justify-center w-full px-4 mt-20  ">
            <form className="flex w-full flex-col max-w-96 focus:ring-indigo-600" onSubmit={handleSubmit}>
        
                <a href="https://prebuiltui.com" className="mb-8" title="Go to PrebuiltUI">
                    <svg className="size-10" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m8 4.55 6.75 3.884 6.75-3.885M8 27.83v-7.755L1.25 16.19m27 0-6.75 3.885v7.754M1.655 8.658l13.095 7.546 13.095-7.546M14.75 31.25V16.189m13.5 5.976V10.212a2.98 2.98 0 0 0-1.5-2.585L16.25 1.65a3.01 3.01 0 0 0-3 0L2.75 7.627a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                            stroke="#f3f3f3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
        
                <h2 className="text-4xl font-medium text-white-900">Log in</h2>
        
                <p className="mt-4 text-base text-lightgrey-500/90">
                    Please enter User and password to access.
                </p>
        
                <div className="mt-10">
                    <label className="font-medium">User</label>
                    <input
                        placeholder="Please enter User Name"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="User"
                        name="User"
                        value={formData.User}
                        onChange={handleChangeEvent}
                    />
                </div>
        
                <div className="mt-6">
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChangeEvent}
                    />
                </div>
        
                <button
                    type="submit"
                    className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-700 text-white- transition hover:bg-indigo-700"
                >
                    Login
                </button>
                <p className='text-center py-8'>
                    Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign up </Link>
                </p>
            </form>
        </main>

    </div>
       
  )
}

export default Login