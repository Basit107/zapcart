import { Router } from "express";

const userRouter = Router();

// Define your user routes here
userRouter.get("/", (req, res) => {
  res.send("User route is working");
});

userRouter.get("/profile/:username", (req, res) => {
    const username = req.params.username;
    res.send(`Profile of user: ${username}`);
}) 

export default userRouter;