import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "shoes", // Cloudinary folder
      format: "png", // Convert all images to PNG
      public_id: `${file.originalname.split(".")[0]}-${Date.now()}`, // Unique ID
    };
  },
});


export const upload = multer({ storage });


