import Product from "../models/product.models.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
        console.log("All products Fetched.");
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error);
    }
}

export const getPopularPrducts = async (req, res, next) => {
    try {
        let products = await Product.find({category:"mobile"});
        let popularproducts = products.slice(0, 4);
        res.send(popularproducts)
        console.log("Popular Products Have been fetched");
    } catch (error) {
        console.error("error fetching Popular products: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error)
        
    }
}

export const getNewProducts = async (req, res, next) => {
    try {
        let products = await Product.find({});
        let newproducts = products.slice(1).slice(-8);
        res.send(newproducts);
        console.log("New Products Have been Fetched.");
    } catch (error) {
        console.error("error fetching New products: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        next(error)
    }
}