import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import "../pagesCSS/placeOrder.css";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, url } =
    useContext(StoreContext);

  // Form state
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Notification state
  const [notification, setNotification] = useState({ message: "", type: "" });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    // Validate payment method
    if (!paymentMethod) {
      showNotification("Please select a payment method.", "error");
      return;
    }

    // Check if cart is empty
    const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
    if (totalItems === 0) {
      showNotification("Your cart is empty! Add items to place an order.", "error");
      return;
    }

    // Prepare order items
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod,
    };

    try {
      const response = await axios.post(`${url}/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // Reset form and cart
        setData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: "",
        });
        setPaymentMethod("");
        setCartItems({});

        showNotification("Your order has been successfully placed!", "success");

        // Redirect for online payments
        if (paymentMethod !== "COD") {
          window.location.replace(response.data.session_url);
        }
      } else {
        showNotification("Error placing order. Try again!", "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Error placing order. Try again!", "error");
    }
  };

  return (
    <form onSubmit={placeOrderHandler} className="place-order">
      {/* LEFT: Delivery info + payment */}
      <div className="order-left">
        <p>Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />

        {/* PAYMENT OPTIONS */}
        <p style={{ marginTop: "30px", fontWeight: 600 }}>Payment Method</p>
        <select
          className="payment-dropdown"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Easypaisa">Easypaisa</option>
          <option value="JazzCash">JazzCash</option>
          <option value="Bank">Bank Transfer</option>
        </select>
      </div>

      {/* RIGHT: Cart items */}
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Summary</h2>
          {food_list.map((item) =>
            cartItems[item._id] > 0 ? (
              <div key={item._id} className="cart-item-summary">
                <img
                  src={url + "/images/" + item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p>
                    {item.name} x {cartItems[item._id]}
                  </p>
                  <p>${item.price * cartItems[item._id]}</p>
                </div>
              </div>
            ) : null
          )}
          <hr />
          <div className="total-details">
            <p>Sub Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <div className="total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>

      {/* Notification popup */}
      {notification.message && (
        <div className={`order-notification ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </form>
  );
};

export default PlaceOrder;