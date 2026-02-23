import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import "../pagesCSS/placeOrder.css";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
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

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // + delivery
      paymentMethod,
    };

    try {
      let response = await axios.post(`${url}/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        if (paymentMethod === "COD") {
          alert("Order placed successfully! Cash on Delivery selected.");
        } else {
          window.location.replace(response.data.session_url);
        }
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
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
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Easypaisa"
              checked={paymentMethod === "Easypaisa"}
              onChange={() => setPaymentMethod("Easypaisa")}
            />
            Easypaisa
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="JazzCash"
              checked={paymentMethod === "JazzCash"}
              onChange={() => setPaymentMethod("JazzCash")}
            />
            JazzCash
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Bank"
              checked={paymentMethod === "Bank"}
              onChange={() => setPaymentMethod("Bank")}
            />
            Bank Transfer
          </label>
        </div>
      </div>

      {/* RIGHT: Cart items */}
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Summary</h2>
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
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
              );
            }
            return null;
          })}
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
    </form>
  );
};

export default PlaceOrder;