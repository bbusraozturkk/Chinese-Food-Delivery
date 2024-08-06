//Middleware, gelen isteklerin işlenmesi sırasında çeşitli işlevleri yerine getiren ve genellikle istek (request) ve yanıt (response) arasında yer alan yazılım katmanlarıdır. Bu dosyalar, istekleri yönlendirme, doğrulama, hata işleme, veri işleme ve benzeri görevlerde kullanılır.
//Her middleware, bir isteği alır, gerekli işlemleri yapar ve sonra isteği bir sonraki middleware'a geçirir.

//Bu kod parçası, bir JWT (JSON Web Token) doğrulama middleware'ı tanımlar. Bu middleware, gelen isteklerin doğrulanmasını ve kullanıcı kimlik doğrulamasının yapılmasını sağlar

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  //Bu satır, asenkron bir fonksiyon olan authMiddleware'ı tanımlar. Bu fonksiyon, Express.js uygulamasında middleware olarak kullanılacak. req, res, ve next parametreleri sırasıyla istek (request), yanıt (response) ve bir sonraki middleware'a geçmek için kullanılan fonksiyonlardır.
  const { token } = req.headers; //Bu satır, istek başlıklarından (request headers) token adlı bir değişkeni çıkartır ve bu değişkeni kullanır. JWT genellikle istek başlıkları üzerinden gönderilir.
  if (!token) {
    //Bu koşul, eğer token yoksa, yanıt olarak bir JSON nesnesi döndürür ve yetkisiz erişimi belirtir. Bu durumda, istek işleme burada durdurulur ve next() fonksiyonu çağrılmaz.
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); //try bloğu, JWT doğrulama işlemi başlatır. jwt.verify fonksiyonu, token'ı ve bir gizli anahtar (process.env.JWT_SECRET) kullanarak token'ı doğrular ve çözülmüş (decoded) token'ı döner. Eğer token geçerli değilse, hata atılır ve catch bloğuna geçilir.
    req.body.userId = token_decode.id; //Token doğrulandıktan sonra, çözülmüş token'dan kullanıcı kimliği (id) alınır ve req.body.userId olarak ayarlanır. Bu, sonraki middleware'ların veya route handler'larının kullanıcı kimliğine erişebilmesini sağlar.
    next(); //next() fonksiyonu çağrılır, böylece istek işleme zincirinde bir sonraki middleware'a geçilir.
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

/*Doğrulama ve Yetkilendirme: Middleware, gelen isteklerin doğrulanması ve kullanıcının yetkilerinin kontrol edilmesi için kullanılabilir. Örneğin, bir kullanıcı giriş yapmamışsa veya gerekli yetkilere sahip değilse, middleware bu durumu kontrol edip uygun yanıtı dönebilir.

Günlük (Logging): Middleware, isteklerin kaydını tutmak için kullanılabilir. Hangi isteklerin yapıldığını, kim tarafından ve ne zaman yapıldığını kaydeden bir günlük middleware, uygulamanın izlenebilirliğini artırır.

Hata İşleme: Middleware, uygulama genelinde hataların yakalanması ve uygun yanıtların döndürülmesi için kullanılabilir. Merkezi bir hata işleme middleware'ı, hataların tek bir yerde yönetilmesini sağlar.

Veri İşleme ve Dönüştürme: Middleware, gelen istek verilerini işleyebilir ve dönüştürebilir. Örneğin, istek gövdesindeki JSON verilerini ayrıştırabilir veya belirli bir formatta gelen verileri uygulamanın ihtiyaç duyduğu formata dönüştürebilir.

Güvenlik: Middleware, istekleri güvenlik açısından kontrol edebilir. Örneğin, Cross-Site Request Forgery (CSRF) koruması veya Cross-Origin Resource Sharing (CORS) ayarları için kullanılabilir. */
