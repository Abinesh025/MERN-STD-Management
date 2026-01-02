import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import boy from "../../../assets/boy.png"
import authUpdateProfile from "./Hooks/authUpdate";




const ProfilePage = () => {
	
	const [ProfileImage, setProfileImage] = useState(null);


	const ProfileImageRef = useRef(null);


	const { User } = useParams();

	const {data:user,isLoading,refetch,isRefetching} = useQuery({
		queryKey:["user"],
		queryFn: async () => {
			try {
				const res = await fetch(`${baseUrl}/api/auther/getProfile/${User}`,{
					method:"GET",
					credentials:"include",
					headers:{
						"Content-Type":"application/json"
					}
				});
				const data = await res.json();
				
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error.message || "Something Went Wrong");
			}
		},retry:false
	});

		const {authUpdate} = authUpdateProfile();


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

	useEffect(() => {
		refetch();
	}, [User, refetch]);

	const defaultText = "E.G.S Pillay Engineering Collge Staff With the Experience of 10+ Years";


		
			
    return (
		<div className="w-full h-screen bg-gray-300 flex justify-center items-center ">

        <div className="w-full max-w-[900px] h-100 border-b border-gray-300 space-y-4 p-3 bg-white text-gray-500 text-sm rounded">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
					 <div className='relative group/cover mt-10 mb-10 '>
					 	<input
							type='file'
							hidden
							accept='image/*'
							ref={ProfileImageRef}
							onChange={(e) => handleImgChange(e, "ProfileImage")}
						/>
						{/* USER AVATAR */}
							<div className='avatar absolute -bottom-16 left-4'>
								<div className='w-32 rounded-full relative group/avatar'>
									<img src={ProfileImage || user?.ProfileImage || boy} />
										<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>		
											<MdEdit
												className='w-4 h-4 text-white'
												onClick={() => ProfileImageRef.current.click()}
											/>	
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{ProfileImage && (
								<button className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'onClick={()=>{
									authUpdate({ProfileImage})
								}}	>Update </button> )}
							</div>
							<div className="mt-40 flex items-center gap-1">	
								<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z" fill="#FF532E"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z" fill="#FF532E"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z" fill="#FF532E"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z" fill="#FF532E"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z" fill="#FF532E"/>
                    </svg>
							</div>

                </div>
            </div>
            <p>{defaultText}</p>
            <div>
                <p className="text-gray-800 font-medium">{user?.User}</p>
                <p>{user?.Dept}</p>
            </div>
					<Link to="/" >
							<div className="rainbow relative m-3 z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
									<button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur w-full cursor-pointer" >
												Back
									</button>
							</div>
					</Link>
        </div>
	</div>
    )
}
		
export default ProfilePage;

							// <div className='relative group/cover'>

							// 	<input
							// 		type='file'
							// 		hidden
							// 		accept='image/*'
							// 		ref={ProfileImageRef}
							// 		onChange={(e) => handleImgChange(e, "ProfileImage")}
							// 	/>
							// 	{/* USER AVATAR */}
							// 	<div className='avatar absolute -bottom-16 left-4'>
							// 		<div className='w-32 rounded-full relative group/avatar'>
							// 			<img src={ProfileImage || user?.ProfileImage || boy} />
							// 			<div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
											
							// 					<MdEdit
							// 						className='w-4 h-4 text-white'
							// 						onClick={() => ProfileImageRef.current.click()}
							// 					/>
											
							// 			</div>
							// 		</div>
							// 	</div>
							// </div>
							// <div className='flex justify-end px-4 mt-5'>
		
							// 	{ProfileImage && (
							// 		<button
							// 			className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
							// 	onClick={()=>{
							// 		authUpdate({ProfileImage})
							// 	}}	>
							// 		Update
							// 		</button>
							// 	)}
							// </div>