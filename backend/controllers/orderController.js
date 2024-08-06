/* Bu kod parçası, bir kullanıcı siparişinin oluşturulmasını ve Stripe ödeme platformu üzerinden 
ödeme işleminin başlatılmasını sağlayan bir Express.js route handler'ıdır. Sipariş bilgilerini alır, 
veritabanına kaydeder, kullanıcının sepetini temizler, Stripe ödeme işlemi için 
gerekli bilgileri hazırlar ve bir ödeme oturumu (checkout session) oluşturur. */

import orderModel from "../models/orderModel.js"; // Sipariş verilerini MongoDB veritabanında saklamak için kullanılan orderModel modelini içe aktarır.
import userModel from "../models/userModel.js"; // Kullanıcı verilerini yönetmek ve güncellemek için kullanılan userModel modelini içe aktarır.
import Stripe from "stripe"; // Stripe, işletmelerin ve bireylerin internet üzerinden ödeme almasını sağlayan bir ödeme işleme platformudur. Stripe, ödeme işlemlerini güvenli ve kolay hale getirmek için bir dizi API ve araç sunar.Stripe ödeme platformunun API'sini kullanmak için stripe kütüphanesini içe aktarır.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //const stripe: Stripe ile etkileşim kurmak için bir Stripe nesnesi oluşturur. process.env.STRIPE_SECRET_KEY, Stripe gizli anahtarını içerir.

//placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174"; //Ödeme işleminden sonra kullanıcıyı yönlendireceği frontend URL'sini tanımlar.

  try {
    const newOrder = new orderModel({
      //Gelen istekteki sipariş bilgileri ile yeni bir sipariş nesnesi oluşturur.
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save(); //Yeni siparişi veritabanına kaydeder
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // Kullanıcının sepet verilerini temizler

    const line_items = req.body.items.map((item) => ({
      //Sipariş öğelerini Stripe ödeme oturumu için gerekli formata dönüştürür. Her bir öğe için fiyat ve ürün bilgilerini içerir.
      price_data: {
        currency: "try",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Fiyatı kuruş cinsinden hesaplar
      },
      quantity: item.quantity,
    }));

    line_items.push({
      // Sipariş öğelerine teslimat ücretini ekler.
      price_data: {
        currency: "try",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100, // 2 TL'yi kuruş cinsinden hesaplar
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      //Stripe'da bir ödeme oturumu oluşturur.
      line_items: line_items, // Daha önce tanımlanan sipariş öğelerini kullanır.
      mode: "payment", //Ödeme modunu belirler.
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Ödeme başarıyla tamamlandığında yönlendirilecek URL.
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, //Ödeme iptal edildiğinde yönlendirilecek URL.
    });

    res.json({ success: true, session_url: session.url }); //Başarılı olursa, istemciye ödeme oturumunun URL'sini döner.
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateStatus = async(req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
} catch (error) {
  console.log(error);
  res.json({ success: false, message: "Error" });
}
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
