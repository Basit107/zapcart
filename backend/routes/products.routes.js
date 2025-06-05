import { Router } from "express";
import { getAllProducts, getNewProducts, getPopularPrducts } from "../controllers/product.controllers.js";

const productRouter = Router();

// Define your product routes here
productRouter.get("/", (req, res) => {
  res.send("Product route is working");
});

// Creating API For Getting All Products.
productRouter.get('/allproducts', getAllProducts)

// End Point For NewProducts Data
productRouter.get('/newproducts', getNewProducts)

//  End Point For Popular Products
productRouter.get('/popularproducts', getPopularPrducts)

export default productRouter;