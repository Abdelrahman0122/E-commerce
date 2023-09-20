import mongoose from "mongoose";


export function dbConnection(){
 mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log("err",err);
})
}