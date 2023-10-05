import { globalError } from "./middleware/globalErrorMiddleware.js";
import { ReviewRouter } from "./modules/Review/Review.routes.js";
import {authRouter} from "./modules/auth/auth.routes.js";
import { brandRouter } from "./modules/brand/brand.routes.js";
import { CartRouter } from "./modules/cart/cart.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { CouponRouter } from "./modules/coupon/coupon.routes.js";
import { productRouter } from "./modules/product/product.routes.js"
import {subCategoryRouter} from './modules/subCategory/subCategory.routes.js'
import { userRouter } from "./modules/user/user.routes.js";
import { AppError } from "./utils/AppError.js";


export function bootstrap(app){

    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subCategories',subCategoryRouter)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/Review',ReviewRouter)
    app.use('/api/v1/coupon',CouponRouter)
    app.use('/api/v1/cart',CartRouter)


    
//TODO: add addresses routes


    app.get('/', (req,res)=>{res.json("hello World")})

    app.all('*',(req,res,next)=>{
        // res.status(404).json({message:"page not found"})
        next(new AppError("page not found", 404))
    })

    app.use(globalError)
}