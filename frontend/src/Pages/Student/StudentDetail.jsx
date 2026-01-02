import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { baseUrl } from "../../content.jsx/sens"
import "../../../public/TableCss/table.css"
import { Link, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import boy from "../../assets/boy.png"
import { useRef, useState } from "react"
import { MdEdit } from "react-icons/md";
import vadivelu from "../../assets/no data.png"

const Studentdetails = () => {

	 const queryClient = useQueryClient()
    
      const {data:students} = useQuery({
        queryKey:["students"],
        queryFn:async()=>{
            try{
                const res = await fetch(`${baseUrl}/api/student/AllDetails`,{
                    method:"Get",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    }
                })

                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.error || "Something Went Wrong")
                }

                return data;
            }catch(error)
            {
                    throw error.message
            }
        }
    })

    const {mutate}=useMutation({
        mutationFn:async(id)=>{
            try{
                const res = await fetch(`${baseUrl}/api/student/stdDelete/${id}`,{
                    method:"get",
                    credentials:"include",
                    headers:{
                        "content-type":"application/json"
                    }
                })

                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.error || "Something Went Wrong")
                }

                return data
            }
            catch(error)
            {
                throw error.message
            }
        },onSuccess:()=>{
            toast.success("Student Deleted Successfully")
            queryClient.invalidateQueries({data:["students"]});
        }
    })


    const handleDelete = (id)=>{
        alert("Are you sure You want to Delete");
        mutate(id);
    }


    const student1 = students?.slice(0,10);
    const student2 = students?.slice(10,20);
    const student3 = students?.slice(20,30);
    const student4 = students?.slice(30,40);
    const student5 = students?.slice(40,50);
    const student6 = students?.slice(50,60);

 
    return (
        
                    <div className="flex flex-wrap items-center justify-center p-2 gap-10 mt-10 mb-10">
                        {student1.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                    <img src={ student?.ProfileImage || boy}  className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>  	
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>   
                                    </div>
                                    <div className="px-4 pb-4 leading-7">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student.StudentName}`} >
                                                <div className="rainbow relative mt-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                        <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                            </button>
                                        </div>
                                        <Link to="/" > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                Back
                                            </button>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                        ))}

                        {student2.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                        <img src={ProfileImage ||student?.ProfileImage || boy} alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                                    </div>
                                    <div className="px-4 pb-4 leading-7">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student?._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                        <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                                </button>
                                            </div>
                                    </div>
                                </div>
                        ))}

                        {student3.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                    <img src={ProfileImage || student?.ProfileImage || boy}  className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>  	
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>       
                                    </div>
                                    <div className="px-4 pb-4">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center mt-3 rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                                                    <Link to={`/edit/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                Edit
                                            </button>
                                        </div>
                                        </Link>
                                            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                                </button>
                                            </div>
                            
                                    </div>
                                </div>
                        ))}

                        {student4.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                        <img src={ProfileImage ||student?.ProfileImage || boy} alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 mt-3 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                                                    <Link to={`/edit/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                Edit
                                            </button>
                                        </div>
                                        </Link>
                                        <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                                </button>
                                            </div>
                                    </div>
                                </div>
                        ))}

                        {student5.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                    <img src={ProfileImage || student?.ProfileImage || boy}  className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>  	
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>   
                                    </div>
                                    <div className="px-4 pb-4">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center mt-3 rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                                                    <Link to={`/edit/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                Edit
                                            </button>
                                        </div>
                                        </Link>
                                            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                                </button>
                                            </div>
                            
                                    </div>
                                </div>
                        ))}

                        {student6.map((student)=>(
                                <div className="max-w-80 bg-black text-white rounded-2xl">
                                    <div className="relative -mt-px overflow-hidden rounded-2xl">
                                        <img src={ProfileImage ||student?.ProfileImage || boy} alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" />
                                        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <p className="font-medium border-b border-gray-600 pb-2">{student.StudentName}</p>
                                        <p className="mt-2">{student.RegNum}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2 bg-clip-text">{student.Email}</p>
                                        <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent mt-2  bg-clip-text">{student.PhoneNum}</p>
                                        <Link to={`/view/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center  mt-3 justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                View Profile
                                            </button>
                                        </div>
                                        </Link>
                                                                    <Link to={`/edit/${student._id}`} > 
                                                <div className="rainbow relative z-0 bg-white/15 mt-3 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                                            <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer">
                                                Edit
                                            </button>
                                        </div>
                                        </Link>
                                        <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 mt-3">
                                                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" onClick={()=>{handleDelete(student._id)}}>
                                                    Delete
                                                </button>
                                            </div>
                                    </div>
                                </div>
                        ))} 
                    </div>   
    )
}

export default Studentdetails