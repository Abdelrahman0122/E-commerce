import slugify from "slugify";
import  {userModel}  from "../../../DB/models/user.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import APiFeatures from "../../utils/APIFeatures.js";


// create user
export const adduser = catchError(async (req, res, next) => {
  const { name,email } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    return  next(new AppError("user already exists", 409))
  }  
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({ message: "user added successfully", user });
  
})


// get all users
export const getAllusers =catchError( async (req, res, next) => {
  let apiFeatures = new APiFeatures(userModel.find({}),req.query).pagination().sort().search().fields()
  let result = await apiFeatures.mongooseQuery.find({});
  res.status(201).json({ message: "Success", page:apiFeatures.page  ,result });
});


// update user by id
export const updateuser =catchError( async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  req.body.slug = slugify(name);
  let Foundeduser = await userModel.findById(id);
  !Foundeduser && next(new AppError("user not found", 404))
  if (Foundeduser) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Updated", user });
  }
})


// delete user by id
export const deleteuser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundeduser = await userModel.findById(id);

  !Foundeduser && next(new AppError("user not found", 404))
  if (Foundeduser) {
    let user = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", user });
  }
});

// get user by id
export const getUserById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundeduser = await userModel.findById(id);
  !Foundeduser && next(new AppError("user not found", 404))
  if (Foundeduser) {
    res.status(200).json({ message: "Success", Foundeduser });
  }
})

// change password
export const ChangePassword = catchError(async (req, res, next) => {
  let { id } = req.params;
  let foundedUser = await userModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
  !foundedUser && next(new AppError("User not found", 404));
  res.status(200).json({ message: "Updated", user: foundedUser });
});
