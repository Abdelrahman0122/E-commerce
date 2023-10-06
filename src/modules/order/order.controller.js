import { deleteOne } from "../../utils/handlers/factor.js";
import { cartModel } from "../../../DB/models/cart.model.js";
import { catchError } from "../../utils/catchError.js";
import { orderModel } from "../../../DB/models/order.model.js";
import { productModel } from "../../../DB/models/product.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Ny2hDDFxcHBnmzr5YafYdAEQqWZu89qxK4i1NLcIreuS61MESfKsHrP7JFtlvlmq9zU1WNPcDmovov1gUZUb1X300BL6Myo8R"
);

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
  let order = await orderModel.findOne({ user: req.user._id });
  res.json({ message: "Order fetched successfully", order });
});

export const onlinePayment = catchError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  let totalPrice = cart.totalAfterDiscount
    ? cart.totalAfterDiscount
    : cart.totalPrice;

  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount_decimal: totalPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://google.com",
    cancel_url: "https://facebook.com",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message:"Done", session });
});
