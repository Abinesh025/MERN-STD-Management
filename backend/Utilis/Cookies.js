import jasonToken from "jsonwebtoken"

export const getToken = async(userID,res)=>{
    try
    {
        const token = jasonToken.sign({userID},process.env.TOKEN_KEY,{
            expiresIn:"15D"
        });

        res.cookie("JWT",token,{
            maxAge:15*24*60*1000,
            httpOnly:true,
            sameSystem:true
        })
    }
    catch(error){
        return res.status(400).json({error:"Token not Found in cookies"})
    }
}