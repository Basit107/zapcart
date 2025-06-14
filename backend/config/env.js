import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development' }.local`});

export const { 
    PORT, 
    DB_URI, 
    SECRET_SAULT, 
    NODE_ENV,
    JWT_EXPIRATION,
    ARCJET_KEY,
    ARCJET_ENV,
    CLOUD_NAME,
    CLOUD_API_SECRET,
    CLOUD_API_KEY,
    CLOUDINARY_URL,
} = process.env;