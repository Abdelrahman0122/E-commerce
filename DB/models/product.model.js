import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "name is required"],
    minLength: [2, "name too short"],
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Types.ObjectId,
    ref: "subCategory",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
    required: [true, "price is required"],
  },
  discount: {
    type: Number,
    default: 0,
    min: 1,
  },
  priceAfterDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  soldItems: {
    type: Number,
    default: 0,
  },
  colors: [String],
},
{timestamps:true, toJson:{virtuals:true}, toObject:{virtuals:true}});

productSchema.virtual("myReview",{
  ref:"Review",
  localField:"_id", 
  foreignField:"product"
})
productSchema.pre(/^find/,function(){
  this.populate("myReview")
})

export const productModel = model("product", productSchema);
