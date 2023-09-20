
import multer from "multer";
import { AppError } from "./AppError.js";
import path from 'path'
import fs from 'fs'

export const multerFun = (customPath) =>{

    // get the full path
 const conspath = path.resolve(`uploads${customPath}`)

  if(!fs.existsSync(conspath)){
        fs.mkdirSync(conspath,{recursive: true})
  }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, conspath)
        },
        filename: function (req, file, cb) {
             console.log(file)
            cb(null, Date.now() + '-' +file.originalname )
        }
    })
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new AppError("invalid data type",400), false)
        }
    }

    const upload = multer({fileFilter , storage }) 
   return upload
}