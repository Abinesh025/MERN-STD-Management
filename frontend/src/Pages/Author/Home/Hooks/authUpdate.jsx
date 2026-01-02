import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { baseUrl } from "../../../../content.jsx/sens";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


const authUpdateProfile = ()=>{
	const {User} = useParams();
	
	const queryClient = useQueryClient();

    	const {mutate:authUpdate} = useMutation({
		mutationFn:async(formdata)=>{
			try{
				
				const res= await fetch(`${baseUrl}/api/auther/UpdateAuther/${User}`,{
					method:"POST",
					credentials:"include",
					headers:{
						"Content-Type":"application/json",
					},
					body:JSON.stringify(formdata)
				})

				const data = await res.json()

				if(!res.ok){
					throw new Error(data.error || "Something went wrong")
				}

                return data
			}catch(error)
			{
				throw error.message
			}
		},onSuccess:()=>{
			toast.success("Updated SuccessFully")
			
        
		},onError:(error)=>{
			console.log(error)
		},
		retry:false
	},
);
return {authUpdate}
}

export default authUpdateProfile