import { deleteOne } from "../../utils/handlers/factor.js";
import { cartModel } from "../../../DB/models/cart.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { productModel } from "../../../DB/models/product.model.js";


function calculateTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.price * ele.quantity;
  });
  cart.totalPrice = totalPrice;
}

// create Cart
export const addCart = catchError(async (req, res, next) => {
  console.log( req.user._id);
  let product = await productModel.findById(req.body.product).select("price")
  !product && next(new AppError("Product Not Found", 404));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calculateTotalPrice(cart);
    await cart.save();
    res.json({message:"Cart Created Successfully",cart});
  }

 let item = isCartExist.cartItems.find((ele)=>ele.product == req.body.product)
 if(item){
   item.quantity += 1;
}
else{
  isCartExist.cartItems.push(req.body);
}
 
calculateTotalPrice(isCartExist)
await isCartExist.save();
res.json({message:"Cart Updated Successfully",isCartExist}); 
});


// get cart
export const getCart = catchError(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  res.json({ message: "here is your cart ", cart });
});

//delete item from cart
 export const removeCartItem = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
     {$pull : {cartItems:{product:req.params.id}}},
     { new: true });
 res.json({message:"item removed successfully",cart})
 });

 //update cart 
 export const UpdateCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price")
  !product && next(new AppError("Product Not Found", 404));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
 

 let item = isCartExist.cartItems.find((ele)=>ele.product == req.body.product)

 !item && next(new AppError("Product Not Found in Cart", 404));
 
 if(item){
   item.quantity = req.body.quantity;
}
calculateTotalPrice(isCartExist)
await isCartExist.save();
res.json({message:"Cart Updated Successfully",isCartExist}); 
});


// delete Cart by id
export const deleteCart = deleteOne(cartModel);
