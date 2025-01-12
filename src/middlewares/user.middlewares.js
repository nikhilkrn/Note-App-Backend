import jwt from "jsonwebtoken";
import { apiError } from '../utils/apiError.js'
import { User } from '../models/users.models.js'
import { asyncHandler } from "../utils/asyncHandler.js";

//write Auth Logic Here
export const verifyToken =  asyncHandler(async(req,res,next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","")
    
        if(!token){
            res.status(403).json(
                new apiError(403,"Unauthorized request")
            )
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log("token:",token)
        // console.log("ACCESS TOKEN: ",process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodedToken)
        const user = await User.findById(decodedToken?.id).select('-passowrd -refreshtoken')
        
        if (!user) {
            res.status(405).json(
                new apiError(401,"Invalid Token")
            )
        }
        req.user = user
        next()
    } catch (error) {
        throw new apiError(500,"something went wrong while validating")
    }
})
