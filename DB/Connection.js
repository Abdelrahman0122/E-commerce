import mongoose from "mongoose";


export function dbConnection(){
 mongoose.connect(process.env.DB_ONLINE).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log("err",err);
})
}