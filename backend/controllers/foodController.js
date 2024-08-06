//Backend projelerinde controllers klasörü, uygulamanın iş mantığını ve veritabanı ile etkileşimini yöneten işlevleri (fonksiyonları) içerir. Bu dosyalar, gelen istekleri (requests) alır, işleyip uygun yanıtları (responses) döner. Kontrolörler, genellikle modelleri kullanarak veritabanı işlemleri yapar ve iş mantığını uygular

import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
//Bu tür bir fonksiyon genellikle belirli bir HTTP isteğini (örneğin, POST isteği) işler. Örneğin, bir food koleksiyonuna yeni bir yiyecek eklemek için kullanılabilir
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    //yeni food nesnesi oluşturulur.
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    //try: Veritabanına food belgesini kaydetmeye çalışır.
    await food.save(); //await food.save(): food.save() işlemi, veritabanına food belgesini asenkron olarak kaydeder ve bu işlem tamamlandığında bir yanıt gönderir.
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    //catch (error): Eğer food.save() sırasında bir hata oluşursa, bu hata catch bloğunda yakalanır ve işlenir.
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food  = await foodModel.findById(req.body.id) //foodModel kullanılarak, req.body.id ile belirtilen yiyecek öğesi veritabanından bulunmaya çalışılıyor.
    fs.unlink(`uploads/${food.image}`,()=>{}) //fs.unlink metodu kullanılarak, yiyecek öğesine ait dosya dosya sisteminden siliniyor.

    await foodModel.findByIdAndDelete(req.body.id) //foodModel kullanılarak, req.body.id ile belirtilen yiyecek öğesi veritabanından siliniyor.
    res.json({success:true,message:"Food Removed"})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
};

export { addFood, listFood, removeFood }; //Aynı dosyadan birden fazla fonksiyon, değişken veya sınıf dışa aktarılabilir. o yüzden kıvırcık parantez içinde
