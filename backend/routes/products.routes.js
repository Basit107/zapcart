import { Router } from "express";
import Product from "../models/product.models.js";

const productRouter = Router();

// Define your product routes here
productRouter.get("/", (req, res) => {
  res.send("Product route is working");
});

// Creating API for Deletiong Products
productRouter.post('/removeproduct', async (request, response) => {
  await Product.findOneAndDelete({id:request.body.id});
  console.log("Product is Removed");
  response.json({
    success: true,
    name: request.body.name,
  })  
})

// Creating API For Getting All Products.
productRouter.get('/allproducts', async (request, response) => {
  let products = await Product.find({});
  console.log("All products Fetched.");
  response.send(products);
})

// End Point For NewProducts Data
productRouter.get('/newproducts', async (request, response) => {
  let products = await Product.find({});
  let newproducts = products.slice(1).slice(-8);
  console.log("New Products Have been Fetched.");
  response.send(newproducts);
  
})

//  End Point For Popular Products
productRouter.get('/popularproducts', async (request, response) => {
  let products = await Product.find({category:"mobile"});
  let popularproducts = products.slice(0, 4);
  console.log("Popular Products Have been fetched");
  response.send(popularproducts);
  
})

export default productRouter;