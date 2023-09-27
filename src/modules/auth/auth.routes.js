import express from "express";
import * as auth from "./auth.controller.js";   
 export const authRouter = express.Router();


authRouter.post("/signUp", auth.signUp);
authRouter.post("/signIn", auth.signIn);

