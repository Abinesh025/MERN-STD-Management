import jsonwebtoken from "jsonwebtoken"
import autherModel from "../model/authmodel.js";

// <------protectRoutes ------->

export const protectRoutes = async(req,res,next)=>{
    try
    {
        const token = req.cookies.JWT;

        if(!token){
            return res.status(400).json({error:"Token Not Found"})
        }

        const decode =  jsonwebtoken.verify(token,process.env.TOKEN_KEY);
        
        if(!decode){
            return res.status(400).json({error:"Token Doesn't Match"});
        }


        const user = await autherModel.findOne({_id:decode.userID});

        if(!user){
            return res.status(400).json({error:"User Not Foun in MongoDB"})
        }

        req.user = user;

        next();
    }   
    catch(error)
    {
        return res.status(500).json({error:"Internal Server Error in Protect"});
    }
}