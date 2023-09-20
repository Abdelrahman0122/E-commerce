import slugify from "slugify";
import { productModel } from "../../../DB/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";


// create product
export const addproduct = catchError(async (req, res, next) => {
  // let foundedName = await productModel.findOne({ title });
  // if (foundedName) {
  //   return  next(new AppError("product already exists", 409))
  // }  
  // if (!req.file) {
  //   return  next(new AppError("file not exist", 409))
  // }
  req.body.slug = slugify(req.body.title)
    const product = new productModel(req.body);
    await product.save();
    res.status(201).json({ message: "product added successfully", product });
  
})


// get all products
export const getAllproducts =catchError( async (req, res, next) => {
  // pagination
  let page = req.query.page*1||1
  if(req.query.page <=0)page = 1 
  let skip = (page-1) * 4
   //2- filterObj
    let filterObj = {...req.query}
    let excludedQuery = ["page","fields","sort","keyword"]
    excludedQuery.forEach((q)=>{
      delete filterObj[q]
    });
    
    filterObj = JSON.stringify(filterObj)
    filterObj = filterObj.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj)
  
    //3-sorting
  //build query
  let mongooseQuery = productModel.find(filterObj).skip(skip).limit(4)
  
  if(req.query.sort){
    let sortBy = req.query.sort.split(",").join(" ") 
     mongooseQuery.sort(sortBy)
  }
    //4- search
    if(req.query.keyword){
      mongooseQuery.find({$or:[{title:{$regex:req.query.keyword,$options:"i"}},{description:{$regex:req.query.keyword,$options:"i"}}]})
    }
     

  let products = await productModel.find({}).skip(skip).limit(4)
  res.status(201).json({ message: "Success",page, products});
});


// update product by id
export const updateproduct =catchError( async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  req.body.slug = slugify(name);
  let Foundedproduct = await productModel.findById(id);
  !Foundedproduct && next(new AppError("product not found", 404))
  if (Foundedproduct) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let product = await productModel.findByIdAndUpdate(id, {...req.body}, {
      new: true,
    });
    res.status(200).json({ message: "Updated", product });
  }
})


// delete product by id
export const deleteproduct = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundedproduct = await productModel.findById(id);

  !Foundedproduct && next(new AppError("product not found", 404))
  if (Foundedproduct) {
    let product = await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", product });
  }
});

export const profile = catchError(async (req, res, next) => {

  res.json({ message: "success", file: req.file });
   
})
