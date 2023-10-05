import { Schema, Types, model, mongoose } from "mongoose";

const orderSchema = new Schema({

    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:[
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
 paymentMethod:{
        type:String,
        enum:["Cash", "Card"],
        default:"Cash",
    },
    ShippingAddress:{
    city:String,
    street:String,
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    isDelevered:{
        type:Boolean,
        default:false,
    },

},{timestamps:true});

export const orderModel = mongoose.model("Order", orderSchema);
