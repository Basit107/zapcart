import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, CLOUDINARY_URL } from './env.js';

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
})

export default cloudinary;