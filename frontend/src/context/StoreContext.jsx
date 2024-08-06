import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext([]);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      // Eğer token geçerliyse, axios.post kullanılarak belirtilen URL'ye (örn: https://example.com/api/cart/add) bir POST isteği yapılır. Bu istek, itemId verisini yük olarak gönderir ve token verisini başlık olarak ekler. Sunucu, bu isteği alır ve tokenı doğrular; eğer geçerliyse, itemId ile belirtilen ürünü kullanıcının sepetine ekler.
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const { [itemId]: _, ...rest } = cartItems;
      setCartItems(rest);
    }
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        
        // Eğer ürün bulunamazsa uyarı mesajı verin
        if (!itemInfo) {
          console.warn(`Item with ID ${itemId} not found in food_list.`);
          continue;
        }

        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // Bu kod, bir fetchFoodList adlı asenkron fonksiyon tanımlar. Bu fonksiyon, bir API'ye HTTP GET isteği gönderir ve gelen yanıtı kullanarak bir durumu (setFoodList) günceller.
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    // Bu kod parçası, React bileşeninin yüklenmesiyle birlikte otomatik olarak verileri çekmek için
    async function loadData() {
      await fetchFoodList();
      // Bu useEffect kancası, bileşen ilk yüklendiğinde (veya oluşturulduğunda) çalışır ve tarayıcının yerel depolamasında (localStorage) saklanan bir token olup olmadığını kontrol eder. Eğer bir token varsa, bu token'ı alır ve setToken fonksiyonu ile duruma (state) atar.
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []); // Bu şekilde, kullanıcı daha önce giriş yaptıysa ve token tarayıcının yerel depolamasında saklanmışsa, bileşen yeniden yüklendiğinde kullanıcı oturumunun devam etmesi sağlanır.

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
