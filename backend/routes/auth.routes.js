import { Router } from "express";
import { signIn, signUp, signOut, adminSignUp, adminSignIn } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});

authRouter.post("/signin", signIn)
authRouter.post("/signup", signUp)
authRouter.post("/signout", signOut)

// admin auth routes
authRouter.post("/admin/signin", adminSignIn)
authRouter.post("/admin/signup", adminSignUp)
authRouter.post("/admin/signout", signOut)

export default authRouter;