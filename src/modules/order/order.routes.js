import express  from "express";
import * as order from "./order.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

export const  OrderRouter = express.Router();

OrderRouter.post("/:id",protectRoutes,order.createCashOrder);
OrderRouter.get("/",protectRoutes ,order.getOrder);
// OrderRouter.delete("/:id",protectRoutes,order.removeOrderItem);
// OrderRouter.delete("/delete/:id",protectRoutes,order.deleteOrder);
// OrderRouter.put(protectRoutes,order.UpdateOrder)


// OrderRouter.route("/:id")
// .put(protectRoutes,Order.updateOrder)
// .delete(Order.deleteOrder)
// .get(Order.getOrderById)
