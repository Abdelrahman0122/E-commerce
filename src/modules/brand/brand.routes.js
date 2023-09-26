import express  from "express";
import * as brand from "./brand.controller.js";
import { multerFun } from "../../utils/multerlocal.js";
import { validation } from "../../middleware/validation.js";
import { DeleteBrandSchema, createBrandSchema, updateBrandSchema } from "./brand.validation.js";


export const brandRouter = express.Router();

brandRouter.post("/",
multerFun("/cover").single("image"),validation(createBrandSchema) , brand.addbrand);
brandRouter.get("/", brand.getAllBrands);




brandRouter.route("/:id")
.put(multerFun("/cover").single("image") ,validation(updateBrandSchema),brand.updatebrand)
.delete(validation(DeleteBrandSchema), brand.deletebrand)
