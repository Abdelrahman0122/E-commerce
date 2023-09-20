import { globalError } from "./middleware/globalErrorMiddleware.js";
import { brandRouter } from "./modules/brand/brand.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { productRouter } from "./modules/product/product.routes.js"
import {subCategoryRouter} from './modules/subCategory/subCategory.routes.js'
import { AppError } from "./utils/AppError.js";


export function bootstrap(app){

    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subCategories',subCategoryRouter)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/products',productRouter)



    app.get('/', (req,res)=>{res.json("hello World")})

    app.all('*',(req,res,next)=>{
        // res.status(404).json({message:"page not found"})
        next(new AppError("page not found", 404))
    })

    app.use(globalError)
}