import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust to point to project root from /config
const rootDir = path.resolve(__dirname, "..");

// Upload directories
const uploadDir = path.join(rootDir, "upload");
const imageUploadDir = path.join(uploadDir, "images");

const paths = {
  rootDir,
  uploadDir,
  imageUploadDir,
};

export default paths;
