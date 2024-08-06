import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
   
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (response.data.success) {
     toast.success(response.data.message)
    } else {
      toast.error("Error");
    }
  };

  //Bu useEffect çağrısı, bileşen ilk kez render edildikten sonra fetchList işlevini çalıştırır ve boş bağımlılıklar dizisi sayesinde bu işlem yalnızca bir kez gerçekleşir. Bu yöntem, genellikle veri yükleme gibi bir kez yapılması gereken işlemler için kullanılır.
  useEffect(() => {
    fetchList(); //Bu işlev bileşen render edildikten sonra çağrılır. Burada, fetchList işlevi API'den veri alır.
  }, []); //Boş bir dizi verildiğinde, useEffect işlevi sadece bileşen ilk kez render edildiğinde çalışır.Bu, bileşen montaj edildiğinde (ilk kez oluşturulduğunda) yalnızca bir kez çalışmasını sağlar. Sonraki renderlarda useEffect işlevi tekrar çalıştırılmaz.

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
//Dinamik Parametre Gerekliyse: Eğer belirli bir veri parçasını (örneğin, id) bir fonksiyona geçirmek istiyorsanız, onClick={() => removeFood(item.id)} gibi bir ok fonksiyonu kullanmanız gerekir. Bu yaklaşım, her öğe için dinamik ve doğru veriyi geçirmenize olanak tanır.
//Basit Olay İşleyicisi Gerekliyse: Eğer fonksiyon parametre gerektirmiyorsa veya sadece event nesnesini kullanıyorsanız, onClick={removeFood} kullanabilirsiniz. Bu, fonksiyonun doğrudan olay işleyici olarak atanmasını sağlar.
export default List;
