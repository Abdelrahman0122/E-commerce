import express  from "express";
import * as subCategory from "./subCategory.controller.js";
import { multerFun } from "../../utils/multerlocal.js";


export const subCategoryRouter = express.Router();

subCategoryRouter.post("/",multerFun("/cover").single("image") , subCategory.addsubCategory);
subCategoryRouter.get("/", subCategory.getAllCategories);




subCategoryRouter.route("/:id")
.put(multerFun("/cover").single("image") ,subCategory.updatesubCategory)
.delete( subCategory.deletesubCategory)
