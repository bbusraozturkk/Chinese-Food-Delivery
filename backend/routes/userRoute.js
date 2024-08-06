import express from "express"; //Express.js: Node.js tabanlı bir web uygulama çatısıdır. Sunucu tarafında HTTP isteklerini işlemek ve yanıtlamak için kullanılır.
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router(); //Bu satır, yeni bir Router nesnesi oluşturur. Router nesnesi, belirli URL yollarına gelen istekleri işlemek için kullanılır. Bu örnekte, userRouter kullanıcı işlemleri için özel bir yönlendirici olarak tanımlanır.

userRouter.post("/register", registerUser); //Bu satır, /register yoluna gelen POST isteklerini registerUser fonksiyonuna yönlendirir. Kullanıcı kayıt işlemleri için kullanılır."/register": Kullanıcının kayıt olmak için POST isteği gönderdiği yol.registerUser: Bu yola gelen isteği işleyen fonksiyon.
userRouter.post("/login", loginUser); //Bu satır, /login yoluna gelen POST isteklerini loginUser fonksiyonuna yönlendirir. Kullanıcı giriş işlemleri için kullanılır."/login": Kullanıcının giriş yapmak için POST isteği gönderdiği yol.loginUser: Bu yola gelen isteği işleyen fonksiyon.

export default userRouter;

/*
Bu kod, Express.js kullanarak bir web uygulamasında kullanıcı kayıt ve giriş işlemlerini gerçekleştirmek 
için bir router (yönlendirici) tanımlar. 
Router, belirli URL yollarına gelen istekleri belirli işlevlerle eşleştirir ve bu işlevler (controller) 
kullanıcı işlemlerini gerçekleştirir. 
Bu kod parçası, register ve login yollarına gelen POST isteklerini registerUser ve loginUser işlevlerine
yönlendirir.
*/
