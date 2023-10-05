import { deleteOne } from "../../utils/handlers/factor.js";
import { ReviewModel } from "../../../DB/models/Review.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import APiFeatures from "../../utils/APIFeatures.js";


// create Review
export const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id;
    let isReviewed = await ReviewModel.findOne({ user: req.user._id, product: req.body.product });
    if (isReviewed) return next(new AppError("you already reviewed this product", 400))
    const Result = new ReviewModel(req.body);
    await Result.save();
    res.status(201).json({ message: "Review added successfully", Result });
  
})


// get all Reviews
export const getAllReviews =catchError( async (req, res, next) => {
  let apiFeature = new APiFeatures(ReviewModel.find({}),req.query).filter().sort().fields().pagination()
  let results = await apiFeature.mongooseQuery
  
  res.status(201).json({ message: "Success",page: apiFeature.page, results});
});

// get review by id
export const getreviewById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let review = await ReviewModel.findById(id);
  !review && next(new AppError("review not found", 404))
  res.status(200).json({ message: "Success", review });
})



// update Review by id
export const updateReview =catchError( async (req, res, next) => {
  let { id } = req.params;
  let FoundedReview = await ReviewModel.findById(id);
  !FoundedReview && next(new AppError("Review not found", 404))
  if (FoundedReview) {
    let Review = await ReviewModel.findOneAndUpdate({_id:id, user:req.user._id}, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", Review });
  }
})


// delete Review by id
export const deleteReview = deleteOne(ReviewModel);



