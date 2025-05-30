import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config({
  path: "./env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECERT_KEY,
});


const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file has been uploaded successfully", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temp files as the upload operation got failed
        return null;
    }
}

export {uploadCloudinary}