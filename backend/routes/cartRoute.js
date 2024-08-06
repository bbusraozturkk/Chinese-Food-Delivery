import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.post("/get",authMiddleware, getCart);

export default cartRouter;

/*Neden POST Kullanılıyor?
Veri Gönderme: Kullanıcı, sepete yeni bir ürün eklemek istediğinde, bu ürün hakkında bilgi 
(ürün kimliği, miktarı vb.) sunucuya gönderilir. POST istekleri, bu tür verilerin 
gönderilmesi için idealdir.
Durum Değişikliği: Sepete yeni bir ürün eklemek, sunucu tarafında bir durum değişikliği gerektirir 
(örneğin, kullanıcının sepetine yeni bir ürün eklemek).
Güvenlik: POST istekleri, verileri GET isteklerine kıyasla daha güvenli bir şekilde taşır çünkü 
veriler URL'de değil, isteğin gövdesinde gönderilir. 
*/
