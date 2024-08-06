import React from "react";
import "./Sidebar.css";
import addcricle from "../../images/addcricle.png";
import checkbox from "../../images/checkbox.png";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={addcricle} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={checkbox} alt="" />
          <p>List Item</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={checkbox} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
