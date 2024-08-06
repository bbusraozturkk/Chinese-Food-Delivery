import React, { useContext } from "react";
import "./FoodItem.css";
import star from "../../images/star.png";
import add from "../../images/add.png";
import remove from "../../images/remove.png";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={add}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={remove} alt="remove" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={add} alt="add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={star} alt="star rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
