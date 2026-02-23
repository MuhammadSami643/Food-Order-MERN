import { menu_list } from "../assets/assets";
import "../componentCSS/viewMenu.css";

import React from "react";

const ViewMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="viewMenu" id="vMenu">
        <h1>Explore our menu</h1>
        <p className="viewMenuText">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, on delicious meel at a time.
        </p>
        <div className="viewMenuList">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="menuListItem"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt="Menu"
                />

                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ViewMenu;
