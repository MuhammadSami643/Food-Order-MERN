import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import "../componentCSS/foodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list, cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <>
      <div className="food-display" id="f-display">
        <h2>Top dishes near you</h2>
        <div className="food-list">
          {food_list.map((item) => {
            // const [itemCount, setItemCount] = useState(0); -> This is also a way to change state(only state)
            if (category === "All" || category === item.category) {
              return (
                <div key={item._id} className="food-display-container">
                  <div className="food-image">
                    <img
                      className="food-image-container"
                      src={url + "/images/" + item.image}
                      // src={url + "/images/" + item.image.filename}
                      alt={item.name}
                    />

                    {/* If item is not in cart, show add button */}
                    {!cartItems[item._id] ? (
                      <img
                        className="add-button"
                        onClick={() => addToCart(item._id)}
                        src={assets.add_icon_white}
                        alt="Add"
                      />
                    ) : (
                      /* If item is in cart, show counter with add/remove */
                      <div className="food-counter">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt="Remove"
                        />
                        <p>{cartItems[item._id]}</p>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt="Add"
                        />
                      </div>
                    )}
                  </div>

                  <div className="food-info">
                    <div className="food-rating">
                      <p>{item.name}</p>
                      <img src={assets.rating_starts} alt="Error" />
                    </div>
                    <p>{item.description}</p>
                    <h3>${item.price}</h3>
                  </div>
                </div>
              );
            }
            return null; // required when map callback doesn’t return anything
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;