import autherModel from "../model/authmodel.js";
import bcryptjs from "bcryptjs";
import { getToken } from "../Utilis/Cookies.js";
import { v2 as cloudinary } from "cloudinary";


        // <----------------SignUp Function------------->

export  const getSignUp =async(req,res)=>{
   
    try
    {
        //user validation
        const {User,Dept,Password} = req.body;
        
        //password validation
        if(!Password.length > 6){
            return res.status(400).json({error:"Password must have 6 characters"})
        }

        //Password Hash
        const passwordSalt = await bcryptjs.genSalt(12);

        const hashPassword =await bcryptjs.hash(Password,passwordSalt);
   
            const currentUser = await new autherModel(
                {
                    User,
                    Dept,
                    Password:hashPassword
                }
            )
            await currentUser.save()

            return res.status(200).json(currentUser);
        }
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in Signup" +  `${error.message}`})
    }
};

        // <----------------Login Function------------->

export const getLogin = async(req,res)=>{
    try{
        const {User,Password} =req.body;

        const user = await autherModel.findOne({User});

        if(!user)
        {
            return res.status(400).json({error:"User Not Found"})
        }

        // Verify Password
        const verifyPassword = await bcryptjs.compare(Password,user?.Password || "");

        if(!verifyPassword){
            return res.status(400).json({error:"Password doesn't match"});
        }

        if(user){
            getToken(user._id,res);
             res.status(200).json({
                User:user.User
            });
        }
    }
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in Login" +  `${error.message}`})
    }
};

        // <----------------LogOut Function------------->

export const getLogout = async(req,res)=>{
    try
    {
         res.cookie("JWT","",{
            maxAge:0,
            httpOnly:true,
            sameSystem:true
        })

        return res.status(200).json({message:"Logout SuccessFully"});
    }
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in Logout"})
    }
};

    // <---------- Get Me --------->
    
export const getMe = async(req,res)=>{
    try
    {
        const user = await autherModel.findOne({_id:req.user._id}).select("-Password");

        if(!user){
            return res.status(200).json({error:"User not found"});
        }

        return res.status(200).json(user);
    }
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in getMe"})
    }
};

  // <---------- Get Profile --------->

export const getProfile = async(req,res)=>{
    try
    {
        const {User} = req.params;

        const user =await autherModel.findOne({User}).select("-Password")

        if(!user){
            return res.status(200).json({error:"User not found"});
        }

        return res.status(200).json(user);
    }
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in getProfile"})
    }
};

export const getupdateAuth = async(req,res)=>{
    try
    {
        const {user}= req.params;

        let {User,Dept} = req.body;

        let {ProfileImage} = req.body;

        const student = await autherModel.findOne({User:user});

        console.log(student);
        
        if(ProfileImage){
            if(student.ProfileImage){
                await cloudinary.uploader.destroy(student.ProfileImage.split("/").pop().split(".")[0]);
            }

         const changePhoto =    await cloudinary.uploader.upload(ProfileImage);
         ProfileImage = changePhoto.secure_url;
        }

        student.User = User ||student.User,
        student.Dept = Dept || student.Dept,
        student.ProfileImage = ProfileImage || student.ProfileImage

        await student.save();

        return res.status(200).json(student);

    } 
    catch(error)
    {
        console.log(`Error is ${error.message} abi`);

        return res.status(500).json({error:"Internal Server Error in Update"});
    }
}

