import "../componentCSS/header.css";

import React from "react";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>Order your favourite food here</h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            misiion is to satisfy your cravings and elevate your dining
            experience, one delecious meal at a time
          </p>
          <button>View Menu</button>
        </div>
      </div>
    </>
  );
};

export default Header;
