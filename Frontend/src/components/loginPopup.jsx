import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import "../componentCSS/loginPopup.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  // It's in context API so we can use it anywhere in application
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  //Funstion for user Login
  const onLogin = async (e) => {
    e.preventDefault();

    let newURL = url;

    // Checking state where we are and update our URL acording to this
    if (currentState === "Log In") {
      newURL += "/user/login";
    } else {
      newURL += "/user/register";
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      console.log(response);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-container">
          <div className="login-title">
            <h2>{currentState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <div className="login-field">
            {currentState === "Log In" ? (
              <></>
            ) : (
              <input
                type="text"
                placeholder="your name"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                required
              />
            )}

            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="your password"
              required
            />
          </div>
          <button type="submit">
            {currentState === "Sign Up" ? "Create Account" : "Log In"}
          </button>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>
              By continuing, You agreed to the terms of use and privacy policy
            </p>
          </div>
          {currentState === "Log In" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrentState("Log In")}>Login Here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
