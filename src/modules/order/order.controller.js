import { deleteOne } from "../../utils/handlers/factor.js";
import { cartModel } from "../../../DB/models/cart.model.js";
import { catchError } from "../../utils/catchError.js";
import { orderModel } from "../../../DB/models/order.model.js";
import { productModel } from "../../../DB/models/product.model.js";

// create Order
export const createCashOrder = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  let totalPrice = cart.totalAfterDiscount
    ? cart.totalAfterDiscount
    : cart.totalPrice;
  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice: totalPrice,
    shippingAddress: req.body.shippingAddress,
  });
  if (order) {
    let options = cart.cartItems.map((ele) => ({
      updateOne: {
        filter: { _id: ele.product },
        update: { $inc: { quantity: -ele.quantity, soldItems: ele.quantity } },
      },
    }));
    await productModel.bulkWrite(options);
    await order.save();
  }
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Order created successfully", order });
});

// get order
export const getOrder = catchError(async (req, res, next) => {
  let order = await orderModel.findOne({ user: req.user._id })
  res.json({ message: "Order fetched successfully", order });
});

