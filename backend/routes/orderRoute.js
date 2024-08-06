import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder); //POST İsteği: Bir istemci, /place yoluna bir POST isteği gönderir.
//authMiddleware: İstek alındığında, önce authMiddleware çalıştırılır. Bu middleware, kullanıcının kimliğini doğrular. Eğer kullanıcı doğrulanamazsa, işlem burada sonlanır ve istemciye bir hata yanıtı döndürülür.
//placeOrder: Eğer authMiddleware başarılı olursa, istek placeOrder fonksiyonuna geçer. Bu fonksiyon, sipariş verilerini alır ve işlemleri gerçekleştirir (örneğin, siparişi veritabanına kaydetmek).
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;
