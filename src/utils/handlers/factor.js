import { AppError } from "../AppError.js";
import { catchError } from "../catchError.js"


export const deleteOne = (model) => {

    return catchError(async (req, res, next) => {
        let { id } = req.params;
        let FoundedDocument = await model.findById(id);
        !FoundedDocument && next(new AppError("Document not found", 404))
        if (FoundedDocument) {
          let Document = await model.findByIdAndDelete(id);
          res.status(200).json({ message: "Deleted", Document });
        }
      })
    }
