import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file upload on cloudinary succsessfully", responce.url);
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath); // this line is doing that to delete the temprory file from server deleted
    return null;
  }
};
export default { uploadOnCloudinary };
