import { Schema,Types,model,mongoose } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true, trim: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, max: 5, min: 1 },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function() {
  this.populate('user', 'name')
})

export const ReviewModel = model("Review", reviewSchema);
