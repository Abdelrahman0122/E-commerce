import express  from "express";
import * as cart from "./cart.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

export const  CartRouter = express.Router();

CartRouter.post("/",protectRoutes,cart.addCart);
CartRouter.get("/",protectRoutes ,cart.getCart);
CartRouter.delete("/:id",protectRoutes,cart.removeCartItem);
CartRouter.delete("/delete/:id",protectRoutes,cart.deleteCart);
CartRouter.put(protectRoutes,cart.UpdateCart)


// CartRouter.route("/:id")
// .put(protectRoutes,cart.updateCart)
// .delete(cart.deleteCart)
// .get(cart.getCartById)
