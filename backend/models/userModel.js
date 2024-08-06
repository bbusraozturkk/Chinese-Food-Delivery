import mongoose from "mongoose";

const userSchema = new mongoose.Schema( //userSchema, kullanıcıların veritabanında nasıl saklanacağını tanımlar.
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } //Şema seçeneklerini belirler. minimize: false ayarı, boş nesnelerin (empty objects) veritabanında saklanmasını sağlar. Varsayılan olarak, Mongoose boş nesneleri saklamaz.

);

//userModel adlı bir model oluşturur veya mevcut bir modeli kullanır. Eğer mongoose.models.user zaten tanımlıysa, onu kullanır; aksi takdirde, yeni bir model oluşturur (mongoose.model("user", userSchema)).
const userModel = mongoose.models.user || mongoose.model("user", userSchema); //userModel, userSchema'yı kullanarak MongoDB'de bir "user" koleksiyonu oluşturur 
export default userModel;
//Backend klasöründeki models klasörü genellikle veritabanı modellerini tanımlamak ve yönetmek için kullanılır. 
//Veritabanında saklanacak veri yapısını tanımlamak için kullanılır. Her model, veritabanındaki bir tabloyu veya koleksiyonu temsil eder.