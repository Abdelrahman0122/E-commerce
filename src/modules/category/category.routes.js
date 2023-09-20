import express  from "express";
import * as category from "./category.controller.js";
import { multerFun } from "../../utils/multerlocal.js";
import { multerCloud,allowedValidation} from "../../utils/multerHost.js";


export const categoryRouter = express.Router();

categoryRouter.post("/",multerCloud(allowedValidation.image).single("image") , category.addCategory);
categoryRouter.get("/", category.getAllCategories);




categoryRouter.route("/:id")
.put(multerFun("/cover").single("image") ,category.updateCategory)
.delete( category.deleteCategory)
