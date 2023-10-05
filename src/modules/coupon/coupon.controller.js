import { deleteOne } from "../../utils/handlers/factor.js";
import { couponModel } from "../../../DB/models/coupon.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import APiFeatures from "../../utils/APIFeatures.js";
import QRCode from 'qrcode'
import { cartModel } from "../../../DB/models/cart.model.js";


// create Coupon
export const addCoupon = catchError(async (req, res, next) => {
    const Result = new couponModel(req.body);
    await Result.save();
    res.status(201).json({ message: "Coupon added successfully", Result });
})

// Apply coupon
export const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOne({code:req.body.code, expires:{$gt:Date.now()}})
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalAfterDiscount = (cart.totalPrice - (cart.totalPrice * coupon.discount)/100)
  cart.totalPriceAfterDiscount = cart.totalAfterDiscount;
  cart.coupon = coupon._id;
  await cart.save()
  res.status(200).json({ message: "Coupon applied successfully", cart });
})


// get all Coupons
export const getAllCoupons =catchError( async (req, res, next) => {
  let apiFeature = new APiFeatures(couponModel.find({}),req.query).filter().sort().fields().pagination()
  let results = await apiFeature.mongooseQuery
  res.status(201).json({ message: "Success",page: apiFeature.page, results});
});

// get Coupon by id
export const getCouponById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Coupon = await couponModel.findById(id);
  !Coupon && next(new AppError("Coupon not found", 404))
 let url = await QRCode.toDataURL(Coupon.code)
  res.status(200).json({ message: "Success", Coupon, url });
})



// update Coupon by id
export const updateCoupon =catchError( async (req, res, next) => {
  let { id } = req.params;
  let FoundedCoupon = await couponModel.findById(id);
  !FoundedCoupon && next(new AppError("Coupon not found", 404))
  if (FoundedCoupon) {
    let Coupon = await couponModel.findOneAndUpdate({_id:id, user:req.user._id}, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", Coupon });
  }
})


// delete Coupon by id
export const deleteCoupon = deleteOne(couponModel);



