import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});

authRouter.post("/signin", signIn)
authRouter.post("/signup", signUp)
authRouter.post("/signout", signOut)


export default authRouter;