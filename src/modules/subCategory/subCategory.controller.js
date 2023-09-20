import slugify from "slugify";
import { subCategoryModel } from "../../../DB/models/subCategory.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";


// create subCategory
export const addsubCategory = catchError(async (req, res, next) => {
  const { name } = req.body;
  let foundedName = await subCategoryModel.findOne({ name });

  if (foundedName) {
    return  next(new AppError("subCategory already exists", 409))
  }  
  if (!req.file) {
    return  next(new AppError("file not exist", 409))
  }

    const subCategory = new subCategoryModel({ name, slug: slugify(name) , image: req.file.path });
    await subCategory.save();
    res.status(201).json({ message: "subCategory added successfully", subCategory });
  
})


// get all categories
export const getAllCategories =catchError( async (req, res, next) => {
  let categories = await subCategoryModel.find({});
  res.status(201).json({ message: "Success", categories });
});


// update subCategory by id
export const updatesubCategory =catchError( async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  req.body.slug = slugify(name);
  let FoundedsubCategory = await subCategoryModel.findById(id);
  !FoundedsubCategory && next(new AppError("subCategory not found", 404))
  if (FoundedsubCategory) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let subCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", subCategory });
  }
})


// delete subCategory by id
export const deletesubCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let FoundedsubCategory = await subCategoryModel.findById(id);

  !FoundedsubCategory && next(new AppError("subCategory not found", 404))
  if (FoundedsubCategory) {
    let subCategory = await subCategoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", subCategory });
  }
});

export const profile = catchError(async (req, res, next) => {

  res.json({ message: "success", file: req.file });
   
})
