import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = asyncHandler(async(req,res,next)=>{
    // id web-then getting token from cookies or if android-then from header because android can get give cookies
    try{
        const token = req.cookies?.accessToken
        console.log(token);
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }
        // decode token to info
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // getting user 
        console.log(decodedToken);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(user);
        // if invalid access token throw error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = user;
        next()
    }catch(error){
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})
export {verifyJWT}