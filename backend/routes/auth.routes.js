import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});

export default authRouter;