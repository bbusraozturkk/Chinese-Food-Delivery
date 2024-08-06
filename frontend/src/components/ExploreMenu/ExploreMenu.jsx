import React from "react";
import "./ExploreMenu.css";
import food from "../../images/food.jpg";
import food1 from "../../images/food1.jpg";
import food2 from "../../images/food2.jpg";
import food3 from "../../images/food3.jpg";
import food4 from "../../images/food4.jpg";
import food5 from "../../images/food5.jpg";
import food6 from "../../images/food6.jpg";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a
        debitis. Quis sed placeat, ex pariatur veniam libero blanditiis cumque
        distinctio eius accusantium animi beatae corrupti, maiores autem alias
        adipisci ad quia exercitationem minima! Quasi nostrum placeat hic
        deleniti odit!
      </p>
      <div className="explore-menu-list">
        <div
          onClick={() =>
            setCategory((prev) => (prev === "Salad" ? "All" : "Salad"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "Salad" ? "active" : ""}
            src={food}
            alt="Salad"
          />
          <p>Salad</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) => (prev === "Ramens" ? "All" : "Ramens"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "Ramens" ? "active" : ""}
            src={food1}
            alt="Ramens"
          />
          <p>Ramens</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) => (prev === "Rools" ? "All" : "Rools"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "Rools" ? "active" : ""}
            src={food2}
            alt="Rools"
          />
          <p>Rolls</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) => (prev === "Deserts" ? "All" : "Deserts"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "Deserts" ? "active" : ""}
            src={food3}
            alt="Deserts"
          />
          <p>Deserts</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) =>
              prev === "ChineseFood" ? "All" : "ChineseFood"
            )
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "ChineseFood" ? "active" : ""}
            src={food4}
            alt="Chinese Food"
          />
          <p>Chinese Food</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) => (prev === "Noodles" ? "All" : "Noodles"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "Noodles" ? "active" : ""}
            src={food5}
            alt="Noodles"
          />
          <p>Noodles</p>
        </div>
        <div
          onClick={() =>
            setCategory((prev) => (prev === "PureVeg" ? "All" : "PureVeg"))
          }
          className="explore-menu-list-item"
        >
          <img
            className={category === "PureVeg" ? "active" : ""}
            src={food6}
            alt="Pure Veg"
          />
          <p>Pure Veg</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
