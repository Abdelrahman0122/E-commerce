import express  from "express";
import * as brand from "./brand.controller.js";
import { multerFun } from "../../utils/multerlocal.js";


export const brandRouter = express.Router();

brandRouter.post("/",multerFun("/cover").single("image") , brand.addbrand);
brandRouter.get("/", brand.getAllBrands);




brandRouter.route("/:id")
.put(multerFun("/cover").single("image") ,brand.updatebrand)
.delete( brand.deletebrand)
