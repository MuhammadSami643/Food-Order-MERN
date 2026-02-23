import React from "react";
import "../componentCSS/footer.css";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="footer " id="footer">
        <div className="f-content">
          <div className="content-left">
            <img src={assets.logo} alt="Tomato" />
            <p>
              Order your favorite meals from our restaurants and enjoy delicious
              flavors delivered to your door!
            </p>
            <div className="social-icons">
              <img src={assets.facebook_icon} alt="facebook" />
              <img src={assets.twitter_icon} alt="twitter" />
              <img src={assets.linkedin_icon} alt="linkedIn" />
            </div>
          </div>
          <div className="center">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>Delivery</li>
              <li>About us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="content-right">
            <h2>Get in touch</h2>
            <ul>
              <li>+92 341 4106430</li>
              <li>msamisami1112@gmail.com </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">
          Copyright 2024 @ Tomato.com - All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
