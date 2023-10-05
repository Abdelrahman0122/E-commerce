import express  from "express";
import * as Review from "./Review.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

export const ReviewRouter = express.Router();

ReviewRouter.post("/",protectRoutes,Review.addReview);
ReviewRouter.get("/", Review.getAllReviews);




ReviewRouter.route("/:id")
.put(protectRoutes,Review.updateReview)
.delete(Review.deleteReview)
.get(Review.getreviewById)
