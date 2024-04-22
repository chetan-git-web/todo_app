import {v2 as cloudinary} from "cloudinary"

import fs from "fs"

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfully
        console.log(`file is uploaded successfully ${response.url}`)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath)
        //remove the locally saved temperory file as the upload operation got failed
        return null;
    }
}

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    }
);

