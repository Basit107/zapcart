import { Router } from "express";
import { addProductToCart, getCartProducts, getUser, removeProductFromCart } from "../controllers/user.controllers.js";
import { authorizeUser } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.get("/:id", authorizeUser, getUser);

// Creating API endpoint To Get cartdata.
userRouter.get('/:id/getcart', authorizeUser, getCartProducts)
// Creating End Point for adding products in cartdata
userRouter.put('/:id/addtocart', authorizeUser, addProductToCart)
// Creating Endpoint to remove product from cartdata
userRouter.put('/:id/removefromcart', authorizeUser, removeProductFromCart)

export default userRouter;

// Define your user routes here
// userRouter.get("/profile/:username", (req, res) => {
//     const username = req.params.username;
//     res.send(`Profile of user: ${username}`);
// })
