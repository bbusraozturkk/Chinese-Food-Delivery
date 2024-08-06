import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import close from "../../images/close.png";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext); // url ve setToken fonksiyonlarını StoreContext'ten alır.
  
  const [currState, setCurrState] = useState("Login"); // Başlangıç durumu "Login" olarak belirlenir.

  const [data, setData] = useState({
    // kancasını kullanarak data adında bir durum değişkeni ve bu durumu güncellemek için setData adında bir işlev oluşturur.
    // data: Form verilerini tutar ve başlangıçta name, email, ve password alanlarını boş stringlerle başlatır.
    // setData: data durumunu güncellemek için kullanılan işlevdir.
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    // onChangeHandler işlevi, form alanlarındaki değişiklikleri yakalar ve data durumunu günceller.
    // event: Form elemanındaki değişiklikleri temsil eden olay nesnesidir. İçinde değişen değeri ve alan adını barındırır.
    const name = event.target.name; // Olay nesnesinden (event) form elemanının adını alır. Bu, hangi form alanında değişiklik yapıldığını belirler.
    // event.target.name: Değişen form elemanının name özniteliğidir (örneğin, "name", "email", "password").
    const value = event.target.value; // Olay nesnesinden (event) form elemanının yeni değerini alır.
    // event.target.value: Form elemanına girilen yeni değeri temsil eder.
    setData((data) => ({ ...data, [name]: value })); // Önceki data durumunu (...data) kopyalar ve ardından değiştirilmiş olan form alanını günceller.
    // [name]: value: name değişkenine göre form alanını günceller. Bu, data durumundaki uygun alanı (name, email, password) yeni değeri (value) ile günceller.
  };

  const onLogin = async (event) => {
    // onLogin, bir formun gönderilmesiyle tetiklenen bir işlevdir. Form verilerini alır, uygun API'ye istek gönderir, yanıtı kontrol eder ve başarılıysa kullanıcıya bir token verir. Token'ı yerel depolamada saklar ve formu gizler. Başarısızlık durumunda kullanıcıya bir hata mesajı gösterir.
    event.preventDefault();
    let newUrl = url; // Başlangıçta url değişkeninin değerini newUrl değişkenine atar. Bu, istek yapılacak URL'i oluşturmak için bir temel sağlar.
    if (currState === "Login") {
      // Kullanıcının mevcut durumuna bağlı olarak (currState), newUrl'e doğru API yolunu ekler.
      // currState === "Login": Eğer mevcut durum "Login" ise, newUrl'e api/user/login ekler.
      newUrl += "/api/user/login";
    } else {
      // else: Eğer mevcut durum "Login" değilse, newUrl'e api/user/register ekler.
      newUrl += "/api/user/register";
    }

    // newUrl'i kontrol etmek için konsola yazdırın
    console.log('Request URL:', newUrl);

    try {
      const response = await axios.post(newUrl, data); // axios.post kullanarak belirtilen newUrl'e bir POST isteği gönderir. data değişkeni form verilerini içerir.

      if (response.data.success) { // Sunucudan gelen yanıtın başarılı olup olmadığını kontrol eder.
        setToken(response.data.token); // Yanıtla birlikte gelen token'ı bir durum değişkenine (token) atar.
        localStorage.setItem("token", response.data.token); // Token'ı tarayıcının yerel depolamasına kaydeder. Bu, oturum süresince token'ın saklanmasını sağlar.
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during the login process. Please try again.');
    }
  };

  /* useEffect(() => {
    console.log(data);
  }, [data]); */

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={close} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your E-mail"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here!</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here!</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
