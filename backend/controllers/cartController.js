import pkg from "body-parser";
const { json } = pkg;
import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); //userModel içinde req.body.userId ile eşleşen bir kullanıcıyı veritabanından buluyoruz. Bu işlem asenkron olduğu için await kullanıyoruz.
    let cartData = await userData.cartData; //Bulunan kullanıcının sepet verilerini cartData değişkenine atıyoruz.
    if (!cartData[req.body.itemId]) {
      //Sepet verilerinde req.body.itemId ile eşleşen bir öğe olup olmadığını kontrol ediyoruz. Eğer yoksa, bu öğeyi 1 olarak ekliyoruz. Varsa, öğenin miktarını bir artırıyoruz.
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }); //Güncellenmiş sepet verilerini veritabanına kaydediyoruz. Bu işlem de asenkron olduğu için await kullanıyoruz.
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: "Error" });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//fetch user cart data
const getCart = async (req, res) => {
  //getCart bir kullanıcının sepet verilerini almak için kullanılacak.req ve res parametreleri, HTTP isteği ve yanıtını temsil eder.
  try {
    let userData = await userModel.findById(req.body.userId); //userModel kullanarak, req.body.userId ile eşleşen kullanıcıyı veritabanında buluyoruz. Bu işlem asenkron olduğu için await kullanıyoruz. userData, kullanıcıya ait tüm verileri içerir.
    let cartData = await userData.cartData; //userData içindeki cartData alanını cartData değişkenine atıyoruz. Bu, kullanıcının sepetine ait verileri içerir.
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
