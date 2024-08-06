import React, { useEffect, useState } from "react";
import "./Add.css";
import upload from "../../images/upload.png";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  //Bu kod parçasında, bir onChange olay işleyicisi olan onChangeHandler işlevi tanımlanmıştır. Bu işlev, bir form girdi elemanının değerini değiştirirken, bu değişikliği bir data durum değişkenine kaydetmek için kullanılır.
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value })); //setData((data) => ({ ...data, [name]: value })); ifadesi, JavaScript'te yaygın olarak kullanılan bir kalıptır ve özellikle React'te durum yönetiminde sıkça kullanılır. Bu ifade, mevcut bir nesneyi kopyalar ve bu nesneye yeni veya güncellenmiş bir anahtar-değer çifti ekler. Bu tür bir kullanım, immutability'yi (değişmezlik) korumak ve mevcut durumu korurken belirli bir özelliği güncellemek için kullanılır.
  };

  /* useEffect(() => {
    console.log(data);
    Bu kod parçasındaki useEffect kancası, data durum değişkeni her değiştiğinde tetiklenir ve güncel data durumunu konsola yazdırır.
  }, [data]);*/

  //Bu fonksiyon (onSubmitHandler), bir formun gönderilmesini ele alır ve formun gönderilmesi sırasında form verilerini toplar. Toplanan veriler FormData nesnesine eklenir ve bu nesne, verilerin sunucuya kolayca gönderilmesini sağlar. Bu, form verilerini işlemek ve sunucuya göndermek için yaygın bir yöntemdir.
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(); //FormData nesnesinin yeni bir örneğini oluşturur. FormData nesnesi, genellikle bir formun verilerini toplamak ve bu verileri bir sunucuya göndermek için kullanılır. Bu nesne, form verilerini kolayca yönetmeyi ve özellikle dosya yüklemeleri (file uploads) gibi işlemleri gerçekleştirmeyi sağlar.
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData); //axios.post: axios, HTTP isteklerini (GET, POST, PUT, DELETE, vb.) yapmak için kullanılan bir kütüphanedir. axios.post işlevi, belirtilen URL'ye bir POST isteği gönderir.
    //URL: ${url}/api/food/add, sunucunun API endpoint'ini temsil eder. url değişkeni "http://localhost:4000" olarak tanımlandığı için, bu istek "http://localhost:4000/api/food/add" adresine yapılacaktır.
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rools">Rools</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
