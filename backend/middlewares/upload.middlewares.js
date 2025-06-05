import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { PORT } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({ 
    destination: path.join(__dirname, '../upload/images'), 
    filename: (req, file, cb) => { 
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); 
    } 
});

export const staticUpload = (req, res) => {
    res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    image_url:`http://localhost:${PORT}/images/${req.file.filename}`,
    image: req.file.filename
  })
}

export const upload = multer({ storage: storage });
