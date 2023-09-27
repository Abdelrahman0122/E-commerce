import express  from "express";
import * as user from "./user.controller.js";
import { multerFun } from "../../utils/multerlocal.js";
import { validation } from "../../middleware/validation.js";


export const userRouter = express.Router();

userRouter.post("/", user.adduser);
userRouter.get("/", user.getAllusers);




userRouter.route("/:id")
.put(multerFun("/cover").single("image") ,user.updateuser)
.delete( user.deleteuser)
.get(user.getUserById)

userRouter.patch('/changePassword/:id',user.ChangePassword)
