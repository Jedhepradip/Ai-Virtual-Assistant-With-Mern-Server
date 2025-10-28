// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";


export const UploadCloudinary = async (filepath:string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  try {
    const uploadreuslt = await cloudinary.uploader.upload(filepath)
    return uploadreuslt.secure_url;
  } catch (error) {
    console.log(error);
  }

}
// export default cloudinary;