//server.js dosyası, genellikle uygulamanın ana giriş noktasıdır ve web sunucusunun yapılandırılmasını ve başlatılmasını sağlar. Bu dosya, Express.js gibi bir web framework'ü kullanarak HTTP sunucusunu başlatır, middleware'leri ayarlar, rotaları (routes) tanımlar ve sunucunun belirli bir port üzerinde dinlemesini sağlar.
import express from "express";
import cors from "cors"; //web tarayıcılarının bir web sayfasının bir kaynağa (resim, veri, font vb.) kendi alan adı (origin) dışındaki bir alan adından erişmesine izin verip vermeyeceğini belirlemek için kullandıkları bir güvenlik mekanizmasıdır.
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config (app config, genellikle bir Express.js uygulamasının temel ayarlarını ve yapılandırmalarını ifade eder. Bu, uygulamanın nasıl davranacağını, hangi portta çalışacağını, hangi middleware'lerin kullanılacağını ve diğer genel yapılandırmaları içerir.)
const app = express();
const port = 4000;

//middleware (sunucuya gelen istekleri işler)
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter); //Bu satır, Express.js uygulamanızın /api/food yoluna gelen HTTP isteklerini foodRouter adlı bir router nesnesine yönlendirir. Yani, /api/food yoluyla yapılan istekler, foodRouter tarafından işlenecek.
app.use("/images", express.static("uploads")); //Web uygulamalarında, resimler, CSS dosyaları, JavaScript dosyaları gibi sabit dosyaların sunulması gerekir. express.static bu dosyaların doğrudan URL yoluyla erişilmesini sağlar. uploads klasöründeki dosyaları /images yoluyla sunar.Tarayıcıdan /images yolunu kullanarak bu dosyalara erişebilirsiniz.
app.use("/api/user", userRouter); // ifadesi, Express.js uygulamanızda /api/user ile başlayan tüm URL yollarını userRouter yönlendiricisine yönlendirir.
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// app listen, uygulamanın belirli bir port üzerinden gelen HTTP isteklerini dinlemesini sağlar ve sunucunun başarılı bir şekilde çalıştığını belirten bir mesajı konsola yazdırır.
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
