import multer from "multer";
import path from "path";
import { PORT } from '../config/env.js';

export const storage = multer.diskStorage({ 
    destination: './upload/images', 
    filename: (request, file, cb) => { 
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); 
    } 
});

export const staticUpload = (req, res, next) => {
    response.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    image_url:`http://localhost:${PORT}/images/${request.file.filename}`,
    image: image
  })
}

export const upload = multer({ storage: storage });
