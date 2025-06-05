import Product from "../models/product.models.js";
import mongoose from "mongoose";

export const addProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic to add a product
        const { name, image, category, new_price, old_price, available } = req.body;
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
        const { id } = req.params.id;
        const product = await Product.findOneAndDelete({ id }).session(session);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ 
            success: true, 
            message: "Product deleted successfully" 
        });

    } catch (error) {
        console.error("Error deleting product:", error);
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

        const product = await Product.findOneAndUpdate({ id }, {
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
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error)
    }
}