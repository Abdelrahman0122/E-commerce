import express  from "express";
import * as category from "./category.controller.js";
import { multerFun } from "../../utils/multerlocal.js";
import { multerCloud,allowedValidation} from "../../utils/multerHost.js";
import { validation } from "../../middleware/validation.js";
import { createCategorySchema, getOneCategorySchema } from "./category.validator.js";


export const categoryRouter = express.Router();

categoryRouter.post("/", validation(createCategorySchema),multerCloud(allowedValidation.image)
.single("image") , category.addCategory);

categoryRouter.get("/", category.getAllCategories);




categoryRouter.route("/:id")
.get(validation(getOneCategorySchema),category.getCategoryById)
.put(multerFun("/cover").single("image") ,category.updateCategory)
.delete( category.deleteCategory)
