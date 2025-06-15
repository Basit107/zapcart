import Product from "../models/product.models.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import paths  from "../config/path.js";
import cloudinary from "../config/cloudinary.js";

export const cloudinaryUpload = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "zapcart/products",
            unique_filename: true,
            resource_type: "image",
            transformation: [{ width: 500, height: 750,
                crop: 'fill',      // Ensures image fills the space
                gravity: 'center' // Centers the image
            },
            {
                quality: 'auto',    // Auto optimize quality
                fetch_format: 'auto' // Auto format like WebP/AVIF for better performance
            }]
        });

        // Remove the file from the local server after uploading to Cloudinary
        const baseName = path.basename(req.file.path);
        // log("Deleting local file (cloudinary):", baseName);
        const imagePath = path.join(paths.imageUploadDir, baseName);
        // ("Full image path (cloudinary):", imagePath);
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image_url: result.secure_url, // Use secure_url for HTTPS
            public_id: result.public_id // Store public_id for later deletion if needed
        });

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const addProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic to add a product
        const { name, image, public_id, category, new_price, old_price, available } = req.body;
        if (!name ||!image || !category || !new_price || !old_price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        let id;
        let products = await Product.find({});

        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }

        const product = new Product({
            id: id,
            name,
            image,
            public_id: public_id || null, // Store the public_id if using cloudinary
            category,
            new_price,
            old_price,
            available
        });

        await product.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: {
                id: product.id,
                name: product.name,
                image: product.image,
                category: product.category,
                price: product.new_price,
            }
        });
    } 
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const deleteProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const id  = req.params.id;
        const product = await Product.findOneAndDelete({ id:id }).session(session);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        // Delete the image file from the server
        // log("Deleting image:", product.image);
        // log("Image upload directory:", paths.imageUploadDir);
        // Ensure the image path is correct
        await cloudinary.uploader.destroy(product.public_id, { invalidate: true });
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ 
            success: true, 
            message: "Product deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error)
    }
}


export const updateProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id, name, image, category, new_price, old_price, available } = req.body;

        if (!id || !name || !image || !category || !new_price || !old_price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await Product.findOneAndUpdate({ id:id }, {
            name,
            image,
            category,
            new_price,
            old_price,
            available
        }, { new: true, session });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error)
    }
}

export const getUsers = async (request, response, next) => {
    try {
        // Fetching user data from the database
        let usersData = await Users.find({});
        
        // Sending the user data as a JSON response
        response.status(200).json({success: true, data: usersData});
    } 
    catch (error) {
        // Handling any errors that occur during the process
        next(error);
    }
}
