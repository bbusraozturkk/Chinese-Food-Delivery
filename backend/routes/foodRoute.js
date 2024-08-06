//Backend projelerinde routes klasörü, uygulamanın farklı uç noktalarını (endpoints) tanımlayan ve bu uç noktaları kontrolör (controller) fonksiyonlarına yönlendiren dosyaları içerir. Her rota, belirli bir HTTP isteği (GET, POST, PUT, DELETE, vb.) aldığında ilgili kontrolör fonksiyonunu çağırır. Bu yapı, uygulamanın farklı bölümlerinin organize edilmesine ve yönetilmesine yardımcı olur.
import express from "express";
import { addFood, listFood, removeFood} from "../controllers/foodController.js";
import multer from "multer"; // Multer, HTTP isteğiyle birlikte gelen dosyaları işler ve bu dosyaları sunucuda belirli bir dizine kaydeder. Bu, dosya yükleme işlemlerinin yönetimini ve entegrasyonunu oldukça basit ve etkili hale getirir.

const foodRouter = express.Router();

//Image Storage Engine
//Bu kod parçası, multer adlı bir Node.js paketinin bir parçasıdır ve dosya yükleme işlemlerini yönetmek için kullanılır. multer, Express.js ile dosya yüklemeyi kolaylaştıran bir middleware'dır.Kod, multer'ın diskStorage özelliğini kullanarak, dosyaların sunucuda nasıl saklanacağını belirler. 
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage}) //ifadesi, multer middleware'ini yapılandırmak için kullanılır. Bu, dosyaların nasıl yükleneceğini ve nereye kaydedileceğini belirleyen bir multer örneği oluşturur.

foodRouter.post("/add",upload.single("image"),addFood) //foodRouter.post("/add", addFood) ifadesi, foodRouter üzerinde /add yoluna yapılan HTTP POST isteklerini addFood adlı bir işleyici fonksiyonuna yönlendirir.
//upload.single("image"): Bu middleware, bir dosya yükleme işlemini yönetir.

foodRouter.get("/list",listFood);

foodRouter.post("/remove",removeFood);

export default foodRouter;
