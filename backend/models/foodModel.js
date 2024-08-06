//models klasörü, veritabanı modellerini tanımlamak ve yönetmek için kullanılır. Bu modeller, veritabanında saklanacak verilerin yapısını ve davranışını belirler.
//schema, belgelerin (documents) nasıl yapılandırılacağını, hangi tür verilerin saklanacağını, bu verilerin hangi kurallara tabi olduğunu ve hangi doğrulama (validation) işlemlerinin uygulanacağını belirler.

import mongoose from "mongoose";
const foodSchema =new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel