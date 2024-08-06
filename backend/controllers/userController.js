import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; // JWT, iki sistem arasında güvenli bilgi alışverişini sağlamak için kullanılan sıkıştırılmış ve imzalanmış bir JSON nesnesidir.
import bcrypt from "bcrypt"; //bcrypt, şifrelerin güvenli bir şekilde saklanmasını sağlayan bir kriptografik algoritmadır.
import validator from "validator"; //validator, veri doğrulama ve temizleme işlemlerini kolaylaştıran bir Node.js kütüphanesidir. Girdi verilerinin belirli kurallara uygun olup olmadığını kontrol eder ve verilerin güvenli bir şekilde işlenebilmesini sağlar.

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body; //Bu satır, HTTP isteğinden (req.body) gelen email ve password değerlerini ayıklar. Bu değerler, kullanıcının giriş yapmak için sağladığı bilgileridir.
  try {
    const user = await userModel.findOne({ email }); // Bu satır, veritabanında verilen e-posta adresine sahip bir kullanıcıyı arar.

    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); //Bu satır, kullanıcının sağladığı şifrenin veritabanında saklanan şifre ile eşleşip eşleşmediğini kontrol eder.bcrypt.compare: Bu işlev, verilen password ile user.password arasındaki eşleşmeyi kontrol eder. Sonuç true veya false olur.

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id); // Bu satır, kullanıcıya özel bir token oluşturur. Bu token genellikle kullanıcıyı tanımlamak ve yetkilendirmek için kullanılır. createToken(user._id): Bu işlev, kullanıcının kimliğini temsil eden bir token oluşturur. Token, kullanıcının oturum açtığını doğrulamak için kullanılabilir.
    res.json({ success: true, token }); //Bu satır, başarılı bir giriş yanıtı gönderir. success: true ve oluşturulan token'ı içerir. Bu yanıt istemciye gönderilir.
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  //Verilen kullanıcı kimliği (id) için bir JWT oluşturur. process.env.JWT_SECRET değişkeni, JWT oluşturmak için kullanılan gizli anahtardır.
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking is user already exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User Already Exist" });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid E-mail",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(10): Burada, şifreyi güvenli bir şekilde hashlemek için bir "salt" (tuz) oluşturuyoruz. Salt, şifrenin rastgele bir bileşeni olup, her şifre için benzersiz bir değer oluşturur. Bu, aynı şifrenin bile farklı hash değerleri üretmesini sağlar. 10 sayısı, salt oluşturma işleminde kullanılacak "cost factor" (maliyet faktörü) olarak adlandırılır. Bu sayı ne kadar yüksek olursa, salt oluşturma işlemi o kadar uzun sürer ve daha güvenli olur.
    const hashedPassword = await bcrypt.hash(password, salt); //Burada, kullanıcının girdiği şifreyi (password) ve oluşturduğumuz salt'ı kullanarak hashliyoruz. Hashleme, şifreyi bir dizi rastgele karaktere dönüştürür, böylece veritabanında saklanan şifre, gerçek şifreyi bilmeden geri çözülemez hale gelir.

    const newUser = new userModel({
      //Bu satırda, userModel adlı bir model kullanarak yeni bir kullanıcı nesnesi oluşturuyoruz. userModel daha önce tanımlanmış bir Mongoose modeli olup, MongoDB veritabanında kullanıcı verilerini saklamak için kullanılır.
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save(); // Bu satırda, yeni oluşturduğumuz kullanıcı nesnesini veritabanına kaydediyoruz.
    const token = createToken(user._id); //Bu satırda, createToken fonksiyonunu kullanarak yeni oluşturulan kullanıcı için bir JSON Web Token (JWT) oluşturuyoruz
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };

/*

JWT, üç bölümden oluşur:

Header (Başlık): Token türünü ve kullanılan imza algoritmasını belirtir.
Payload (Yük): Taşınan verileri içerir. Bu veriler genellikle kullanıcı bilgileri ve token ile ilgili meta bilgileri içerir.
Signature (İmza): Token'ın bütünlüğünü ve doğruluğunu sağlamak için kullanılır.
jsonwebtoken Kütüphanesinin İşlevleri
Token Oluşturma (Signing):

Kullanıcı kimlik doğrulaması yapıldıktan sonra bir JWT oluşturulur ve bu token kullanıcının tarayıcısına gönderilir. Token, kullanıcıyla ilgili bilgileri ve belirli bir süre boyunca geçerli olacak oturum bilgilerini içerir.
Token Doğrulama (Verification):

Herhangi bir korumalı rota ya da kaynağa erişim sağlanmak istendiğinde, sunucu bu token'ı doğrular. Token'ın geçerli olup olmadığını, süresinin dolup dolmadığını ve imzanın doğru olup olmadığını kontrol eder.
Token Ayrıştırma (Decoding):

Token'ın içeriğini ayrıştırarak, kullanıcı bilgileri veya token ile ilgili diğer bilgileri elde etmek için kullanılır.



***********************************************************************************
bcrypt'in Temel İşlevleri ve Özellikleri
Şifre Hashleme:

Kullanıcı şifresi, bcrypt algoritması kullanılarak hash edilir. Hash işlemi, şifrenin düz metin halini güvenli bir özet haline getirir.
Salt Kullanımı:

bcrypt, her hash işleminde benzersiz bir "salt" (tuz) ekler. Salt, hash işleminin sonucunu farklı kılarak aynı şifrelerin bile farklı hash değerlerine sahip olmasını sağlar. Bu, rainbow table (gökkuşağı tablosu) saldırılarına karşı koruma sağlar.
Yavaşlık (Computational Cost):

bcrypt algoritması kasıtlı olarak yavaş çalışacak şekilde tasarlanmıştır. Bu, brute force (kaba kuvvet) saldırılarını zorlaştırır çünkü her deneme daha fazla zaman alır.
Şifre Doğrulama:

Kullanıcı oturum açmak istediğinde, girilen şifre bcrypt kullanılarak saklanan hash ile karşılaştırılır. Bu doğrulama işlemi, şifrenin doğru olup olmadığını kontrol eder.



**********************************************************************************
validator Kütüphanesinin Temel İşlevleri
Veri Doğrulama (Validation):

Belirli veri türlerinin ve formatlarının geçerli olup olmadığını kontrol eder. Örneğin, bir e-posta adresinin geçerli bir formatta olup olmadığını veya bir URL'nin geçerli olup olmadığını kontrol edebilir.
Veri Temizleme (Sanitization):

Girdi verilerini temizleyerek, potansiyel olarak zararlı kodların veya karakterlerin kaldırılmasını sağlar. Bu, güvenlik açıklarını azaltmaya yardımcı olur.
Genel Kullanım Kolaylığı:

Birçok yaygın doğrulama ve temizleme işlemi için hazır fonksiyonlar sunar, bu da geliştiricilerin işini kolaylaştırır




*/
