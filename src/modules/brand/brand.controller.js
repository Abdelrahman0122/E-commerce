import slugify from "slugify";
import { brandModel } from "../../../DB/models/brand.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import APiFeatures from "../../utils/APIFeatures.js";


// create brand
export const addbrand = catchError(async (req, res, next) => {
  const { name } = req.body;
  let foundedName = await brandModel.findOne({ name });

  if (foundedName) {
    return  next(new AppError("brand already exists", 409))
  }  
  // if (!req.file) {
  //   return  next(new AppError("file not exist", 409))
  // }
  // image: req.file.path
    const brand = new brandModel({ name, slug: slugify(name) });
    await brand.save();
    res.status(201).json({ message: "brand added successfully", brand });
  
})


// get all Brands
export const getAllBrands =catchError( async (req, res, next) => {
  let apiFeature = new APiFeatures(brandModel.find({}),req.query).filter().sort().fields().pagination()
  let results = await apiFeature.mongooseQuery;
  res.status(201).json({ message: "Success",page: apiFeature.page, results});
});



// update brand by id
export const updatebrand =catchError( async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  req.body.slug = slugify(name);
  let Foundedbrand = await brandModel.findById(id);
  !Foundedbrand && next(new AppError("brand not found", 404))
  if (Foundedbrand) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let brand = await brandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", brand });
  }
})


// delete brand by id
export const deletebrand = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundedbrand = await brandModel.findById(id);

  !Foundedbrand && next(new AppError("brand not found", 404))
  if (Foundedbrand) {
    let brand = await brandModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", brand });
  }
});

export const profile = catchError(async (req, res, next) => {

  res.json({ message: "success", file: req.file });
   
})
