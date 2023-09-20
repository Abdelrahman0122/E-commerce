import { Schema,Types,model } from "mongoose";

const subCategorySchema= new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim: true,
        minlength:[3,'subCategory name is too short'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    // category:{
    //     type:Types.ObjectId,
    //     ref:"category",
    //     required:true,
    // },
    // createdBy: {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   updatedBy: {
    //     type: Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
      image: {
        type: Object,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
export const subCategoryModel = model('subCategory', subCategorySchema)