import mongoose from "mongoose";
//Mongoose, Node.js ortamında MongoDB veritabanı ile etkileşim kurmak için kullanılan bir Object Data Modeling (ODM) kütüphanesidir. Mongoose, MongoDB belgelerini (document) JavaScript nesneleri olarak modellemenizi sağlar

//config klasörleri genellikle uygulamanın yapılandırma ayarlarını depolamak ve yönetmek için kullanılır. Bu ayarlar, veritabanı bağlantı bilgileri, API anahtarları, uygulama portları, güvenlik ayarları gibi çeşitli konfigürasyonları içerebilir

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://busraozturk:Busra29.@cluster0.dixzouk.mongodb.net/food').then(()=>console.log("DB CONNECTED"))
}