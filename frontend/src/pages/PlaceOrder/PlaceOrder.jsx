import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  /*useEffect(() => {
    console.log(data)
  }, [data]);
  */

  /*Bu kod parçası, bir kullanıcı siparişinin oluşturulması için bir form gönderimini (submit) 
  ele alan bir fonksiyondur. Kullanıcı, alışveriş sepetindeki ürünleri sipariş etmek istediğinde, 
  bu fonksiyon çağrılır. Fonksiyon, sepetteki ürünleri alır ve her bir ürünün miktarını belirleyerek 
  bir sipariş nesnesi oluşturur. Bu sipariş nesnesi daha sonra işlenebilir veya sunucuya gönderilebilir. */
  const placeOrder = async (event) => {
    //Bu fonksiyon, bir olay (event) gerçekleştiğinde çağrılır.
    event.preventDefault();
    let orderItems = []; //Bu dizi, siparişe eklenen ürünleri depolamak için kullanılır.
    food_list.map((item) => {
      //adlı dizideki her bir öğeyi (item) döngüyle işler. map fonksiyonu, her öğe için verilen işlevi çalıştırır.
      if (cartItems[item._id] > 0) {
        //dizisinde ilgili ürünün miktarı 0'dan büyükse, yani sepetinizde bu üründen varsa, şart sağlanır
        let itemInfo = item; //Mevcut ürün bilgisini itemInfo adlı değişkene kopyalar.
        /*Bu satır, food_list içindeki her bir item öğesinin bir kopyasını oluşturur. Bu kopyayı kullanarak, orijinal item öğesini değiştirmeden itemInfo üzerinde değişiklikler yapabilirsiniz. Bu, özellikle mevcut item öğesine yeni özellikler eklerken veya mevcut özelliklerini değiştirirken faydalıdır. Bu durumda, itemInfo nesnesine bir quantity (miktar) özelliği ekleniyor. Eğer doğrudan item üzerinde değişiklik yaparsanız, food_list içindeki orijinal item de değişmiş olur.
        let değişkeni, blok kapsamlıdır ve yeniden atamaya izin verir. Bu durumda let, itemInfo nesnesini oluşturup üzerinde değişiklik yapmamıza olanak tanır. Bu değişkenin değerini değiştirebilmek, yani quantity özelliğini ekleyebilmek için let kullanılır. */
        itemInfo["quantity"] = cartItems[item._id]; //itemInfo nesnesine, quantity (miktar) adlı yeni bir özellik ekler ve bu özellik sepetten alınan ürün miktarına eşit olur.
        orderItems.push(itemInfo); //itemInfo nesnesini orderItems dizisine ekler
      }
    });
    /*Bu kod, bir sipariş oluşturma işlemini tamamlamak ve Stripe ödeme sayfasına yönlendirmek için 
    kullanılan bir fonksiyonun parçasıdır. Fonksiyon, sepet verilerini alır, bunları bir sipariş 
    nesnesine dönüştürür, bu nesneyi bir API'ye gönderir ve başarılı olursa kullanıcıyı 
    Stripe ödeme sayfasına yönlendirir. */
    let orderData = {
      //orderData nesnesi oluşturulur ve sipariş bilgileri (adres, sipariş öğeleri ve toplam tutar) bu nesneye eklenir.
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    }); //axios ile /api/order/place endpoint'ine POST isteği gönderilir. Bu istekte orderData nesnesi ve yetkilendirme token'ı gönderilir.
    if (response.data.success) {
      const { session_url } = response.data; //API'den dönen yanıt kontrol edilir. Eğer işlem başarılıysa, kullanıcı Stripe ödeme sayfasına yönlendirilir. Başarısızsa, bir hata mesajı gösterilir.
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="E-mail"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
