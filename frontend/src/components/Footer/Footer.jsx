import React from "react";
import "./Footer.css";
import logo from "../../images/sushilogo.jpg";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import x from "../../images/x.png";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={logo} alt="logo" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            aliquid, eligendi deserunt commodi hic omnis! Temporibus totam
            necessitatibus tenetur ab sint dolores fugiat voluptatum quo
            deleniti, velit vero dolor voluptatem ut magnam numquam eaque
            facilis beatae, pariatur incidunt ipsa eum.
          </p>
          <div className="footer-social-icons">
            <img src={facebook} alt="" />
            <img src={x} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="foooter-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>05621927302</li>
            <li>se_busraozturk@outlook.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 ChineseFood.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
