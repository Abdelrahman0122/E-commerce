import slugify from "slugify";
import { productModel } from "../../../DB/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import mongoose from "mongoose";
import APiFeatures from "../../utils/APIFeatures.js";


// create product
export const addproduct = catchError(async (req, res, next) => {
  let { title } = req.body; // define the title variable
  let foundedName = await productModel.findOne({ title });
  if (foundedName) {
    return next(new AppError("product already exists", 409));
  }  
  // if (!req.file) {
  //   return next(new AppError("file not exist", 409));
  // }
  req.body.slug = slugify(req.body.title);
  const product = new productModel(req.body);
  await product.save();
  res.status(201).json({ message: "product added successfully", product });
});

// get all products
export const getAllproducts =catchError( async (req, res, next) => {
 let apiFeature = new APiFeatures(productModel.find({}),req.query).filter().sort().fields().pagination()
  let products = await apiFeature.mongooseQuery;
  res.status(201).json({ message: "Success",page: apiFeature.page, products});
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

// get product by id
export const getproductById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let product = await productModel.findById(id);
  !product && next(new AppError("product not found", 404))
  res.status(200).json({ message: "Success", product });
})

