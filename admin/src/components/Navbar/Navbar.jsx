import React from "react";
import "./Navbar.css";
import logo from "../../images/sushilogo.jpg";
import profile from "../../images/photo.jpeg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="" />
      <img className="profile" src={profile} alt="" />
    </div>
  );
};

export default Navbar;
