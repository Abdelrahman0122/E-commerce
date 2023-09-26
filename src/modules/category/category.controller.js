import slugify from "slugify";
import { categoryModel } from "../../../DB/models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../../utils/handlers/factor.js";
import cloudinary from "../../utils/cloudinary.js";
import APiFeatures from "../../utils/APIFeatures.js";


// create category
export const addCategory = catchError(async (req, res, next) => {
  const { name } = req.body;
  let foundedName = await categoryModel.findOne({ name });

  if (foundedName) {
    return  next(new AppError("Category already exists", 409))
  }  
  // if (!req.file) {
  //   return  next(new AppError("file not exist", 409))
  // }
  // const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path,{
  //   folder: "ecommerce",
  // });

    const category = new categoryModel({ name, slug: slugify(name) });
    await category.save();
    // add this later  , image: {secure_url, public_id}
    res.status(201).json({ message: "Category added successfully", category });
  
})


// get all categories
export const getAllCategories =catchError( async (req, res, next) => {
  let apiFeature = new APiFeatures(categoryModel.find({}),req.query).filter().sort().fields().pagination()
  let categories = await apiFeature.mongooseQuery.find({});
  res.status(201).json({ message: "Success",page:apiFeature.pageb  ,categories });
});


// update category by id
export const updateCategory =catchError( async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  req.body.slug = slugify(name);
  let FoundedCategory = await categoryModel.findById(id);
  !FoundedCategory && next(new AppError("Category not found", 404))
  if (FoundedCategory) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let category = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", category });
  }
})
// get category by id
 export const getCategoryById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findById(id);
  !category && next(new AppError("Category not found", 404))
  res.status(200).json({ message: "Success", category });
})



// delete category by id
export const deleteCategory = deleteOne(categoryModel)

export const profile = catchError(async (req, res, next) => {

  res.json({ message: "success", file: req.file });
   
})
