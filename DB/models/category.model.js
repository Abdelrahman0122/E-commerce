import { Schema,model } from "mongoose";

const categorySchema= new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim: true,
        minlength:[3,'category name is too short'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:{
        type:Object,
    },
    // createdBy: {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     // required:true
    //   },
    //   updatedBy: {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     // required:true
    //   },
    },
    {
      timestamps: true,
    }
  );

export const categoryModel = model('category', categorySchema)