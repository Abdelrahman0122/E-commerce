import express  from "express";
import * as product from "./product.controller.js";
import { multerFun } from "../../utils/multerlocal.js";


export const productRouter = express.Router();

productRouter.post("/",multerFun("/cover").single("image") , product.addproduct);
productRouter.get("/", product.getAllproducts);




productRouter.route("/:id")
.put(multerFun("/cover").single("image") ,product.updateproduct)
.delete( product.deleteproduct)
