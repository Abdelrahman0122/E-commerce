import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { catchError } from "../../utils/catchError.js";
import { userModel } from '../../../DB/models/user.model.js';
import { AppError } from '../../utils/AppError.js';

export const signUp =catchError( async (req, res,next) => {
    let isFound = await userModel.findOne({ email: req.body.email });
    if (isFound) {
next(new AppError("email already exist", 400))
 }
 let user = new userModel(req.body)
 await user.save();
    res.status(201).json({
        status: "success",
        data: user
    })
})

export const signIn = catchError(async (req, res,next) => {
    let { email, password } = req.body;
    let isFound = await userModel.findOne({ email });
    const match = bcrypt.compareSync(password, isFound.password);

    if (isFound && match) {
     let token = jwt.sign({name:isFound.name,role:isFound.role,userId:isFound._id},"abdo")
    return res.status(200).json({
            status: "success",
            token
        })  
    }
    next(new AppError("email or password is wrong", 400))
})
  