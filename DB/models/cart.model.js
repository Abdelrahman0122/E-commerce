import { Schema, Types, model, mongoose } from "mongoose";

const cartSchema = new Schema({

    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    cartItems:[
        {
            product:{
                type:Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                default:1,
            },
            price:{
                type:Number,
            },
    },
 ],
 totalPrice:Number,
 discount:Number,
 totalAfterDiscount:Number,

},{timestamps:true});

export const cartModel = mongoose.model("Cart", cartSchema);
