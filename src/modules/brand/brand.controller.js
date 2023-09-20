import slugify from "slugify";
import { brandModel } from "../../../DB/models/brand.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";


// create brand
export const addbrand = catchError(async (req, res, next) => {
  const { name } = req.body;
  let foundedName = await brandModel.findOne({ name });

  if (foundedName) {
    return  next(new AppError("brand already exists", 409))
  }  
  if (!req.file) {
    return  next(new AppError("file not exist", 409))
  }

    const brand = new brandModel({ name, slug: slugify(name) , image: req.file.path });
    await brand.save();
    res.status(201).json({ message: "brand added successfully", brand });
  
})


// get all Brands
export const getAllBrands =catchError( async (req, res, next) => {
  let Brands = await brandModel.find({});
  res.status(201).json({ message: "Success", Brands });
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