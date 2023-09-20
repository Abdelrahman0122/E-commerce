import { Schema,Types,model } from "mongoose";

const brandSchema= new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim: true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
 image:{
    type:String,
    required:true,
 },
})

export const brandModel = model('brand', brandSchema)