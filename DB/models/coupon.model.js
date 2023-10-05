import { Schema, Types, model, mongoose } from "mongoose";

const couponSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    discount:{
        type:Number,
        required:true,
        min:0,
    },
    expires:{
        type:Date,
        required:true,
    }
    },{timestamps:true});

    export const couponModel = mongoose.model("Coupon", couponSchema);
