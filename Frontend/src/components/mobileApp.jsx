import React from "react";
import { assets } from "../assets/assets";
import "../componentCSS/mobileApp.css";

const MobileApp = () => {
  return (
    <>
      <div className="mobile-app" id="mobile-app">
        <p>
          For Better Experience Download <br /> Tomato App
        </p>
        <div className="app-platform">
          <img src={assets.play_store} alt="Play Store" />
          <img src={assets.app_store} alt="App Store" />
        </div>
      </div>
    </>
  );
};

export default MobileApp;
