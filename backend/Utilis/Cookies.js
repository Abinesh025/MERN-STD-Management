import jasonwebtoken from "jsonwebtoken"

export const getToken = async(userID,res)=>{
    try
    {
        const token = jasonwebtoken.sign({userID},process.env.Token_key,{
            expiresIn:"15d"
        });

        res.cookie("JWT",token,{
            maxAge:15*24*60*1000,
            httpOnly:true,
            sameSystem:true
        })
    }
    catch(error){
        return res.status(400).json({error:"Token not Found"})
    }
}