import express  from "express";
import * as coupon from "./coupon.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

export const  CouponRouter = express.Router();

CouponRouter.post("/",protectRoutes,coupon.addCoupon);
CouponRouter.get("/", coupon.getAllCoupons);




CouponRouter.route("/:id")
.put(protectRoutes,coupon.updateCoupon)
.delete(coupon.deleteCoupon)
.get(coupon.getCouponById)
