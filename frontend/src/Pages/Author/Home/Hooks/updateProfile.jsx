import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { baseUrl } from "../../../../content.jsx/sens";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
const updateProfiles = ()=>{

	const queryClient = useQueryClient();
    
  const {StudentName} = useParams();

    	const {mutate:updateProfile} = useMutation({
		mutationFn:async(formData)=>{
			try{
				const res= await fetch(`${baseUrl}/api/student/stdUpdated/${StudentName}`,{
					method:"POST",
					credentials:"include",
					headers:{
						"Content-Type":"application/json",
					},
					body:JSON.stringify(formData)
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
return {updateProfile}
}

export default updateProfiles